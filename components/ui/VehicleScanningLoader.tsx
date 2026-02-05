"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type {
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  MeshStandardMaterial,
  Material,
} from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three"; // Import statically to ensure availability for types and logic
import { useTheme } from "next-themes";

interface VehicleScanningLoaderProps {
  step: "scanning" | "analyzing" | "complete";
  className?: string;
}

interface TechMaterial extends MeshStandardMaterial {
  isTech?: boolean;
}

// Helper to update environment map
const updateEnvironment = (scene: Scene, renderer: WebGLRenderer, isDark: boolean) => {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (context) {
      // Gradient Background - Adjusted for better contrast
      const gradient = context.createLinearGradient(0, 0, 0, 512);
      if (isDark) {
          // Dark mode: Deep black/gray with higher contrast
          gradient.addColorStop(0, '#050505'); 
          gradient.addColorStop(1, '#151515'); 
      } else {
          // Light mode: Standard studio dark gray
          gradient.addColorStop(0, '#202020');
          gradient.addColorStop(1, '#101010');
      }
      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);
      
      // Add "lights" to the environment map for reflections
      // This creates specular highlights on the car body
      
      // Top light (Softbox)
      context.fillStyle = isDark ? '#ffffff' : '#dddddd';
      context.fillRect(100, 0, 312, 60); 

      // Side lights for contour definition
      context.fillStyle = isDark ? '#303030' : '#202020';
      context.fillRect(0, 200, 40, 150);
      context.fillRect(472, 200, 40, 150);

      const texture = new THREE.CanvasTexture(canvas);
      const envMap = pmremGenerator.fromEquirectangular(texture);
      scene.environment = envMap.texture;
      
      texture.dispose();
  }
  pmremGenerator.dispose();
};

