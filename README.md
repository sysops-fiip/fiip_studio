# Fix It In Post Studios - Website

A responsive, cinematic website for **Fix It In Post Studios**, an AI-assisted and AI-generative VFX + video production company based in India.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Icons**: Lucide React
- **Fonts**: Poppins & Inter
- **Language**: TypeScript

## Features

### Pages
- **Home (`/`)** - Hero section, services overview, before/after slider, statistics
- **Services (`/services`)** - Detailed service tiers with pricing and features
- **Portfolio (`/portfolio`)** - Filterable project showcase with categories
- **Pricing (`/pricing`)** - Transparent pricing with calculator and comparison table
- **About (`/about`)** - Company story, team, mission, values, and tech stack
- **Contact (`/contact`)** - Contact form, maps, location, and FAQ

### Components
- **Navbar** - Sticky navigation with mobile menu
- **Footer** - Comprehensive footer with links and contact info
- **ServiceCard** - Reusable card component for services
- **PortfolioCard** - Project showcase with hover effects
- **TeamCard** - Team member cards
- **BeforeAfterSlider** - Interactive before/after comparison
- **PricingCalculator** - Dynamic pricing based on video length

### Design Features
- Dark theme by default (black background, white text)
- Accent colors: Electric blue (#3B82F6) and neon orange (#F97316)
- Smooth Framer Motion animations
- Responsive design (mobile-first)
- Glass-effect UI elements
- Glow effects on buttons and interactive elements
- Lazy-loaded images and videos

## Project Structure

```
fiip-studio/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── services/
│   │   └── page.tsx          # Services page
│   ├── portfolio/
│   │   └── page.tsx          # Portfolio page
│   ├── pricing/
│   │   └── page.tsx          # Pricing page
│   ├── about/
│   │   └── page.tsx          # About page
│   └── contact/
│       └── page.tsx          # Contact page
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── Footer.tsx            # Footer component
│   ├── ServiceCard.tsx       # Service card component
│   ├── PortfolioCard.tsx     # Portfolio card
│   ├── TeamCard.tsx          # Team member card
│   ├── BeforeAfterSlider.tsx # Interactive slider
│   └── PricingCalculator.tsx # Dynamic pricing tool
├── data/
│   ├── projects.json         # Portfolio projects data
│   ├── pricing.json          # Pricing tiers and FAQ
│   └── team.json             # Team members data
├── public/                   # Static assets
├── styles/                   # Additional styles (if needed)
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd fiip-studio
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Customization

### Brand Colors
Edit `tailwind.config.ts` and `app/globals.css` to customize colors:
- Primary Blue: `#3B82F6`
- Accent Orange: `#F97316`
- Dark Background: `#111827`

### Fonts
Fonts are loaded from Google Fonts in `app/globals.css`:
- Poppins (primary font)
- Inter (alternative font)

Update the font URL or specify different fonts as needed.

### Content
All dynamic content is stored in JSON files in the `data/` folder:
- `projects.json` - Portfolio projects
- `pricing.json` - Pricing tiers and FAQ
- `team.json` - Team members

Update these files to modify content without touching component code.

### Images & Videos
Place images and videos in the `public/` directory and reference them in your components.

## SEO

The website includes:
- Meta tags for Open Graph (social media previews)
- Twitter Card meta tags
- Structured data ready for Google Search
- Custom title and description tags

Update metadata in `app/layout.tsx` for your specific needs.

## Performance

- Server-side rendering for better SEO
- Image optimization with next/image
- Lazy-loaded animations
- CSS and JavaScript code splitting
- Efficient component structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will auto-deploy on every push

### Other Platforms
The build output can be deployed to any Node.js-compatible hosting:
```bash
npm run build
npm start
```

## Future Enhancements

- [ ] Backend integration for quote requests
- [ ] CMS integration for dynamic content
- [ ] Client testimonials carousel
- [ ] Blog section
- [ ] Advanced filtering for portfolio
- [ ] Video embed optimization
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## License

MIT License - Feel free to use this template for your own projects.

## Support

For questions or issues, contact: hello@fixitinpost.studio

---

Built with ❤️ by Fix It In Post Studios
