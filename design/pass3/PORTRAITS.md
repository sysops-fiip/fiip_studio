# FIIP studio portrait direction

Status: Sanjay Kandasamy’s portrait supplied by the user on 2026-11-20 and added as the original JPEG. The team card applies the existing monochrome treatment and 4:5 crop in CSS, preserving the original photograph. Awaiting photos for the remaining six studio artists and two collaborators.

Use a consistent 4:5 chest-up crop, monochrome, dark graphite seamless background, a large soft key from camera-left and a restrained rim light. Keep eyes near the upper third with generous headroom. Natural skin texture, relaxed expressions, plain dark clothing.

Preserve each person's identity, age, face shape, hair and distinguishing features. Do not substitute generated faces for real staff. Prefer references that are sharp, evenly lit and unobstructed; additional angles help.

Identity-preserving edit prompt:
“Using the supplied reference photo of [name], create an editorial studio portrait. Preserve their exact identity, age, facial proportions, hairstyle and natural skin texture. Chest-up, 4:5 portrait, relaxed expression, plain dark clothing, graphite seamless background, soft key from camera-left, subtle white rim light. Neutral monochrome, restrained contrast, realistic photographic detail. No beauty reshaping, no added accessories, no text.”

Deliver 1280×1600 master PNG and 640×800 WebP. Put the final web asset at public/images/team/[slug].webp, update the corresponding image field in content/studio.json, then run npm run sync:content. Inspect every person's likeness against the original before publishing. The component already supports images with initials as a network-failure fallback.
