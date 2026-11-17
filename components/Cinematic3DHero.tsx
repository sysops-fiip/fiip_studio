'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { useVisualQuality } from './ui/VisualQuality';

export function Cinematic3DHero() {
  const container = useRef<HTMLDivElement>(null);
  const { tier, canAnimate, devicePixelBudget, reportFrame, bindContext, reportFailure } = useVisualQuality();
  useEffect(() => {
    if (!canAnimate || !container.current) return;
    const host = container.current;
    let dispose = () => {};
    let cancelled = false;
    // Two paint opportunities leave the server-rendered headline ahead of GPU setup.
    let deferred = requestAnimationFrame(() => { deferred = requestAnimationFrame(() => {
      if (cancelled) return;
      let renderer: THREE.WebGLRenderer;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: tier === 'full', powerPreference: 'low-power' }); }
      catch { reportFailure(); return; }
      const unbind = bindContext(renderer.domElement);
      renderer.domElement.style.cssText = 'width:100%;height:100%;opacity:0';
      host.appendChild(renderer.domElement);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, .1, 50);
      const lens = new THREE.Group(); scene.add(lens);
      const dark = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: .55, roughness: .32, side: THREE.DoubleSide });
      const edge = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: .65, roughness: .24, side: THREE.DoubleSide });
      const blades = new THREE.MeshStandardMaterial({ vertexColors: true, metalness: .35, roughness: .48, side: THREE.DoubleSide });
      const buckets: THREE.BufferGeometry[][] = [[], [], []];
      const ring = (outer: number, inner: number, depth: number, z: number, bucket = 0) => {
        const wall = new THREE.CylinderGeometry(outer, outer, depth, 80, 1, true); wall.rotateX(Math.PI / 2); wall.translate(0, 0, z); buckets[bucket].push(wall);
        const cavity = new THREE.CylinderGeometry(inner, inner, depth, 80, 1, true); cavity.rotateX(Math.PI / 2); cavity.translate(0, 0, z); buckets[bucket].push(cavity);
        for (const side of [-1, 1]) { const face = new THREE.RingGeometry(inner, outer, 80); face.translate(0, 0, z + side * depth / 2); buckets[bucket].push(face); }
      };
      ring(2.55, 2.21, .35, 1.15); ring(2.45, 2.08, .8, .57); ring(2.26, 1.85, .8, -.23); ring(1.98, 1.5, .6, -.93);
      ring(2.57, 2.53, .025, 1.34, 1); ring(2.23, 2.20, .025, 1.34, 1); ring(2.47, 2.4, .025, .93, 1); ring(2.28, 2.19, .025, -.01, 1);
      // Repeated machining is merged into the barrel's single draw call.
      for (let i = 0; i < 20; i++) ring(2.47, 2.44, .014, .22 + i * .03);
      ring(2.19, 1.78, .36, .74); ring(1.8, 1.48, .22, .33);
      // Swept sectors meet at a regular nonagon: no star-shaped gaps between blades.
      const bladeCount = 9, step = Math.PI * 2 / bladeCount;
      for (let i = 0; i < bladeCount; i++) {
        const shape = new THREE.Shape();
        const inner = .53, outer = 1.84, sweep = .48;
        shape.moveTo(inner, 0);
        shape.lineTo(outer * Math.cos(sweep), outer * Math.sin(sweep));
        shape.absarc(0, 0, outer, sweep, sweep + step, false);
        shape.lineTo(inner * Math.cos(step), inner * Math.sin(step));
        shape.closePath();
        const g = new THREE.ShapeGeometry(shape, 24);
        g.rotateZ(i * step); g.translate(0, 0, .21);
        const colors = [];
        const positions = g.getAttribute('position');
        for (let v = 0; v < positions.count; v++) {
          const radius = Math.hypot(positions.getX(v), positions.getY(v));
          const shade = .035 + (i % 3) * .012 + .025 * (radius / outer);
          colors.push(shade, shade, shade);
        }
        g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        buckets[2].push(g);
      }
      buckets.forEach((parts, i) => { const merged = mergeGeometries(parts); parts.forEach(g => g.dispose()); if (merged) lens.add(new THREE.Mesh(merged, [dark, edge, blades][i])); });
      const optical = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false,
        vertexShader: `varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
          void main(){vUv=uv; vec4 p=modelViewMatrix*vec4(position,1.);vNormal=normalize(normalMatrix*normal);vView=-p.xyz;gl_Position=projectionMatrix*p;}`,
        fragmentShader: `varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
          void main(){vec2 p=(vUv-.5)*2.;float r=length(p);vec2 q=p*(1.+.035*r*r);
          float fres=pow(1.-abs(dot(normalize(vNormal),normalize(vView))),3.);
          float box1=exp(-pow(abs((q.x+.48+q.y*.22)/.115),4.)-pow(abs((q.y-.24)/.52),4.));
          float box2=exp(-pow(abs((q.x-.59+q.y*.15)/.045),4.)-pow(abs((q.y+.12)/.4),4.));
          float a=atan(p.y,p.x);float polygon=cos(3.14159265/9.)/cos(mod(a+3.14159265/9.,6.2831853/9.)-3.14159265/9.);
          float aperture=smoothstep(.29*polygon,.32*polygon,r);
          float value=clamp(.008+fres*.33+box1*.24+box2*.42,0.,.72);
          gl_FragColor=vec4(vec3(value),clamp(.12+fres*.5+(box1+box2)*.65+(1.-aperture)*.5,0.,.88));}`,
      });
      const glass = new THREE.Mesh(new THREE.CircleGeometry(1.77, 96), optical); glass.position.z = .48; lens.add(glass);
      const black = new THREE.MeshBasicMaterial({ color: 0x010101 });
      const back = new THREE.Mesh(new THREE.CircleGeometry(1.5, 80), black); back.position.z = -.4; lens.add(back);
      scene.add(new THREE.AmbientLight(0xffffff, .5));
      const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(-3, 5, 6); scene.add(key);
      const rim = new THREE.DirectionalLight(0xffffff, 2); rim.position.set(5, -1, 2); scene.add(rim);
      let frame = 0, last = 0, visible = false, mouseX = 0, mouseY = 0, portraitFrame = false;
      const fine = matchMedia('(hover: hover) and (pointer: fine)');
      const pointer = (e: PointerEvent) => { if (!fine.matches || e.pointerType !== 'mouse' || !e.isTrusted) return; mouseX = (e.clientX / innerWidth - .5) * .12; mouseY = (e.clientY / innerHeight - .5) * .09; };
      const render = (time: number) => {
        frame = 0;
        if (!visible || document.hidden || cancelled) return;
        if (last) reportFrame(time - last); last = time;
        lens.rotation.y += (-.48 + mouseX - lens.rotation.y) * .045;
        lens.rotation.x += ((portraitFrame ? .3 : .16) + mouseY - lens.rotation.x) * .045;
        try { renderer.render(scene, camera); renderer.domElement.style.opacity = '1'; host.parentElement?.classList.add('lens-ready'); }
        catch { reportFailure(); return; }
        frame = requestAnimationFrame(render);
      };
      const resume = () => { cancelAnimationFrame(frame); last = 0; if (visible && !document.hidden) frame = requestAnimationFrame(render); };
      const resize = () => {
        const w = Math.max(host.clientWidth, 1), h = Math.max(host.clientHeight, 1);
        const portrait = w < 768; portraitFrame = portrait;
        camera.aspect = w / h; camera.position.set(0, 0, portrait ? 10.8 : 10); camera.updateProjectionMatrix();
        // Portrait: a high, cropped three-quarter product study, with copy below.
        lens.position.set(portrait ? .85 : 2.7, portrait ? 1.65 : .1, 0);
        lens.scale.setScalar(portrait ? .48 : .78);
        lens.rotation.set(portrait ? .3 : .16, -.48, portrait ? -.24 : -.1);
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2, Math.sqrt(devicePixelBudget / (w * h))));
        renderer.setSize(w, h, false); resume();
      };
      const sizing = new ResizeObserver(resize); sizing.observe(host);
      const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; resume(); }); intersection.observe(host);
      window.addEventListener('pointermove', pointer, { passive: true }); document.addEventListener('visibilitychange', resume);
      resize();
      dispose = () => { cancelAnimationFrame(frame); sizing.disconnect(); intersection.disconnect(); unbind(); window.removeEventListener('pointermove', pointer); document.removeEventListener('visibilitychange', resume);
        scene.traverse(o => { if (o instanceof THREE.Mesh) o.geometry.dispose(); }); [dark, edge, blades, optical, black].forEach(m => m.dispose()); renderer.dispose(); renderer.domElement.remove(); host.parentElement?.classList.remove('lens-ready'); };
    }); });
    return () => { cancelled = true; cancelAnimationFrame(deferred); dispose(); };
  }, [tier, canAnimate, devicePixelBudget, reportFrame, bindContext, reportFailure]);
  return <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden select-none">
    <div className="lens-poster"><div className="lens-poster-barrel"><div className="lens-poster-cavity"><div className="lens-poster-iris" /></div></div></div>
    <div ref={container} className="absolute inset-0" />
  </div>;
}
export default Cinematic3DHero;
