import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'YvaDev - AI, .NET, Cloud & Platform Engineering',
  shortName: 'YvaDev',
  description: 'YvaDev partage des retours d experience et des pratiques de software engineering sur le .NET, l architecture logicielle, le cloud et l AI engineering.',
  tagline: 'Software engineering, .NET, cloud and AI engineering',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yvadev.fr',
  ogImage: '/images/og-image.png',
  author: {
    name: 'Yva Hajatiana',
    email: 'contact@yvadev.fr',
    bio: 'Software engineer focused on .NET architecture, cloud systems, DevOps engineering and applied AI integration.',
  },
  social: {
    github: 'https://github.com/Yvahajatiana/yvadev',
  },
  keywords: [
    'YvaDev',
    'software engineering',
    '.NET architecture',
    'C# engineering',
    'cloud engineering',
    'DevOps engineering',
    'AI engineering',
    'distributed systems',
    'software architecture',
    'production systems',
    'engineering blog',
  ],
  categories: [
    'Software Engineering',
    '.NET',
    'Architecture',
    'Cloud',
    'DevOps',
    'AI Engineering',
  ],
};

export const POSTS_PER_PAGE = 12;
export const FEATURED_POSTS_COUNT = 3;
export const LATEST_POSTS_COUNT = 6;
export const RELATED_POSTS_COUNT = 3;
