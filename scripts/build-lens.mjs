/** Reference-led precision reconstruction after the generated mesh failed visual QA. */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { writeFile } from 'node:fs/promises';

globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(result => { this.result = result; this.onloadend?.(); }); }
  readAsDataURL(blob) { blob.arrayBuffer().then(result => { this.result = `data:${blob.type};base64,${Buffer.from(result).toString('base64')}`; this.onloadend?.(); }); }
};
const lens = new THREE.Group(); lens.name = 'FIIP cinema optics';
const housing = new THREE.MeshStandardMaterial({ name: 'Black anodised aluminium', color: 0x181818, metalness: .8, roughness: .28 });
const grip = new THREE.MeshStandardMaterial({ name: 'Focus gears', color: 0x111111, metalness: .6, roughness: .4 });
const trim = new THREE.MeshStandardMaterial({ name: 'Brushed steel bevels', color: 0x999999, metalness: 1, roughness: .23 });
const paint = new THREE.MeshStandardMaterial({ name: 'Engraved marks', color: 0xbbbbbb, metalness: .25, roughness: .5 });
const back = new THREE.MeshBasicMaterial({ name: 'Optical cavity', color: 0x020202 });
function mesh(geometry, material, name) { const object = new THREE.Mesh(geometry, material); object.name = name; lens.add(object); return object; }
function ring(outer, inner, depth, z, material, bevel = .012) {
  const lo = z-depth/2, hi=z+depth/2, b=Math.min(bevel,depth*.3,(outer-inner)*.3);
  const profile = [[inner+b,lo],[outer-b,lo],[outer,lo+b],[outer,hi-b],[outer-b,hi],[inner+b,hi],[inner,hi-b],[inner,lo+b],[inner+b,lo]];
  const geometry = new THREE.LatheGeometry(profile.map(([r,h])=>new THREE.Vector2(r,h)),128); geometry.rotateX(Math.PI/2);
  return mesh(geometry,material,'Machined barrel ring');
}
ring(1.0,.81,1.9,-.15,housing,.035);
ring(.91,.69,.22,-1.18,trim,.018);
ring(.94,.69,.08,-1.3,housing);
ring(1.10,.88,.18,.85,housing,.025);
ring(1.105,1.077,.045,.95,trim,.008);
ring(.912,.893,.045,.95,trim,.006);
ring(.887,.83,.08,.80,housing);
ring(.835,.805,.06,.73,trim,.006);
for(let i=0;i<12;i++) ring(.893,.879,.008,.78+i*.011,housing,.002);
for(const z of [.48,-.16,-.84]) {
  ring(1.035,.985,.25,z,grip);
  ring(1.04,1.02,.018,z-.13,trim,.004);
  ring(1.04,1.02,.018,z+.13,housing,.004);
  const teeth=[];
  for(let i=0;i<112;i++) {
    const angle=i/112*Math.PI*2;
    const g=new THREE.BoxGeometry(.022,.075,.22);
    g.translate(0,1.05,z); g.rotateZ(angle); teeth.push(g);
  }
  const merged=mergeGeometries(teeth);teeth.forEach(g=>g.dispose());mesh(merged,grip,'112-tooth focus gear');
}
const marks=[];
for(let i=0;i<60;i++) {
  const angle=i/60*Math.PI*2;
  const g=new THREE.BoxGeometry(.008,.005,i%5===0?.14:.06);
  g.translate(0,1.003,.12);g.rotateZ(angle);marks.push(g);
}
mesh(mergeGeometries(marks),paint,'Focus scale');marks.forEach(g=>g.dispose());
for(let i=0;i<6;i++) {
  const a=i*Math.PI/3;
  const screw=mesh(new THREE.CylinderGeometry(.025,.025,.01,16),trim,'Mount screw');
  screw.rotation.x=Math.PI/2;screw.position.set(.82*Math.cos(a),.82*Math.sin(a),-1.3);
}
const step=Math.PI*2/9;
for(let i=0;i<9;i++) {
  const blade=new THREE.Shape();blade.moveTo(.24,0);blade.lineTo(.81*Math.cos(.6),.81*Math.sin(.6));blade.absarc(0,0,.81,.6,.6+step,false);blade.lineTo(.24*Math.cos(step),.24*Math.sin(step));blade.closePath();
  const g=new THREE.ShapeGeometry(blade,32);g.rotateZ(i*step);g.translate(0,0,.58);
  mesh(g,new THREE.MeshStandardMaterial({ name:`Iris blade ${i+1}`,color:new THREE.Color().setScalar(.065+i*.004),metalness:.72,roughness:.36,side:THREE.DoubleSide}),'Overlapping iris blade');
}
const cavity=mesh(new THREE.CircleGeometry(.81,128),back,'Aperture well');cavity.position.z=.55;
const glassGeometry=new THREE.SphereGeometry(1.7,96,32,0,Math.PI*2,0,Math.asin(.87/1.7));
glassGeometry.rotateX(Math.PI/2); // Sphere cap +Y becomes the lens front, +Z.
glassGeometry.translate(0,0,-.64);
const glass=new THREE.MeshPhysicalMaterial({name:'Optical glass',color:0x222222,metalness:.15,roughness:.06,transmission:0,thickness:.06,ior:1.52,clearcoat:.8,clearcoatRoughness:.03,transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide});
mesh(glassGeometry,glass,'Convex front element');
const exporter=new GLTFExporter();
const binary=await exporter.parseAsync(lens,{binary:true,onlyVisible:true});
await writeFile('public/models/cinema-lens.glb',Buffer.from(binary));
console.log(`Saved public/models/cinema-lens.glb (${binary.byteLength} bytes)`);
