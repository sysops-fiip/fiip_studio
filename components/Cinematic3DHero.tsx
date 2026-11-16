'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function Cinematic3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timecode, setTimecode] = useState('01:00:24:18');
  const [isMobile, setIsMobile] = useState(false);
  const isInteracting = false;

  // Live SMPTE Timecode Counter
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 18;
    let sec = 24;
    let min = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
        }
      }
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimecode(`01:${pad(min)}:${pad(sec)}:${pad(frame)}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // A single large studio softbox provides broad, neutral metal reflections.
    const studio = new THREE.Scene();
    studio.background = new THREE.Color(0x161616);
    const softboxGeometry = new THREE.PlaneGeometry(9, 12);
    const softboxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const softbox = new THREE.Mesh(softboxGeometry, softboxMaterial);
    softbox.position.set(-5, 7, 8);
    softbox.lookAt(0, 0, 0);
    studio.add(softbox);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(studio, 0.08);
    scene.environment = environment.texture;
    pmrem.dispose();
    softboxGeometry.dispose();
    softboxMaterial.dispose();

    const key = new THREE.DirectionalLight(0xffffff, 3);
    key.position.set(-5, 7, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 2);
    rim.position.set(5, 2, -4);
    scene.add(rim);

    const graphite = new THREE.MeshStandardMaterial({
      color: 0x242424, metalness: 0.95, roughness: 0.36,
    });
    const titanium = new THREE.MeshStandardMaterial({
      color: 0x777777, metalness: 1, roughness: 0.3,
    });
    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0x383838, metalness: 0.9, roughness: 0.4, side: THREE.DoubleSide,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdadada, metalness: 0, roughness: 0.12,
      transmission: 0.65, thickness: 0.12, ior: 1.5,
      clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 0.7,
    });
    const assembly = new THREE.Group();
    scene.add(assembly);

    // All cylinder axes run along Z. Annular faces leave a real optical cavity.
    const addRing = (outer: number, inner: number, depth: number, z: number,
      material: THREE.MeshStandardMaterial) => {
      const wall = new THREE.Mesh(
        new THREE.CylinderGeometry(outer, outer, depth, 96, 1, true), material,
      );
      wall.rotation.x = Math.PI / 2;
      wall.position.z = z;
      assembly.add(wall);
      const innerMaterial = material.clone();
      innerMaterial.side = THREE.BackSide;
      const inside = new THREE.Mesh(
        new THREE.CylinderGeometry(inner, inner, depth, 96, 1, true), innerMaterial,
      );
      inside.rotation.x = Math.PI / 2;
      inside.position.z = z;
      assembly.add(inside);
      for (const side of [-1, 1]) {
        const face = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 96), material);
        face.position.z = z + side * depth / 2;
        if (side < 0) face.rotation.y = Math.PI;
        assembly.add(face);
      }
    };
    // Five machined barrel steps taper toward the rear mount.
    [
      [2.65, 2.35, 0.38, 1.15],
      [2.53, 2.28, 0.56, 0.68],
      [2.4, 2.2, 0.72, 0.04],
      [2.21, 2.03, 0.6, -0.62],
      [1.98, 1.8, 0.52, -1.18],
    ].forEach(([outer, inner, depth, z]) => addRing(outer, inner, depth, z, graphite));
    addRing(2.67, 2.34, 0.055, 1.37, titanium);
    addRing(2.43, 2.2, 0.07, 0.33, titanium);
    addRing(2.08, 1.72, 0.17, -1.5, titanium);
    // Fine circumferential machining, with no crossing geometry.
    for (let i = 0; i < 14; i++) {
      addRing(2.545, 2.515, 0.012, 0.44 + i * 0.032, graphite);
    }
    addRing(2.3, 1.84, 0.18, 0.89, graphite);

    const iris = new THREE.Group();
    iris.position.z = 0.63;
    assembly.add(iris);
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.68, -0.28);
    bladeShape.quadraticCurveTo(1.15, -1.12, 1.83, -0.72);
    bladeShape.lineTo(2.04, 0.45);
    bladeShape.quadraticCurveTo(1.18, 0.25, 0.68, -0.28);
    const bladeGeometry = new THREE.ExtrudeGeometry(bladeShape, {
      depth: 0.012, bevelEnabled: false, curveSegments: 20,
    });
    for (let i = 0; i < 8; i++) {
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.rotation.z = i * Math.PI / 4;
      blade.position.z = i * 0.014;
      iris.add(blade);
    }
    // Recessed anamorphic glass: an oval optical surface, never a sphere.
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.08, 96), glassMaterial);
    glass.rotation.x = Math.PI / 2;
    glass.scale.z = 0.82;
    glass.position.z = 1.03;
    assembly.add(glass);

    let pointerX = 0;
    let pointerY = 0;
    let scroll = 0;
    let frame = 0;
    let lastTime = 0;
    const onPointerMove = (event: PointerEvent) => {
      pointerX = THREE.MathUtils.clamp(event.clientX / window.innerWidth - 0.5, -0.5, 0.5);
      pointerY = THREE.MathUtils.clamp(event.clientY / window.innerHeight - 0.5, -0.5, 0.5);
    };
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const reduced = motionQuery.matches;
      const ease = 1 - Math.exp(-dt * 3);
      scroll = reduced ? 0 : THREE.MathUtils.lerp(scroll,
        THREE.MathUtils.clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, 1), ease);
      assembly.rotation.set(-0.12 + scroll * 0.12, -0.42 + scroll * 0.24, -0.08);
      if (!reduced) iris.rotation.z += dt * 0.035;
      else iris.rotation.z = 0;
      camera.position.x = reduced ? 0 : THREE.MathUtils.lerp(camera.position.x, pointerX * 0.32, ease);
      camera.position.y = reduced ? 0.35 : THREE.MathUtils.lerp(camera.position.y, 0.35 - pointerY * 0.22, ease);
      camera.position.z = (camera.aspect < 1 ? 15 : 12) - scroll * 0.7;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      if (!reduced) frame = requestAnimationFrame(render);
    };
    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      if (motionQuery.matches) render(performance.now());
    };
    const onMotionChange = () => {
      cancelAnimationFrame(frame);
      lastTime = performance.now();
      render(lastTime);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    motionQuery.addEventListener('change', onMotionChange);
    resize();
    onMotionChange();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      motionQuery.removeEventListener('change', onMotionChange);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          const meshMaterials = Array.isArray(object.material) ? object.material : [object.material];
          meshMaterials.forEach(material => materials.add(material));
        }
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Responsive optical product shot */}
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at 48% 38%, #242424 0%, #101010 45%, #050505 85%)' }}
        />

      {/* Film Slate Telemetry HUD (Desktop Only - Pure Monochrome) */}
      {!isMobile && (
        <div className="hidden lg:flex absolute bottom-8 left-8 right-8 justify-between items-end pointer-events-none text-[11px] font-mono text-neutral-400">
          <div className="space-y-1 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-none border border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white" />
              <span className="text-white font-medium tracking-wider">OPTICS · 50MM ANAMORPHIC T1.3</span>
            </div>
            <p className="text-neutral-400">ACES 2065-1 / DCI-P3 · ARRI LOG-C4 FINISHING</p>
            <p className="text-neutral-300">10G NVME COLLABORATIVE TIMELINES</p>
          </div>

          <div className="text-right space-y-1 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-none border border-neutral-800">
            <p className="text-neutral-400">REF: 24.000 FPS · REC 709 / MASTER</p>
            <p className="text-white font-semibold tracking-widest">{timecode}</p>
            <p className="text-[10px] text-neutral-300">
              {isInteracting ? 'MANUAL ROTATION ACTIVE' : 'DRAG TO ROTATE 3D LENS'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cinematic3DHero;
