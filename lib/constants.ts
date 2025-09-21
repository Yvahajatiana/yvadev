import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'AI4Dev - AI Integration Tutorials for Developers',
  shortName: 'AI4Dev',
  description: 'Master AI integration with practical tutorials, code examples, and expert insights. Learn machine learning APIs, LLM integration, computer vision, and modern AI development patterns.',
  tagline: 'Transform your applications with AI',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ai4dev.blog',
  ogImage: '/images/og-image.png',
  author: {
    name: 'AI4Dev Team',
    email: 'contact@ai4dev.blog',
    bio: 'Expert AI developers sharing practical tutorials and insights for integrating artificial intelligence into modern applications.',
  },
  social: {
    twitter: 'https://twitter.com/ai4dev',
    linkedin: 'https://linkedin.com/company/ai4dev',
    github: 'https://github.com/ai4dev',
  },
  keywords: [
    'AI development',
    'machine learning tutorials',
    'API integration',
    'artificial intelligence',
    'developer tools',
    'programming guides',
    'tech tutorials',
    'software development',
    'AI APIs',
    'deep learning',
    'computer vision',
    'natural language processing',
    'LLM integration',
    'OpenAI API',
    'TensorFlow',
    'PyTorch'
  ],
  categories: [
    'AI Tutorials',
    'Machine Learning',
    'API Integration',
    'Development Tools',
    'Programming Guides',
    'Tech Reviews'
  ],
};

export const POSTS_PER_PAGE = 12;
export const FEATURED_POSTS_COUNT = 3;
export const LATEST_POSTS_COUNT = 6;
export const RELATED_POSTS_COUNT = 3;