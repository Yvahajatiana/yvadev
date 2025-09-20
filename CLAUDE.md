# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI4Dev Blog is a modern technical blog built with Next.js 14+ (App Router) and TypeScript. The project is designed to be deployed on Netlify at ai4dev.blog and focuses on AI integration tutorials for developers.

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Lint code
npm run lint

# Type check
npm run type-check

# Playwright tests (for site visualization)
npx playwright test
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14+ with App Router (NOT Pages Router)
- **Language**: TypeScript in strict mode
- **Styling**: Tailwind CSS 3.4+ with Typography plugin
- **Content**: MDX files in `content/posts/` parsed with next-mdx-remote
- **Deployment**: Netlify with netlify.toml configuration
- **Package Manager**: npm only

### Core Structure
```
app/                    # Next.js App Router pages
├── layout.tsx         # Root layout with metadata
├── page.tsx           # Homepage
├── blog/              # Blog section
│   ├── page.tsx       # Blog listing
│   └── [slug]/        # Individual posts
├── about/             # About page
├── api/               # API routes (search, newsletter)
└── sitemap.ts         # SEO sitemap

components/
├── layout/            # Header, Footer
├── blog/              # PostCard, PostList, TableOfContents
├── mdx/               # CodeBlock, Callout, Image
└── ui/                # Reusable UI components

content/posts/         # MDX blog articles
lib/                   # Business logic (mdx, posts, utils)
types/                 # TypeScript definitions
```

### Content System
- Articles are MDX files in `content/posts/` with frontmatter
- Required frontmatter fields: title, excerpt, date, author, tags, coverImage, coverImageAlt, featured
- Posts are statically generated with automatic table of contents
- Uses gray-matter for frontmatter parsing and reading-time for reading time calculation

### Component Guidelines
- Server Components by default (avoid 'use client' unless necessary)
- Atomic, reusable components in `/components/ui/`
- MDX components in `/components/mdx/` for enhanced content
- All components must be TypeScript with proper typing

### Styling System
- Tailwind CSS with custom color scheme:
  - Primary: Blue electric #2563eb
  - Secondary: Slate gray #64748b  
  - Accent: Purple #8b5cf6
- Typography: Inter (main), JetBrains Mono (code)
- Mobile-first responsive design
- Maximum content width: 720px for optimal reading

### SEO & Performance
- Next.js metadata API for SEO optimization
- Static generation for all blog posts
- Image optimization with WebP/AVIF formats
- Performance targets: Lighthouse score > 95, LCP < 2.5s
- Schema.org structured data for articles

### Key Dependencies
- next-mdx-remote: MDX content parsing
- gray-matter: Frontmatter extraction
- rehype-highlight: Code syntax highlighting
- rehype-slug, rehype-autolink-headings: Heading anchors
- remark-gfm: GitHub Flavored Markdown
- date-fns: Date formatting
- lucide-react: Icons
- clsx: Conditional classes

## Important Development Notes

- Always use Server Components unless client interactivity is required
- Follow the existing color scheme and typography system
- All code comments should be in English
- Use Playwright for browser testing and visualization
- Always stop background servers to avoid port conflicts
- Check for and remove unnecessary directories/files
- Use Context7 for up-to-date library documentation
- No co-authored commits with Claude
- Windows environment: use PowerShell/CMD commands

## Custom Agents

### Port Manager Agent
- **Purpose**: Specialized agent for managing and freeing ports occupied by Next.js and development servers
- **Usage**: Call proactively when ports 3000-3010 are occupied or before starting npm run dev
- **Tools**: PowerShell script (Windows) and bash script (Unix) in `/scripts/`
- **Features**:
  - Automatic detection of development processes
  - Safe termination of Next.js/Vite/Webpack servers
  - Multi-platform support (Windows/Unix)
  - Security checks to avoid killing system processes

## Content Creation

### Article Structure
Articles must include complete frontmatter and use available MDX components:
- Headings (H2/H3) auto-generate table of contents
- Code blocks with syntax highlighting
- Callout components (info, warning, tip, danger)
- Optimized images with lazy loading
- GitHub Flavored Markdown support

### SEO Requirements
- Unique meta descriptions (150-160 chars)
- Descriptive URLs without dates
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- Internal linking between related articles

## Deployment

The project uses Netlify with:
- Build command: `npm run build`
- Publish directory: `.next`
- Headers for security and caching
- Redirects configuration
- Environment variables for site URL and analytics