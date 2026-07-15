import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: "YvaDev - Ingénierie logicielle, .NET, cloud et IA",
  shortName: 'YvaDev',
  description: "YvaDev partage des retours d'expérience et des pratiques d'ingénierie sur .NET, l'architecture logicielle, le cloud et l'intelligence artificielle.",
  tagline: "Ingénierie logicielle, .NET, cloud et IA",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yvadev.com',
  ogImage: '/images/og-image.png',
  author: {
    name: 'Yva Hajatiana',
    email: 'contact@yvadev.fr',
    bio: "Ingénieur logiciel spécialisé en architecture .NET, systèmes cloud, DevOps et intégration de l'intelligence artificielle.",
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
