"use client";

import { useEffect, useRef, useState } from "react";
import type {
  Box3,
  DirectionalLight,
  Group,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  Object3D,
} from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import type { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

type ThreePreviewProps = {
  modelUrl: string;
  autoRotateSpeed?: number;
  className?: string;
};

type ThreeModule = typeof import("three");

export function ThreePreview({ modelUrl, autoRotateSpeed = 0.6, className }: ThreePreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null); // Main container
  const mountRef = useRef<HTMLDivElement | null>(null); // Dedicated mount point for Three.js
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    let controls: OrbitControls | null = null;
    let model: Group | null = null;
    let frameId: number | null = null;
    let cancelled = false;

    async function init() {
      try {
        setIsLoading(true);
        setError(null);
        
        const THREE: ThreeModule = await import("three");
        const { OrbitControls: OrbitControlsClass } = await import("three/examples/jsm/controls/OrbitControls");
        const { GLTFLoader: GLTFLoaderClass } = await import("three/examples/jsm/loaders/GLTFLoader");
        const { FBXLoader: FBXLoaderClass } = await import("three/examples/jsm/loaders/FBXLoader");

        if (!mountRef.current || cancelled) return;

        const container = mountRef.current;
        const width = container.clientWidth || 300;
        const height = container.clientHeight || Math.round(width * 0.75);

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true, // Helpful for debugging and screenshots
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height, false);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Clear container safely
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(2, 1.5, 4);

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 1);
        backLight.position.set(-5, 5, -5);
        scene.add(backLight);

        controls = new OrbitControlsClass(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = autoRotateSpeed;

        // Load Model
        const gltfLoader = new GLTFLoaderClass();
        const fbxLoader = new FBXLoaderClass();

        const onLoad = (object: GLTF | Group) => {
          if (cancelled || !scene) return;

          let loadedModel: Group;
          if ((object as GLTF).scene) {
            loadedModel = (object as GLTF).scene;
          } else {
            loadedModel = object as Group;
          }

          model = loadedModel;
          scene.add(model);
          
          // Center and Scale
          const box = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          model.position.sub(center); // Center at 0,0,0

          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = maxDim > 0 ? 3 / maxDim : 1; // Scale to fit within ~3 units
          model.scale.setScalar(scale);

          setIsLoading(false);
        };

        const onProgress = (xhr: ProgressEvent) => {
          // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        };

        const onError = (err: unknown) => {
          console.error("Error loading model:", err);
          setError("Erreur chargement 3D");
          setIsLoading(false);
        };

        if (modelUrl.toLowerCase().endsWith(".fbx")) {
          fbxLoader.load(modelUrl, onLoad, onProgress, onError);
        } else {
          gltfLoader.load(modelUrl, onLoad, onProgress, onError);
        }

        function animate() {
          if (cancelled) return;
          frameId = requestAnimationFrame(animate);
          if (controls) controls.update();
          if (renderer && scene && camera) renderer.render(scene, camera);
        }
        
        animate();

        // Resize handler
        const handleResize = () => {
          if (!container || !renderer || !camera) return;
          const w = container.clientWidth;
          const h = container.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
        };

        window.addEventListener("resize", handleResize);
        // Initial resize check
        handleResize();

        // Cleanup listener
        return () => {
            window.removeEventListener("resize", handleResize);
        }

      } catch (err) {
        console.error("ThreePreview init error:", err);
        setError("Erreur init 3D");
        setIsLoading(false);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
      if (renderer) {
        renderer.dispose();
        if (mountRef.current && renderer.domElement) {
            // Check if child exists before removing to avoid errors
             if(mountRef.current.contains(renderer.domElement)){
                mountRef.current.removeChild(renderer.domElement);
             }
        }
      }
      if (model && scene) {
          scene.remove(model);
          // Optional: dispose geometry/materials if needed
      }
    };
  }, [modelUrl, autoRotateSpeed]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className || ""}`}>
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10 pointer-events-none">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10 text-red-500 text-xs font-bold p-2 text-center pointer-events-none">
          {error}
        </div>
      )}
    </div>
  );
}
