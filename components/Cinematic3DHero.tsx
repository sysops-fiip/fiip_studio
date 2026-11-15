'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function Cinematic3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timecode, setTimecode] = useState('01:00:24:18');
  const [isMobile, setIsMobile] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Live SMPTE Timecode Counter
  useEffect(() => {
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
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const isSmall = window.innerWidth < 768;
      setIsMobile(isTouch || isSmall);
      return isTouch || isSmall;
    };

    if (checkMobile()) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // --- Three.js Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // --- Monochrome Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Key Light (Crisp White Studio Projector)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(10, 12, 14);
    scene.add(keyLight);

    // Rim Light (Silver Edge Specular)
    const rimLight = new THREE.DirectionalLight(0xd4d4d4, 2.0);
    rimLight.position.set(-14, -8, -6);
    scene.add(rimLight);

    // --- 3D Monochrome Cinema Anamorphic Assembly ---
    const lensGroup = new THREE.Group();
    scene.add(lensGroup);

    // Materials: Obsidian Carbon, Brushed Chrome, Pure Optic Crystal
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f0f,
      metalness: 0.9,
      roughness: 0.3,
      wireframe: false,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe5e5e5,
      metalness: 0.98,
      roughness: 0.15,
    });

    const opticCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.04,
      transmission: 0.94,
      thickness: 1.5,
      ior: 1.54,
      reflectivity: 0.95,
      transparent: true,
      opacity: 0.7,
    });

    const wireScaleMat = new THREE.MeshBasicMaterial({
      color: 0x888888,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    // 1. Outer Cinema Lens Barrel (Obsidian Matte Titanium)
    const barrelGeo = new THREE.CylinderGeometry(5.2, 5.2, 2.4, 48, 1, true);
    const barrel = new THREE.Mesh(barrelGeo, obsidianMat);
    barrel.rotation.x = Math.PI / 2;
    lensGroup.add(barrel);

    // 2. Front Spherical Optic Glass Element
    const glassGeo = new THREE.CylinderGeometry(5.0, 5.0, 0.3, 48);
    const glass = new THREE.Mesh(glassGeo, opticCrystalMat);
    glass.rotation.x = Math.PI / 2;
    glass.position.z = 1.0;
    lensGroup.add(glass);

    // 3. Precision Focus Gear Rings (Brushed Chrome & Carbon)
    const gearRingGeo = new THREE.TorusGeometry(5.35, 0.1, 16, 64);
    const gearRing = new THREE.Mesh(gearRingGeo, chromeMat);
    gearRing.position.z = 0.5;
    lensGroup.add(gearRing);

    const gearRing2 = new THREE.Mesh(gearRingGeo, obsidianMat);
    gearRing2.position.z = -0.6;
    lensGroup.add(gearRing2);

    // 4. Optical Calibration Index Rings
    const wireRing1 = new THREE.Mesh(new THREE.TorusGeometry(4.8, 0.04, 8, 48), wireScaleMat);
    wireRing1.position.z = 1.1;
    lensGroup.add(wireRing1);

    const wireRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.03, 8, 36), wireScaleMat);
    wireRing2.position.z = 0.8;
    lensGroup.add(wireRing2);

    // 5. Aperture Iris Blades (8 Precision Titanium Leaves)
    const irisGroup = new THREE.Group();
    const bladeGeo = new THREE.BoxGeometry(2.4, 0.38, 0.06);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.85,
      roughness: 0.25,
    });

    const bladeCount = 8;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.x = Math.cos(angle) * 1.8;
      blade.position.y = Math.sin(angle) * 1.8;
      blade.rotation.z = angle + 0.4;
      irisGroup.add(blade);
    }
    irisGroup.position.z = 0.1;
    lensGroup.add(irisGroup);

    // 6. Monochromatic Anamorphic Streak (Pure Silver Refraction)
    const streakGeo = new THREE.PlaneGeometry(26, 0.12);
    const streakMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const streak = new THREE.Mesh(streakGeo, streakMat);
    streak.position.z = 1.25;
    lensGroup.add(streak);

    // --- Floating Film Silver Dust Particles ---
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4d4d4,
      size: 0.14,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse & Inertia Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetPosX = 0;
    let targetPosY = 0;

    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        lensGroup.rotation.y += deltaX * 0.008;
        lensGroup.rotation.x += deltaY * 0.008;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      } else {
        targetRotationY = mouseX * 0.8;
        targetRotationX = mouseY * 0.6;
        targetPosX = mouseX * 2.0;
        targetPosY = -mouseY * 1.4;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Render Loop ---
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        lensGroup.rotation.y += (targetRotationY - lensGroup.rotation.y) * 0.05;
        lensGroup.rotation.x += (targetRotationX - lensGroup.rotation.x) * 0.05;
        lensGroup.position.x += (targetPosX - lensGroup.position.x) * 0.05;
        lensGroup.position.y += (targetPosY - lensGroup.position.y) * 0.05;
      }

      lensGroup.position.z = Math.sin(elapsedTime * 0.7) * 0.3;
      irisGroup.rotation.z = Math.sin(elapsedTime * 0.35) * 0.2;

      const positionsAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.004;
        posArray[i * 3] += Math.cos(elapsedTime * 0.5 + i) * 0.002;
      }
      positionsAttr.needsUpdate = true;

      keyLight.position.x = 10 + mouseX * 10;
      keyLight.position.y = 12 - mouseY * 10;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('resize', handleResize);

      barrelGeo.dispose();
      glassGeo.dispose();
      gearRingGeo.dispose();
      bladeGeo.dispose();
      streakGeo.dispose();
      particleGeo.dispose();

      obsidianMat.dispose();
      chromeMat.dispose();
      opticCrystalMat.dispose();
      wireScaleMat.dispose();
      bladeMat.dispose();
      streakMat.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 3D WebGL Canvas Layer on Desktop */}
      {!isMobile && (
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
          title="Drag to inspect 3D optical lens"
        />
      )}

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
