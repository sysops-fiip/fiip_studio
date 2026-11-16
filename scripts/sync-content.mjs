#!/usr/bin/env node
/**
 * content -> data sync.
 * content/studio.json is the single source of truth.
 * This regenerates data/team.json (roster + collaborators) so the site can never
 * drift from the approved content. Run: npm run sync:content
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const studio = JSON.parse(readFileSync(join(root, 'content/studio.json'), 'utf8'));

const strip = (o, keys) => Object.fromEntries(Object.entries(o).filter(([k]) => !keys.includes(k)));

const team = [
  ...studio.roster.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    specialty: m.specialty,
    alsoDoes: m.alsoDoes ?? [],
    image: m.image,
    fallbackInitials: m.fallbackInitials,
    bio: m.bio,
    external: false,
  })),
  ...studio.collaborators.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    specialty: m.relationship ?? '',
    alsoDoes: [],
    image: m.image,
    fallbackInitials: m.fallbackInitials,
    bio: m.context ?? '',
    external: true,
  })),
];

writeFileSync(join(root, 'data/team.json'), JSON.stringify({ team }, null, 2) + '\n');
console.log(`data/team.json <- ${studio.roster.length} roster + ${studio.collaborators.length} collaborators`);
console.log(`projects (IMDb verified): ${studio.projects.length}`);
