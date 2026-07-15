import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/constants';
import { topics } from '@/lib/topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const latestPostDate = posts.length > 0
    ? new Date(Math.max(...posts.map(post => new Date(post.date).getTime())))
    : new Date();

  // High-priority blog posts (featured or recent)
  const featuredPosts = posts
    .filter(post => post.featured || new Date(post.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.date).toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // Regular blog posts
  const regularPosts = posts
    .filter(post => !post.featured && new Date(post.date) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.date).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // Tag pages - commented out until routes are implemented
  // const allTags = posts.flatMap(post => post.tags || []);
  // const uniqueTags = Array.from(new Set(allTags));
  // const tagUrls = uniqueTags.map(tag => ({
  //   url: `${siteConfig.url}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
  //   lastModified: currentDate,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  const staticUrls = [
    {
      url: siteConfig.url,
      lastModified: latestPostDate.toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: latestPostDate.toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/topics`,
      lastModified: latestPostDate.toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Category pages - commented out until routes are implemented
    // {
    //   url: `${siteConfig.url}/blog/category/tutorials`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${siteConfig.url}/blog/category/ai-integration`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${siteConfig.url}/blog/category/machine-learning`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
  ];

  const topicUrls = topics.map((topic) => ({
    url: `${siteConfig.url}/topics/${topic.slug}`,
    lastModified: latestPostDate.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...topicUrls, ...featuredPosts, ...regularPosts];
}
