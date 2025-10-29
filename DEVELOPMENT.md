# Development Guide - Fix It In Post Studios

## Project Overview

This is a cinematic, responsive website for Fix It In Post Studios built with Next.js 16, Tailwind CSS, and Framer Motion.

## Architecture

### Pages (App Router)
- **Route-based file structure**: Each page is defined as a `page.tsx` file in its route folder
- **Server & Client Components**: Root layout is server-rendered, pages use client components for interactivity
- **Metadata**: SEO metadata is managed in `app/layout.tsx`

### Components
All reusable components are stored in `/components`:

| Component | Purpose | Props |
|-----------|---------|-------|
| `Navbar` | Sticky header navigation | - |
| `Footer` | Footer with contact info | - |
| `ServiceCard` | Service tier display | `icon`, `title`, `description`, `price`, `features`, `delay` |
| `PortfolioCard` | Project showcase | `id`, `title`, `category`, `image`, `videoUrl`, `description`, `delay` |
| `TeamCard` | Team member card | `name`, `role`, `image`, `bio`, `delay` |
| `BeforeAfterSlider` | Interactive image slider | `beforeImage`, `afterImage`, `beforeLabel`, `afterLabel` |
| `PricingCalculator` | Dynamic pricing tool | - |

### Data Management
All content is stored in `/data` as JSON files:

- **`projects.json`** - Portfolio projects with metadata
- **`pricing.json`** - Service tiers, pricing, and FAQ
- **`team.json`** - Team members information

### Styling
- **Global styles**: `app/globals.css` (Tailwind + custom CSS)
- **Tailwind config**: `tailwind.config.ts` (animations, fonts, extensions)
- **CSS classes**:
  - `.gradient-text` - Gradient text effect
  - `.glass-effect` - Frosted glass background
  - `.section-padding` - Responsive padding
  - `.container-responsive` - Max-width container

## Adding New Features

### Adding a New Page

1. Create a new folder in `/app`: `app/new-page/`
2. Create `page.tsx` inside the folder:

```typescript
'use client';

import { motion } from 'framer-motion';

export default function NewPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <section className="section-padding">
        <div className="container-responsive">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold"
          >
            Page Title
          </motion.h1>
        </div>
      </section>
    </div>
  );
}
```

3. Update the Navbar to include the new link in `components/Navbar.tsx`:

```typescript
const navItems = [
  // ... existing items
  { label: 'New Page', href: '/new-page' },
];
```

### Adding a New Component

1. Create component file in `/components`: `ComponentName.tsx`
2. Use TypeScript interfaces for props:

```typescript
interface ComponentNameProps {
  title: string;
  description: string;
  delay?: number;
}

export function ComponentName({ title, description, delay = 0 }: ComponentNameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      {/* Component content */}
    </motion.div>
  );
}
```

### Updating Content

Edit JSON files in `/data`:

```json
{
  "projects": [
    {
      "id": "unique-id",
      "title": "Project Name",
      "category": "Category",
      "image": "image-url",
      "description": "Description",
      "videoUrl": "video-url"
    }
  ]
}
```

## Styling Guidelines

### Color Usage
- **Primary (Blue)**: `rgb(59, 130, 246)` - Use for main CTAs, highlights
- **Accent (Orange)**: `rgb(249, 115, 22)` - Use for emphasis, secondary actions
- **Text**: `#ffffff` for main text, `rgb(156, 163, 175)` for secondary
- **Background**: `#111827` for dark backgrounds

### Responsive Design
Use Tailwind's responsive prefixes:
```typescript
<div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
```

### Animations
Use Framer Motion for all animations:

```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

Common animation patterns:
- **Fade up**: `initial={{ opacity: 0, y: 30 }}`
- **Fade in**: `initial={{ opacity: 0 }}`
- **Scale**: `initial={{ opacity: 0, scale: 0.9 }}`
- **Slide**: `initial={{ opacity: 0, x: -20 }}`

## Performance Tips

1. **Images**:
   - Use Next.js `Image` component for optimization
   - Lazy load images on portfolio
   - Use WebP format where possible

2. **Code Splitting**:
   - Use dynamic imports for heavy components
   - Keep components small and focused

3. **Bundle Size**:
   - Monitor package size with `npm run build`
   - Tree-shake unused dependencies

4. **SEO**:
   - Update meta tags in `app/layout.tsx`
   - Add structured data for rich results

## Testing

Current test setup: None (add Jest/Vitest as needed)

To add tests:
1. Install testing library: `npm install --save-dev @testing-library/react`
2. Create `__tests__` folder next to components
3. Write tests for critical components

## Debugging

### Development
```bash
npm run dev
```
Access at `http://localhost:3000`

### Build Issues
```bash
npm run build
```
Check Turbopack errors in console

### Type Checking
```bash
npx tsc --noEmit
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:
```bash
cp .env.example .env.local
```

Current environment variables:
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## Deployment Checklist

Before deploying:
- [ ] Update metadata in `app/layout.tsx`
- [ ] Replace placeholder images with real content
- [ ] Update contact information in Footer
- [ ] Test all links work correctly
- [ ] Check responsive design on mobile
- [ ] Verify animations are smooth
- [ ] Test form submissions
- [ ] Update Google Maps embed URL
- [ ] Add analytics if needed
- [ ] Set up error tracking

## Common Issues & Solutions

### Tailwind styles not applying
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

### Images not loading
- Check image paths are relative to `public/` folder
- Verify image URLs are correct
- Use Next.js `Image` component

### Animations stuttering
- Check `viewport={{ once: true }}` is set
- Reduce number of simultaneous animations
- Profile with Chrome DevTools

### TypeScript errors
- Run `npx tsc --noEmit` to see all errors
- Check prop types match component interfaces
- Update types in component definitions

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Contributing

When modifying the project:
1. Create descriptive component names
2. Use TypeScript interfaces for all props
3. Add comments for complex logic
4. Keep components under 300 lines
5. Follow the existing code style
6. Test changes before committing

## Future Improvements

- [ ] Add blog section with CMS integration
- [ ] Implement quote system with backend
- [ ] Add dark/light theme toggle
- [ ] Multi-language support
- [ ] Advanced portfolio filtering
- [ ] Client testimonials
- [ ] Team member profiles page
- [ ] Email notifications for quote requests
- [ ] Analytics dashboard
- [ ] Performance metrics tracking
