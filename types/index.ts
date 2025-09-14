export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
  featured: boolean;
  content: string;
  readingTime: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
  featured: boolean;
  readingTime: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: {
    name: string;
    email: string;
  };
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}