import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'AI4Dev',
  description: 'Learn to integrate AI into your applications with practical tutorials, code examples, and the latest AI development news',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ai4dev.blog',
  ogImage: '/images/og-image.png',
  author: {
    name: 'AI4Dev Team',
    email: 'contact@ai4dev.blog',
  },
  social: {
    twitter: 'https://twitter.com/ai4dev',
    linkedin: 'https://linkedin.com/company/ai4dev',
    github: 'https://github.com/ai4dev',
  },
};

export const POSTS_PER_PAGE = 12;
export const FEATURED_POSTS_COUNT = 3;
export const LATEST_POSTS_COUNT = 6;
export const RELATED_POSTS_COUNT = 3;