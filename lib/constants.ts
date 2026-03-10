import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'YvaDev - AI, .NET, Cloud & Platform Engineering',
  shortName: 'YvaDev',
  description: 'YvaDev shares practical engineering notes on AI products, modern .NET, cloud infrastructure, and platform delivery from real-world projects.',
  tagline: 'Engineering notes from code to cloud',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yvadev.fr',
  ogImage: '/images/og-image.png',
  author: {
    name: 'Yva Hajatiana',
    email: 'contact@yvadev.fr',
    bio: 'Software engineer focused on AI product delivery, .NET architecture, DevOps workflows, and pragmatic cloud systems.',
  },
  social: {
    github: 'https://github.com/Yvahajatiana/yvadev',
  },
  keywords: [
    'YvaDev',
    'engineering blog',
    'AI engineering',
    '.NET tutorials',
    'cloud architecture',
    'DevOps automation',
    'platform engineering',
    'Hetzner cloud',
    'Terraform',
    'Ansible',
    'Next.js blog',
    'software architecture',
  ],
  categories: [
    'AI',
    '.NET',
    'Cloud',
    'DevOps',
    'Architecture',
    'Engineering Journal',
  ],
};

export const POSTS_PER_PAGE = 12;
export const FEATURED_POSTS_COUNT = 3;
export const LATEST_POSTS_COUNT = 6;
export const RELATED_POSTS_COUNT = 3;
