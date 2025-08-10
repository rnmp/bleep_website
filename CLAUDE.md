# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bleep Website - Marketing site for Bleep, a visual organizer app for creative minds. Built with Astro 5.3.0 as a static site targeting bleep.is domain.

## Development Commands

```bash
# Install dependencies (use Yarn)
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Architecture

### Tech Stack
- **Astro 5.3.0** - Static site generator
- **MDX** - For support documentation
- **TypeScript** - Type definitions
- **CSS Custom Properties** - Theming system
- **Node v20.11.1** - Check `.nvmrc`

### Project Structure
- `src/pages/` - Routes (index, privacy, terms, support)
- `src/pages/support/` - MDX support articles
- `src/components/` - Reusable Astro components
- `src/layouts/` - Page layouts (Layout.astro, SupportArticleLayout.astro)
- `public/` - Static assets organized by type

### Key Components
- **SiteHeader/SiteFooter** - Global navigation and branding
- **ContactForm** - Support contact functionality
- **Video** - Interactive demo components
- **Button** - Consistent CTA styling

## Content Management

### Support Articles (MDX)
Support articles in `src/pages/support/*.mdx` require frontmatter:
```yaml
---
icon: "📱"  # Emoji for article
title: "Article Title"
subtitle: "Brief description"
layout: "@/layouts/SupportArticleLayout.astro"
---
```

### Media Assets
- Support videos: `public/support/*.mp4`
- Support images: `public/support/*.png`
- App assets: `public/assets/`

## Styling System

### CSS Variables
Key custom properties in `src/style.css`:
- `--accent: #ff5252` - Brand color
- `--font-serif: "Jugendreisen"` - Headings
- `--font-sans: "Inter"` - Body text
- Dark/light mode via `prefers-color-scheme`

### Animation
- Session-based animations (check sessionStorage)
- Fade-in and scale effects on first visit only

## Deployment

### GitHub Pages Configuration
- `CNAME` file contains: `bleep.is`
- Static output mode in `astro.config.mjs`
- Redirects configured for:
  - `/support/contact` → `/support#contact`
  - `/chrome` → Chrome Web Store

## Important Patterns

### Astro Components
- Use `.astro` files for static components
- Scoped styles within `<style>` tags
- Props destructuring in frontmatter

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly tap targets (min 44px)

### Performance
- Preload custom fonts
- Optimize images with responsive variants
- Minimize JavaScript usage

## Testing Considerations

No formal test suite exists. When making changes:
1. Test all breakpoints (mobile, tablet, desktop)
2. Verify dark/light mode appearance
3. Check support article rendering
4. Validate external links and redirects
5. Test contact form functionality