export function VehicleScanningLoader({ step, className }: VehicleScanningLoaderProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const stepRef = useRef(step);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  // Update step ref when prop changes
  useEffect(() => {
    stepRef.current = step;
  }, [step]);
  
  // Update theme ref
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Refs for 3D objects and state
  const modelRef = useRef<Group | null>(null);
  const meshesRef = useRef<Mesh[]>([]);
  const originalMaterialsRef = useRef<Map<string, Material | Material[]>>(new Map());
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const containerSizeRef = useRef({ width: 0, height: 0 });
  const needsResizeRef = useRef(false);

  // Effect to update environment when theme changes
  useEffect(() => {
    if (sceneRef.current && rendererRef.current) {
        updateEnvironment(sceneRef.current, rendererRef.current, resolvedTheme === 'dark');
    }
  }, [resolvedTheme]);

  // Material switching effect
  useEffect(() => {
    const model = modelRef.current;
    const meshes = meshesRef.current;
    
    if (!model || meshes.length === 0) return;

    if (step === "complete") {
      // Restore original materials
      meshes.forEach((mesh) => {
        const original = originalMaterialsRef.current.get(mesh.uuid);
        if (original && mesh.material !== original) {
          mesh.material = original as Material | Material[];
        }
      });
    } else {
      // Set tech materials for scanning/analyzing
      meshes.forEach((mesh) => {
        const mat = mesh.material as TechMaterial;
        // Check if it's a standard material and not already a tech material
        if (!('isMeshStandardMaterial' in mat) || !mat.isTech) {
             const techMaterial = new THREE.MeshStandardMaterial({
                color: 0x111111,
                metalness: 0.8,
                roughness: 0.2,
                emissive: 0x000000,
                transparent: true,
                opacity: 0.8,
                wireframe: false,
            }) as TechMaterial;
            techMaterial.isTech = true;
            mesh.material = techMaterial;
        }
      });
    }
  }, [step, isLoaded]);

  useEffect(() => {
    let controls: OrbitControls | null = null;
    let frameId: number | null = null;
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    
    const mountNode = mountRef.current;
    
    // Animation variables
    let time = 0;
    const worldPos = new THREE.Vector3(); // Reuse vector to avoid GC

    async function init() {
      try {
        // Dynamic imports for heavy Three.js modules
        const { OrbitControls: OrbitControlsClass } = await import("three/examples/jsm/controls/OrbitControls");
        const { GLTFLoader: GLTFLoaderClass } = await import("three/examples/jsm/loaders/GLTFLoader");

        if (!mountRef.current || cancelled) return;

        const container = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;
        containerSizeRef.current = { width, height };

        // Setup Renderer with Performance Optimizations
        const renderer = new THREE.WebGLRenderer({
          antialias: true, // Keep true for visual quality, but check perf if needed
          alpha: true,
          powerPreference: "high-performance",
          // preserveDrawingBuffer: false (default) - better performance
        });
        
        // Cap Pixel Ratio for performance on high-DPI screens
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        
        rendererRef.current = renderer;
        
        // Clear container
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        // Setup Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        // Initial Environment Map
        updateEnvironment(scene, renderer, themeRef.current === 'dark');

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(4, 2, 5);
        cameraRef.current = camera;

        // Lighting - Optimized (fewer lights when not needed)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);
        
        const scanLight = new THREE.PointLight(0x00ffff, 0, 10);
        scanLight.position.set(0, 5, 0);
        scene.add(scanLight);

        // Controls
        controls = new OrbitControlsClass(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.0;
        controls.enablePan = false;
        controls.minDistance = 3;
        controls.maxDistance = 10;

        // Load Model
        const loader = new GLTFLoaderClass();
        loader.load(
          "/models/vehicles/2020_audi_rs6_avant.glb",
          (gltf: GLTF) => {
            if (cancelled || !scene) return;
            const model = gltf.scene;
            modelRef.current = model;

            // Center and Scale
            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);
            
            model.position.sub(center);
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3.5 / maxDim;
            model.scale.setScalar(scale);

            // Store original materials and prepare meshes
            model.traverse((child) => {
              if ((child as Mesh).isMesh) {
                const mesh = child as Mesh;
                // Optimization: Enable frustum culling (default is true, but good to ensure)
                mesh.frustumCulled = true; 
                meshesRef.current.push(mesh);
                originalMaterialsRef.current.set(mesh.uuid, mesh.material);
              }
            });

            scene.add(model);
            setIsLoaded(true); // Trigger material effect
          },
          undefined,
          (err) => {
            console.error("Error loading car model:", err);
          }
        );

        // Animation Loop
        function animate() {
          if (cancelled) return;
          frameId = requestAnimationFrame(animate);
          
          // Use delta time for consistent speed across frame rates
          // (Simplified here: fixed increment for effect speed)
          time += 0.02;

          // Handle Resize
          if (needsResizeRef.current && renderer && camera) {
             const { width, height } = containerSizeRef.current;
             if (width > 0 && height > 0) {
                 camera.aspect = width / height;
                 camera.updateProjectionMatrix();
                 renderer.setSize(width, height);
             }
             needsResizeRef.current = false;
          }

          const currentStep = stepRef.current;
          const isDark = themeRef.current === 'dark';

          if (controls) {
            // Adjust rotation speed based on step
            if (currentStep === "complete") {
                controls.autoRotateSpeed = 0.5;
                controls.enableZoom = true;
            } else if (currentStep === "analyzing") {
                controls.autoRotateSpeed = 4.0;
                controls.enableZoom = false;
            } else {
                controls.autoRotateSpeed = 2.0;
                controls.enableZoom = false;
            }
            controls.update();
          }

          const meshes = meshesRef.current;
          if (modelRef.current && meshes.length > 0) {
            // Lighting updates (conditional to avoid constant setting)
            if (currentStep === "complete") {
                if (dirLight.intensity !== (isDark ? 3.0 : 2.0)) {
                   dirLight.intensity = isDark ? 3.0 : 2.0;
                   dirLight.color.setHex(0xffffff);
                   scanLight.intensity = 0;
                }
            } else {
                if (dirLight.intensity !== 0.5) {
                   dirLight.intensity = 0.5;
                   dirLight.color.setHex(0x00ffcc);
                   scanLight.intensity = 1;
                }
            }

            // Visual Effects Logic
            if (currentStep === "scanning") {
                // Wave effect
                const scanHeight = Math.sin(time) * 2;
                
                // Batch update to avoid overhead
            for (let i = 0; i < meshes.length; i++) {
                const mesh = meshes[i];
                const mat = mesh.material as TechMaterial;
                if (!mat.isTech) continue;

                const material = mesh.material as MeshStandardMaterial;
                
                // Optimized: reuse vector
                mesh.getWorldPosition(worldPos);
                
                const dist = Math.abs(worldPos.y - scanHeight);
                
                if (dist < 0.5) {
                    const intensity = 1 - (dist / 0.5);
                    material.emissive.setHex(0x00ffff);
                    material.emissiveIntensity = intensity * 2;
                    material.wireframe = true;
                    material.opacity = 1.0;
                } else {
                    material.emissive.setHex(0x000000);
                    material.emissiveIntensity = 0;
                    material.wireframe = false;
                    material.opacity = 0.6;
                }
            }
        } else if (currentStep === "analyzing") {
            // Flashing effect
            for (let i = 0; i < meshes.length; i++) {
                const mesh = meshes[i];
                const mat = mesh.material as TechMaterial;
                if (!mat.isTech) continue;

                const material = mesh.material as MeshStandardMaterial;
                
                const flash = Math.sin(time * 10 + i) > 0.9;
                
                if (flash) {
                    material.emissive.setHex(0x00ff00);
                    material.emissiveIntensity = 3;
                    material.wireframe = true;
                    material.opacity = 1;
                } else {
                    material.emissive.setHex(0x002200);
                    material.emissiveIntensity = 0.2;
                    material.wireframe = false;
                    material.opacity = 0.9;
                }
            }
        }
          }

          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        }

        // Resize handler
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target === container) {
               containerSizeRef.current = { 
                 width: entry.contentRect.width, 
                 height: entry.contentRect.height 
               };
               needsResizeRef.current = true;
            }
          }
        });
        resizeObserver.observe(container);

        animate();

      } catch (err) {
        console.error("Three init error:", err);
      }
    }

    const originalMaterialsMap = originalMaterialsRef.current;
    init();

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
      if (resizeObserver) resizeObserver.disconnect();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (mountNode && rendererRef.current.domElement) {
             if (mountNode.contains(rendererRef.current.domElement)) {
                mountNode.removeChild(rendererRef.current.domElement);
             }
        }
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
      // Clean refs
      modelRef.current = null;
      meshesRef.current = [];
      originalMaterialsMap.clear();
      setIsLoaded(false);
    };
  }, []); 

  return (
    <div 
      ref={mountRef} 
      className={cn("w-full h-full min-h-[300px]", className)}
      style={{ background: 'transparent' }} 
    />
  );
}
