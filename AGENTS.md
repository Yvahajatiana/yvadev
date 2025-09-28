# Agent Guidelines for AI4Dev Blog

## Build/Lint/Test Commands
- **Install**: `npm install`
- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`
- **Type check**: `npm run type-check`
- **Tests**: `npx playwright test` (single: `npx playwright test --grep "test name"`)

## Tech Stack & Architecture
- **Framework**: Next.js 14+ App Router (NOT Pages Router)
- **Language**: TypeScript strict mode
- **Styling**: Tailwind CSS 3.4+ with Typography plugin
- **Content**: MDX with next-mdx-remote, gray-matter, reading-time
- **Deployment**: Netlify with netlify.toml

## Code Style Guidelines

### Components & Types
- Server Components by default, 'use client' only when necessary
- All components must be TypeScript with proper typing
- Path aliases: `@/` for root, `@/components/*`, `@/lib/*`, `@/types/*`, `@/app/*`
- Import order: React → third-party → local imports

### Naming & Structure
- **Components**: PascalCase (e.g., `Button`, `PostCard`)
- **Functions/Variables**: camelCase (e.g., `getPosts`, `isLoading`)
- **Files**: PascalCase for components, camelCase for utilities
- **Directories**: lowercase with hyphens

### Styling System
- **Colors**: primary (#2563eb), secondary (#64748b), accent (#8b5cf6)
- **Typography**: Inter (main), JetBrains Mono (code)
- **Responsive**: Mobile-first, max content width 720px
- **Performance**: Lighthouse >95, LCP <2.5s, FCP <1.5s, CLS <0.1

### Content System
- MDX files in `content/posts/` with required frontmatter: title, excerpt, date, author, tags, coverImage, coverImageAlt, featured
- Use MDX components: CodeBlock, Callout, Image
- Auto-generated table of contents from H2/H3 headings
- Schema.org structured data for articles

### SEO Requirements
- **Meta descriptions**: 150-160 characters, unique per page
- **Titles**: 50-60 characters, H1 unique per page
- **URLs**: /blog/[descriptive-slug-with-keywords] (no dates)
- **Sitemap**: Dynamic XML generation
- **Robots.txt**: Properly configured
- **Verification**: Google & Bing verification codes in environment variables
- **OG Images**: 1200x630px for social sharing

### Environment Variables
- `NEXT_PUBLIC_SITE_URL=https://ai4dev.blog`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=[code]`
- `NEXT_PUBLIC_BING_VERIFICATION=[code]`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=[GA_ID]`

### ESLint & Best Practices
- Extends `next/core-web-vitals`
- `prefer-const`: error, `no-var`: error, `no-console`: warn
- No comments unless necessary, all in English
- Run `npm run lint` and `npm run type-check` after changes
- Use Playwright for browser testing, stop background servers
- Windows environment: use PowerShell/CMD commands

## Project Backlogs (from specification.md)

### Required File Structure
```
app/
├── layout.tsx (root layout with metadata)
├── page.tsx (homepage)
├── globals.css (Tailwind styles)
├── about/page.tsx
├── blog/page.tsx (article list)
├── blog/[slug]/page.tsx (individual articles)
├── api/search/route.ts
├── api/newsletter/route.ts
├── robots.txt
└── sitemap.ts

components/
├── layout/Header.tsx, Footer.tsx
├── blog/PostCard.tsx, PostList.tsx, TableOfContents.tsx
├── mdx/CodeBlock.tsx, Callout.tsx, Image.tsx
└── ui/Button.tsx, Input.tsx, Badge.tsx, NewsletterForm.tsx

content/posts/ (MDX articles)
lib/ (mdx.ts, posts.ts, utils.ts, constants.ts)
types/index.ts
public/images/ (optimized images)
```

### Content Requirements
- Create 3 initial MDX articles with complete frontmatter
- Implement search and newsletter API routes
- Add pagination, tags filtering, and social sharing
- Ensure WCAG 2.1 AA accessibility compliance

### Performance Targets
- Lighthouse Score > 95 (all metrics)
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3s