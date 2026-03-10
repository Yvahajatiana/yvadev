import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostMetadata } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.filter((name) => name.endsWith('.mdx')).map((name) => name.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const { text: readingTimeText } = readingTime(content);

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      date: data.date || '',
      updatedAt: data.updatedAt,
      author: data.author || 'Yva Hajatiana',
      tags: data.tags || [],
      coverImage: data.coverImage || '/images/default-cover.jpg',
      coverImageAlt: data.coverImageAlt || data.title || '',
      featured: data.featured || false,
      content,
      readingTime: readingTimeText,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): PostMetadata[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;

      const { content, ...metadata } = post;
      return metadata;
    })
    .filter((post): post is PostMetadata => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(count: number = 3): PostMetadata[] {
  return getAllPosts().filter((post) => post.featured).slice(0, count);
}

export function getLatestPosts(count: number = 6): PostMetadata[] {
  return getAllPosts().slice(0, count);
}

export function getPostsByTag(tag: string): PostMetadata[] {
  return getAllPosts().filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()));
}

export function getRelatedPosts(currentPost: PostMetadata, count: number = 3): PostMetadata[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentPost.slug);
  const relatedPosts = allPosts.filter((post) => post.tags.some((tag) => currentPost.tags.includes(tag)));

  if (relatedPosts.length >= count) {
    return relatedPosts.slice(0, count);
  }

  const remainingPosts = allPosts.filter((post) => !relatedPosts.find((related) => related.slug === post.slug));
  return [...relatedPosts, ...remainingPosts].slice(0, count);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.keys()).sort();
}

export function searchPosts(query: string): PostMetadata[] {
  const allPosts = getAllPosts();
  const searchQuery = query.toLowerCase();

  return allPosts.filter((post) => {
    const searchableText = [post.title, post.excerpt, post.tags.join(' '), post.author].join(' ').toLowerCase();
    return searchableText.includes(searchQuery);
  });
}
