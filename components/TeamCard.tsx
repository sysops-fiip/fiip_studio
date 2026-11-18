'use client';

import { useState } from 'react';

interface TeamCardProps {
  name: string;
  role: string;
  specialty?: string;
  image: string | null;
  fallbackInitials?: string;
  bio?: string;
}

export function TeamCard({ name, role, image, fallbackInitials, bio }: TeamCardProps) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const initials = fallbackInitials || name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return <article className="portrait-card">
    <div className="portrait-image">
      {image && image !== failedImage ? <img src={image} alt={name} width="640" height="800" loading="lazy" onError={() => setFailedImage(image)} /> : <div className="portrait-monogram" aria-hidden="true">{initials}</div>}
    </div>
    <div className="portrait-caption"><h3>{name}</h3><p className="portrait-role">{role}</p>{bio && <p>{bio}</p>}</div>
  </article>;
}
