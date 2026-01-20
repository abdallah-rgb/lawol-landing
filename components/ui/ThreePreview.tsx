"use client";

import { useEffect, useRef } from "react";
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

type ThreePreviewProps = {
  modelUrl: string;
  autoRotateSpeed?: number;
  className?: string;
};

type ThreeModule = typeof import("three");

export function ThreePreview({ modelUrl, autoRotateSpeed = 0.6, className }: ThreePreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    let controls: OrbitControls | null = null;
    let model: Group | null = null;
    let frameId: number | null = null;
    let loader: GLTFLoader | null = null;
    let cancelled = false;

    async function init() {
      const THREE: ThreeModule = await import("three");
      const { OrbitControls: OrbitControlsClass } = await import("three/examples/jsm/controls/OrbitControls");
      const { GLTFLoader: GLTFLoaderClass } = await import("three/examples/jsm/loaders/GLTFLoader");

      if (!containerRef.current || cancelled) return;

      const container = containerRef.current;
      const width = container.clientWidth || 300;
      const height = container.clientHeight || Math.round(width * 0.75);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
      camera.position.set(0, 1.5, 4);

      const hemi: HemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
      hemi.position.set(0, 1, 0);
      scene.add(hemi);

      const dir: DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
      dir.position.set(3, 5, 5);
      scene.add(dir);

      controls = new OrbitControlsClass(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = autoRotateSpeed;
      controls.minPolarAngle = Math.PI / 4;
      controls.maxPolarAngle = (3 * Math.PI) / 4;

      loader = new GLTFLoaderClass();
      loadModel(modelUrl, THREE);

      function handleResize() {
        if (!container || !renderer || !camera) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight || Math.round(newWidth * 0.75);
        renderer.setSize(newWidth, newHeight, false);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
      }

      function animate() {
        if (cancelled) return;
        if (!controls || !renderer || !scene || !camera) return;
        controls.update();
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      animate();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    function loadModel(url: string, THREE: ThreeModule) {
      if (!loader || !scene) return;
      loader.load(
        url,
        (gltf: GLTF) => {
          if (model) {
            scene!.remove(model);
          }
          model = gltf.scene;
          scene!.add(model);
          centerAndScaleModel(model, THREE);
        },
        undefined,
        (error: unknown) => {
          console.warn("Failed to load 3D model:", url, error);
          // Fallback: Add a placeholder sphere if model fails to load
          if (model) {
            scene!.remove(model);
          }
          const geometry = new THREE.SphereGeometry(1, 32, 32);
          const material = new THREE.MeshStandardMaterial({ 
            color: 0xcccccc, 
            wireframe: true,
            transparent: true,
            opacity: 0.5 
          });
          model = new THREE.Group();
          const mesh = new THREE.Mesh(geometry, material);
          model.add(mesh);
          scene!.add(model);
        }
      );
    }

    function centerAndScaleModel(object: Group, THREE: ThreeModule) {
      const box: Box3 = new THREE.Box3().setFromObject(object);
      const size: Vector3 = new THREE.Vector3();
      box.getSize(size);
      const center: Vector3 = new THREE.Vector3();
      box.getCenter(center);

      object.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 2;
      const scale = maxDim > 0 ? targetSize / maxDim : 1;
      object.scale.setScalar(scale);
    }

    init();

    return () => {
      cancelled = true;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (scene) {
        scene.traverse((obj: Object3D) => {
          const mesh = obj as {
            isMesh?: boolean;
            geometry?: { dispose: () => void };
            material?:
              | { dispose: () => void }
              | Array<{ dispose: () => void }>
              | undefined;
          };
          if (mesh.isMesh) {
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => m.dispose());
              } else {
                mesh.material.dispose();
              }
            }
          }
        });
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [modelUrl, autoRotateSpeed]);

  return <div ref={containerRef} className={className} />;
}
