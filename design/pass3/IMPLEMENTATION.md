# Pass 3 implementation

## Visual direction
Monochrome optical instrument study, large cinematic project images, restrained typography, round controls and one ochre commissioning accent. Homepage shortened to selected work, studio reel, disciplines, Frames, people and contact. Dedicated Frames page describes the existing review service without changing its backend.

## Assets and performance
The generated reference image is the hero. Responsive WebP versions are 112 KB desktop / 40 KB mobile. Three.js and the GLB load only after clicking “Explore the lens”; no automatic camera animation runs. The 3D study supports drag, zoom, keyboard turn controls, reset, Escape, focus restoration and a static fallback when WebGL is unavailable. The lens model is rebuilt from clean precision geometry after the Trellis-generated mesh failed visual inspection. Run `node scripts/build-lens.mjs` to regenerate the shipped GLB. Its materials preserve housing, metal trim, iris blades and transparent coated glass under studio environment lighting.

## Comfy investigation
The local Trellis Q4 workflow was submitted successfully, but its decoder required an unavailable tiled function from o_voxel. `run-local-mesh.py` executes the same Comfy node classes in an isolated process, with non-tiled decoding and an explicit error sentinel for the missing optional function. No shared Comfy files were modified. It exported a mesh, but the result was jagged and unusable for the final visual quality. The generated mesh is retained under the ignored `mesh-output/` directory, not served by the website. No Comfy Cloud credits were used; the cloud CLI was signed out.

## Content and contact
Home and studio copy come from content/studio.json. Services use the existing authoritative discipline summaries. Studio roster separates seven resident artists from two cinematography collaborators. Portrait style and identity-preserving prompt are in PORTRAITS.md; real reference photos are still needed.

The old contact form displayed a success message without submitting. It now explicitly prepares an email draft in the visitor's mail app and instructs the visitor to review and send. Unverified address, phone and response-time claims have been removed from the revised contact page/footer. This does not add a backend or change mail infrastructure.

## Deployment
The user authorized publishing with “Do it all.” The existing project requires Vercel MCP, project `fiip-studio`, ID `prj_2nI2HSLmTOFoN9tv9Uvl6Y3QZNEQ`, team `team_CTMriR7xexy5mswAMgIixehC`. The session must have the Vercel integration connected before deployment can be performed. Do not substitute a shell deployment or a different host.
