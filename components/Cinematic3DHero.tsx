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
    // Check if device is mobile or low-power
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
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Warm Key Light (Tungsten Studio Lamp)
    const keyLight = new THREE.DirectionalLight(0xf5d48c, 2.8);
    keyLight.position.set(10, 10, 15);
    scene.add(keyLight);

    // Anamorphic Cold Rim Light (Icy Cyan Streak)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(-15, -10, -5);
    scene.add(rimLight);

    // --- 3D Anamorphic Cinema Lens Assembly ---
    const lensGroup = new THREE.Group();
    scene.add(lensGroup);

    // Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f28,
      metalness: 0.95,
      roughness: 0.25,
      wireframe: false,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd9a738,
      metalness: 0.9,
      roughness: 0.3,
      emissive: 0x422b0c,
      emissiveIntensity: 0.4,
    });

    const opticGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xa5f3fc,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 1.2,
      ior: 1.52,
      reflectivity: 0.9,
      transparent: true,
      opacity: 0.65,
    });

    const wireRingMat = new THREE.MeshBasicMaterial({
      color: 0xeabf60,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // 1. Outer Cinema Lens Barrel
    const barrelGeo = new THREE.CylinderGeometry(5.2, 5.2, 2.2, 48, 1, true);
    const barrel = new THREE.Mesh(barrelGeo, titaniumMat);
    barrel.rotation.x = Math.PI / 2;
    lensGroup.add(barrel);

    // 2. Front Anamorphic Optical Glass Element
    const glassGeo = new THREE.CylinderGeometry(5.0, 5.0, 0.3, 48);
    const glass = new THREE.Mesh(glassGeo, opticGlassMat);
    glass.rotation.x = Math.PI / 2;
    glass.position.z = 1.0;
    lensGroup.add(glass);

    // 3. Precision Focus Gear Ring (Outer Grooves)
    const gearRingGeo = new THREE.TorusGeometry(5.35, 0.12, 16, 64);
    const gearRing = new THREE.Mesh(gearRingGeo, goldAccentMat);
    gearRing.position.z = 0.5;
    lensGroup.add(gearRing);

    const gearRing2 = new THREE.Mesh(gearRingGeo, titaniumMat);
    gearRing2.position.z = -0.6;
    lensGroup.add(gearRing2);

    // 4. Calibrated Optical Markings Wireframe Rings
    const wireRing1 = new THREE.Mesh(new THREE.TorusGeometry(4.7, 0.05, 8, 48), wireRingMat);
    wireRing1.position.z = 1.1;
    lensGroup.add(wireRing1);

    const wireRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.04, 8, 36), wireRingMat);
    wireRing2.position.z = 0.8;
    lensGroup.add(wireRing2);

    // 5. Aperture Iris Blades (Internal Hexagonal/Octagonal Mechanism)
    const irisGroup = new THREE.Group();
    const bladeGeo = new THREE.BoxGeometry(2.4, 0.4, 0.08);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.8,
      roughness: 0.4,
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

    // 6. Signature Anamorphic Horizontal Flare Streaks
    const streakGeo = new THREE.PlaneGeometry(24, 0.15);
    const streakMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const streak = new THREE.Mesh(streakGeo, streakMat);
    streak.position.z = 1.3;
    lensGroup.add(streak);

    const streakWarmMat = new THREE.MeshBasicMaterial({
      color: 0xf5d48c,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const streakWarm = new THREE.Mesh(streakGeo, streakWarmMat);
    streakWarm.position.z = 1.25;
    streakWarm.scale.set(0.7, 0.8, 1);
    lensGroup.add(streakWarm);

    // --- Floating Film Particles / Bokeh Embers ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random() * 0.4 + 0.1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Shader / Material
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d48c,
      size: 0.18,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Interactive Mouse & Inertia Tracking ---
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
        targetRotationY = mouseX * 0.85;
        targetRotationX = mouseY * 0.65;
        targetPosX = mouseX * 2.2;
        targetPosY = -mouseY * 1.5;
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

    // --- Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mechanical inertia (lerp)
      if (!isDragging) {
        lensGroup.rotation.y += (targetRotationY - lensGroup.rotation.y) * 0.05;
        lensGroup.rotation.x += (targetRotationX - lensGroup.rotation.x) * 0.05;
        lensGroup.position.x += (targetPosX - lensGroup.position.x) * 0.05;
        lensGroup.position.y += (targetPosY - lensGroup.position.y) * 0.05;
      }

      // Gentle continuous optical breathing
      lensGroup.position.z = Math.sin(elapsedTime * 0.8) * 0.35;
      irisGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.25;

      // Bokeh particles drifting
      const positionsAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.005;
        posArray[i * 3] += Math.cos(elapsedTime * 0.5 + i) * 0.003;
      }
      positionsAttr.needsUpdate = true;

      // Dynamically swing anamorphic key light with cursor
      keyLight.position.x = 10 + mouseX * 12;
      keyLight.position.y = 10 - mouseY * 12;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      barrelGeo.dispose();
      glassGeo.dispose();
      gearRingGeo.dispose();
      bladeGeo.dispose();
      streakGeo.dispose();
      particleGeo.dispose();

      titaniumMat.dispose();
      goldAccentMat.dispose();
      opticGlassMat.dispose();
      wireRingMat.dispose();
      bladeMat.dispose();
      streakMat.dispose();
      streakWarmMat.dispose();
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
          title="Click and drag to rotate the 3D cinema anamorphic lens"
        />
      )}

      {/* Atmospheric Cinema Lighting Accents (Mobile & Desktop backdrop) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-accent-400/8 rounded-full blur-[140px]" />
      </div>

      {/* Cinema Telemetry HUD (Desktop Only) */}
      {!isMobile && (
        <div className="hidden lg:flex absolute bottom-8 left-8 right-8 justify-between items-end pointer-events-none text-[11px] font-mono text-gray-400">
          <div className="space-y-1 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">OPTICAL ENGINE · READY</span>
            </div>
            <p className="text-gray-400">COOKE ANAMORPHIC /i 2.0x · T1.3 WIDE OPEN</p>
            <p className="text-primary-300/80">ACEScc AP1 · ARRI LOG-C4 FINISHING</p>
          </div>

          <div className="text-right space-y-1 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/5">
            <p className="text-gray-400">REC 709 / P3-DCI REFERENCE</p>
            <p className="text-white font-bold tracking-widest">{timecode}</p>
            <p className="text-[10px] text-gray-500">
              {isInteracting ? 'INTERACTING WITH 3D LENS' : 'HOVER TO AIM · DRAG TO ROTATE'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cinematic3DHero;
