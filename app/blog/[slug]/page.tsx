import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Twitter, Linkedin } from 'lucide-react';

import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/posts';
import { generateTableOfContents, mdxOptions } from '@/lib/mdx';
import { formatDateLong } from '@/lib/utils';
import { siteConfig } from '@/lib/constants';
import { getTopicsForPost } from '@/lib/topics';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { PostCard } from '@/components/blog/PostCard';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { Callout } from '@/components/mdx/Callout';
import { Image as CustomImage } from '@/components/mdx/Image';
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData';

const mdxComponents = {
  pre: ({ children }: any) => {
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
      title: 'Article introuvable',
    };
  }

  const ogImage = post.coverImage.startsWith('http') ? post.coverImage : `${siteConfig.url}${post.coverImage}`;
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      url: postUrl,
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
  const relatedTopics = getTopicsForPost(post.tags);
  const tableOfContents = generateTableOfContents(post.content);
  const postUrl = `${siteConfig.url}/blog/${post.slug}`;

  const breadcrumbItems = [
    { name: 'Accueil', url: siteConfig.url },
    { name: 'Articles', url: `${siteConfig.url}/blog` },
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
        <div className="border-b border-border bg-muted/50">
          <div className="container py-4">
            <Link href="/blog" className="inline-flex items-center text-sm text-secondary transition-colors hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux articles
            </Link>
          </div>
        </div>

        <article className="container py-8 lg:py-12">
          <div className="mx-auto max-w-5xl">
            <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
              <div className="lg:min-w-0">
                <header className="mb-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{post.title}</h1>

                  <p className="mb-6 text-lg text-secondary">{post.excerpt}</p>

                  <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-secondary">
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

                  <div className="mb-8 flex items-center gap-2">
                    <span className="mr-2 text-sm text-secondary">Partager :</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="mr-2 h-4 w-4" />
                        X / Twitter
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <CopyButton text={postUrl} />
                  </div>

                  <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl border border-border">
                    <Image src={post.coverImage} alt={post.coverImageAlt} fill className="object-cover" priority />
                  </div>
                </header>

                <div className="prose prose-lg max-w-none">
                  <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
                </div>

                {relatedTopics.length > 0 && (
                  <aside className="mt-12 rounded-[1.5rem] border border-primary/20 bg-primary/5 p-6" aria-labelledby="related-topics-title">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Continuer à apprendre</p>
                    <h2 id="related-topics-title" className="mt-2 text-2xl font-bold text-foreground">
                      Parcours associés à cet article
                    </h2>
                    <p className="mt-2 text-secondary">
                      Retrouvez les concepts, guides et décisions d’architecture liés dans une sélection structurée.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {relatedTopics.map((topic) => (
                        <Link
                          key={topic.slug}
                          href={`/topics/${topic.slug}`}
                          className="focus-ring rounded-full border border-primary/25 bg-background px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary"
                        >
                          {topic.shortTitle}
                        </Link>
                      ))}
                    </div>
                  </aside>
                )}

                <footer className="mt-12 border-t border-border pt-8">
                  <div className="mb-6 flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-foreground">Mots-clés :</span>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-8 rounded-[1.5rem] bg-muted/50 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-foreground">{post.author}</h4>
                        <p className="text-sm text-secondary">
                          Articles techniques sur l'ingénierie logicielle, .NET, le cloud et l'intelligence artificielle appliquée aux applications.
                        </p>
                      </div>
                    </div>
                  </div>

                </footer>
              </div>

              <aside className="lg:sticky lg:top-8 lg:self-start">
                <div className="space-y-6">
                  {tableOfContents.length > 0 && (
                    <div className="rounded-lg bg-muted/50 p-4">
                      <TableOfContents items={tableOfContents} />
                    </div>
                  )}

                  <div className="hidden lg:block">
                    <h4 className="mb-3 font-semibold text-foreground">Partager cet article</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="mr-2 h-4 w-4" />
                          X / Twitter
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="mr-2 h-4 w-4" />
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

        {relatedPosts.length > 0 && (
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-8 text-2xl font-bold text-foreground">Articles liés</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
