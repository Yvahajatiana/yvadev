import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Share2, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/posts';
import { generateTableOfContents, mdxOptions } from '@/lib/mdx';
import { formatDateLong } from '@/lib/utils';
import { siteConfig } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { PostCard } from '@/components/blog/PostCard';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { Callout } from '@/components/mdx/Callout';
import { Image as CustomImage } from '@/components/mdx/Image';
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData';

const mdxComponents = {
  pre: ({ children, ...props }: any) => {
    const code = children.props.children;
    const language = children.props.className?.replace('language-', '');
    return <CodeBlock language={language}>{code}</CodeBlock>;
  },
  Callout,
  Image: CustomImage,
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const ogImage = post.coverImage.startsWith('http') 
    ? post.coverImage 
    : `${siteConfig.url}${post.coverImage}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const tableOfContents = generateTableOfContents(post.content);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Blog', url: `${siteConfig.url}/blog` },
    { name: post.title, url: postUrl },
  ];

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
  };

  return (
    <>
      <ArticleStructuredData post={post} url={postUrl} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/50">
        <div className="container py-4">
          <Link href="/blog" className="inline-flex items-center text-secondary hover:text-foreground text-sm transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </div>
      </div>

      <article className="container py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <div className="lg:min-w-0">
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                  {post.title}
                </h1>

                <p className="text-lg text-secondary mb-6 text-balance">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-secondary mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateLong(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-sm text-secondary mr-2">Share:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <CopyButton text={postUrl} />
                </div>

                {/* Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border mb-8">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <MDXRemote 
                  source={post.content} 
                  components={mdxComponents} 
                  options={mdxOptions}
                />
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-sm font-medium text-foreground">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className="text-sm text-primary hover:underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                {/* Author Bio */}
                <div className="bg-muted/50 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {post.author}
                      </h4>
                      <p className="text-sm text-secondary">
                        Expert in AI development and integration. Passionate about making AI accessible to all developers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-primary/5 rounded-lg p-6 mb-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Stay Updated with AI4Dev
                    </h3>
                    <p className="text-secondary mb-4">
                      Get the latest AI development tutorials delivered to your inbox.
                    </p>
                    <div className="flex justify-center">
                      <NewsletterForm />
                    </div>
                  </div>
                </div>
              </footer>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="space-y-6">
                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <TableOfContents items={tableOfContents} />
                  </div>
                )}

                {/* Share Buttons (Sidebar) */}
                <div className="hidden lg:block">
                  <h4 className="font-semibold text-foreground mb-3">Share this article</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/50 py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.slug} className="h-full">
                    <PostCard post={relatedPost} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  );
}