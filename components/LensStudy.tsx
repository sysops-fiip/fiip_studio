'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { X, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LensStudy({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const reset = useRef<() => void>(() => {});
  const turn = useRef<(angle: number) => void>(() => {});
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  useEffect(() => {
    const modal = dialog.current!;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    return () => { modal.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }); };
  }, []);

  useEffect(() => {
    const target = host.current!;
    let cancelled = false;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch { setStatus('failed'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    target.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .01, 100);
    camera.position.set(1.6, .75, 2.6).normalize().multiplyScalar(3.2);
    let framing = 1;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.minDistance = 1.4;
    controls.maxDistance = 6;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture;
    room.dispose(); pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x121212, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 3.5); key.position.set(-3, 4, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 2); rim.position.set(3, 1, -2); scene.add(rim);
    const render = () => { if (!cancelled) renderer.render(scene, camera); };
    const resize = () => {
      const width = target.clientWidth, height = target.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height); camera.aspect = width / height;
      const nextFraming = Math.max(1, 1 / camera.aspect);
      camera.position.multiplyScalar(nextFraming / framing); framing = nextFraming;
      controls.minDistance = 1.4 * framing; controls.maxDistance = 6 * framing;
      camera.updateProjectionMatrix(); controls.update(); render();
    };
    const observer = new ResizeObserver(resize); observer.observe(target);
    controls.addEventListener('change', render);
    const loseContext = (event: Event) => { event.preventDefault(); setStatus('failed'); };
    renderer.domElement.addEventListener('webglcontextlost', loseContext);
    reset.current = () => {
      camera.position.set(1.6, .75, 2.6).normalize().multiplyScalar(3.2 * framing);
      controls.target.set(0, 0, 0); controls.update(); render();
    };
    turn.current = (angle: number) => {
      const offset = camera.position.clone().sub(controls.target);
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      camera.position.copy(controls.target).add(offset); controls.update(); render();
    };
    new GLTFLoader().load('/models/cinema-lens.glb', gltf => {
      gltf.scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          if (cancelled) {
            object.geometry.dispose();
            (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => m.dispose());
          }
        }
      });
      if (cancelled) return;
      const bounds = new THREE.Box3().setFromObject(gltf.scene);
      const size = bounds.getSize(new THREE.Vector3());
      const centre = bounds.getCenter(new THREE.Vector3());
      gltf.scene.position.sub(centre);
      const group = new THREE.Group(); group.add(gltf.scene);
      group.scale.setScalar(1.5 / Math.max(size.x, size.y, size.z));
      scene.add(group); controls.update(); controls.saveState(); resize(); setStatus('ready');
    }, undefined, () => { if (!cancelled) setStatus('failed'); });
    resize();
    return () => {
      cancelled = true; observer.disconnect(); controls.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', loseContext);
      scene.traverse(object => { if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => m.dispose());
      } }); environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return createPortal(<dialog ref={dialog} className="lens-dialog" aria-labelledby="lens-study-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="lens-dialog-panel"><div className="lens-dialog-header"><div><p className="eyebrow">FIIP / Optical study 001</p><h2 id="lens-study-title">A closer look.</h2></div><button autoFocus onClick={onClose} aria-label="Close lens study" className="lens-close"><X size={20} /></button></div>
      <div className="lens-stage"><div ref={host} className="lens-canvas" aria-label="Interactive cinema lens model" />{status !== 'ready' && <div className="lens-stage-message" role="status">{status === 'loading' ? 'Bringing the lens into focus…' : <><img src="/images/optics/cinema-lens-mobile.webp" alt="Cinema lens study" /><p>The interactive view is unavailable on this device.</p></>}</div>}</div>
      <div className="lens-dialog-controls"><span>Drag to turn · Pinch or scroll to zoom</span><div className="lens-keyboard-controls"><button onClick={() => turn.current(-Math.PI / 8)} aria-label="Turn lens left" className="lens-turn"><ChevronLeft size={18} /></button><button onClick={() => turn.current(Math.PI / 8)} aria-label="Turn lens right" className="lens-turn"><ChevronRight size={18} /></button><button onClick={() => reset.current()} className="text-link"><RotateCcw size={14} />Reset view</button></div></div>
    </div>
  </dialog>, document.body);
}
