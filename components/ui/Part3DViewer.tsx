"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type {
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

interface Part3DViewerProps {
  modelPath: string;
  className?: string;
}

export function Part3DViewer({ modelPath, className }: Part3DViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  
  // Refs for 3D objects and state
  const modelRef = useRef<Group | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const containerSizeRef = useRef({ width: 0, height: 0 });
  const needsResizeRef = useRef(false);

  useEffect(() => {
    let scene: Scene | null = null;
    let controls: OrbitControls | null = null;
    let frameId: number | null = null;
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    
    const mountNode = mountRef.current;
    
    async function init() {
      try {
        const { OrbitControls: OrbitControlsClass } = await import("three/examples/jsm/controls/OrbitControls");
        const { GLTFLoader: GLTFLoaderClass } = await import("three/examples/jsm/loaders/GLTFLoader");
        const { DRACOLoader: DRACOLoaderClass } = await import("three/examples/jsm/loaders/DRACOLoader.js");

        if (!mountRef.current || cancelled) return;

        const container = mountRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;
        containerSizeRef.current = { width, height };

        // Setup Renderer
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        });
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
        scene = new THREE.Scene();
        
        // Environment - Create a simple gradient environment
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        if (context) {
            const gradient = context.createLinearGradient(0, 0, 0, 256);
            gradient.addColorStop(0, '#87CEEB'); // Sky blue
            gradient.addColorStop(1, '#F5F5F5'); // Light gray
            context.fillStyle = gradient;
            context.fillRect(0, 0, 256, 256);
            
            const texture = new THREE.CanvasTexture(canvas);
            const envMap = pmremGenerator.fromEquirectangular(texture);
            scene.environment = envMap.texture;
            
            texture.dispose();
        }
        pmremGenerator.dispose();

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(2, 2, 2);
        cameraRef.current = camera;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);

        // Controls
        controls = new OrbitControlsClass(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.0;
        controls.enablePan = false;
        controls.minDistance = 1;
        controls.maxDistance = 10;
        controls.target.set(0, 0, 0);

        // Load Model
        const loader = new GLTFLoaderClass();
        
        // Setup Draco Loader
        const dracoLoader = new DRACOLoaderClass();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        dracoLoader.setDecoderConfig({ type: 'js' }); // Use JS for wider compatibility
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (loader as any).setDRACOLoader(dracoLoader);

        loader.load(
          modelPath,
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
            
            // Center model
            model.position.sub(center);
            
            // Scale model to fit in view
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
                const scale = 2.5 / maxDim; // Slightly larger scale
                model.scale.setScalar(scale);
            }

            scene.add(model);
            
            // Update controls to ensure they are looking at the center
            if (controls) {
                controls.target.set(0, 0, 0);
                controls.update();
            }
          },
          undefined,
          (err) => {
            console.error("Error loading part model:", err);
          }
        );

        // Animation Loop
        function animate() {
          if (cancelled) return;
          frameId = requestAnimationFrame(animate);

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

          if (controls) {
            controls.update();
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
      if (scene) {
        scene.clear();
      }
      modelRef.current = null;
    };
  }, [modelPath]); 

  return (
    <div 
      ref={mountRef} 
      className={cn("w-full h-full", className)}
      style={{ background: 'transparent' }} 
    />
  );
}
