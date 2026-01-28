"use client";

import { useEffect, useRef, useState } from "react";
import type {
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  MeshStandardMaterial,
} from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface VehicleScanningLoaderProps {
  step: "scanning" | "analyzing" | "complete";
  className?: string;
}

export function VehicleScanningLoader({ step, className }: VehicleScanningLoaderProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  
  // Use a ref for step to access current value in animation loop without re-triggering effect
  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    let controls: OrbitControls | null = null;
    let model: Group | null = null;
    let frameId: number | null = null;
    let cancelled = false;
    
    const mountNode = mountRef.current;
    
    // Animation variables
    const meshes: Mesh[] = [];
    let time = 0;

    async function init() {
      try {
        const THREE = await import("three");
        const { OrbitControls: OrbitControlsClass } = await import("three/examples/jsm/controls/OrbitControls");
        const { GLTFLoader: GLTFLoaderClass } = await import("three/examples/jsm/loaders/GLTFLoader");

        if (!mountRef.current || cancelled) return;

        const container = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Setup Renderer with transparency
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        // Clear container
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        // Setup Scene
        scene = new THREE.Scene();
        // scene.background = null; // Transparent background by default with alpha: true

        // Camera
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(4, 2, 5);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0x00ffcc, 2); // Cyan light for scanning feel
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const blueLight = new THREE.PointLight(0x0088ff, 2, 10);
        blueLight.position.set(-2, 2, -2);
        scene.add(blueLight);

        // Controls
        controls = new OrbitControlsClass(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.0;
        controls.enablePan = false;

        // Load Model
        const loader = new GLTFLoaderClass();
        loader.load(
          "/models/vehicles/2020_audi_rs6_avant.glb",
          (gltf: GLTF) => {
            if (cancelled || !scene) return;
            model = gltf.scene;

            // Center and Scale
            const box = new THREE.Box3().setFromObject(model);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);
            
            model.position.sub(center); // Center at 0,0,0
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3.5 / maxDim;
            model.scale.setScalar(scale);

            // Material processing for "Scanning" look
            model.traverse((child) => {
              if ((child as Mesh).isMesh) {
                const mesh = child as Mesh;
                meshes.push(mesh);
                
                // Create a "tech" material
                const material = new THREE.MeshStandardMaterial({
                  color: 0x111111, // Dark base
                  metalness: 0.8,
                  roughness: 0.2,
                  emissive: 0x000000,
                  transparent: true,
                  opacity: 0.8,
                  wireframe: false,
                });
                mesh.material = material;
              }
            });

            scene.add(model);
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
          time += 0.02;

          const currentStep = stepRef.current;

          if (controls) {
            controls.autoRotateSpeed = currentStep === "analyzing" ? 4.0 : 1.0;
            controls.update();
          }

          if (model && meshes.length > 0) {
            if (currentStep === "scanning") {
                // Wave effect: emissive color based on position
                const scanHeight = Math.sin(time) * 2; // Oscillate between -2 and 2
                
                meshes.forEach((mesh) => {
                    const material = mesh.material as MeshStandardMaterial;
                    const worldPos = new THREE.Vector3();
                    mesh.getWorldPosition(worldPos);
                    
                    // Distance from scan plane
                    const dist = Math.abs(worldPos.y - scanHeight);
                    
                    if (dist < 0.5) {
                        // Highlight
                        const intensity = 1 - (dist / 0.5);
                        material.emissive.setHex(0x00ffff); // Cyan glow
                        material.emissiveIntensity = intensity * 2;
                        material.wireframe = true; // Reveal structure
                        material.opacity = 1.0;
                    } else {
                        // Dim
                        material.emissive.setHex(0x000000);
                        material.emissiveIntensity = 0;
                        material.wireframe = false;
                        material.opacity = 0.6; // Ghostly
                    }
                });
            } else if (currentStep === "analyzing") {
                // "Assembly" or "Parts Identification" effect
                meshes.forEach((mesh, i) => {
                    const material = mesh.material as MeshStandardMaterial;
                    
                    // Random flashing pattern based on index and time
                    const flash = Math.sin(time * 10 + i) > 0.9;
                    
                    if (flash) {
                        material.emissive.setHex(0x00ff00); // Green success flash
                        material.emissiveIntensity = 3;
                        material.wireframe = true;
                        material.opacity = 1;
                    } else {
                        material.emissive.setHex(0x002200);
                        material.emissiveIntensity = 0.2;
                        material.wireframe = false;
                        material.opacity = 0.9; // More solid
                    }
                });
            } else {
                // Complete or other states - solid view
                 meshes.forEach((mesh) => {
                    const material = mesh.material as MeshStandardMaterial;
                    material.emissive.setHex(0x000000);
                    material.emissiveIntensity = 0;
                    material.wireframe = false;
                    material.opacity = 1.0;
                    material.color.setHex(0x333333); // Dark grey
                });
            }
          }

          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        }

        animate();

        // Resize handler
        const handleResize = () => {
          if (!container || !renderer || !camera) return;
          const w = container.clientWidth;
          const h = container.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };

      } catch (err) {
        console.error("Three init error:", err);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
      if (renderer) {
        renderer.dispose();
        if (mountNode && renderer.domElement) {
            if (mountNode.contains(renderer.domElement)) {
                mountNode.removeChild(renderer.domElement);
            }
        }
      }
      if (scene) {
        scene.clear();
      }
    };
  }, []); // Empty dependency array - runs once

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full min-h-[300px] ${className}`}
      style={{ background: 'transparent' }} 
    />
  );
}
