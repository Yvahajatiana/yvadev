import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import { PostList } from '@/components/blog/PostList';
import { BreadcrumbStructuredData } from '@/components/seo/StructuredData';
import { siteConfig } from '@/lib/constants';
import { getAllPosts } from '@/lib/posts';
import { getTopicBySlug, postMatchesTopic, topics } from '@/lib/topics';

interface TopicPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export function generateMetadata({ params }: TopicPageProps): Metadata {
  const topic = getTopicBySlug(params.slug);

  if (!topic) {
    return { title: 'Parcours introuvable' };
  }

  const url = `${siteConfig.url}/topics/${topic.slug}`;

  return {
    title: topic.shortTitle,
    description: topic.description,
    alternates: { canonical: url },
    openGraph: {
      title: topic.title,
      description: topic.description,
      url,
      type: 'website',
    },
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const topic = getTopicBySlug(params.slug);

  if (!topic) {
    notFound();
  }

  const posts = getAllPosts().filter((post) => postMatchesTopic(post.tags, topic));

  return (
    <div className="container py-12 md:py-16">
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', url: siteConfig.url },
          { name: 'Parcours', url: `${siteConfig.url}/topics` },
          { name: topic.shortTitle, url: `${siteConfig.url}/topics/${topic.slug}` },
        ]}
      />
      <div className="mx-auto max-w-5xl">
        <Link href="/topics" className="focus-ring inline-flex items-center rounded-lg text-sm text-secondary hover:text-foreground">
          <ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4" />
          Tous les parcours
        </Link>

        <header className="mt-8 grid gap-8 rounded-[2rem] border border-border bg-background/95 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Parcours YvaDev</p>
            <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">{topic.title}</h1>
            <p className="mt-5 text-lg text-secondary">{topic.introduction}</p>
          </div>
          <div className="rounded-[1.5rem] bg-muted/60 p-6">
            <h2 className="text-lg font-semibold text-foreground">Principes directeurs</h2>
            <ul className="mt-5 space-y-4 text-sm text-secondary">
              {topic.principles.map((principle) => (
                <li key={principle} className="flex items-start gap-3">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section className="mt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Articles du parcours</h2>
              <p className="mt-2 text-secondary">{posts.length} publication{posts.length > 1 ? 's' : ''} pour approfondir ce domaine.</p>
            </div>
            <Link href="/blog" className="focus-ring rounded-lg text-sm font-medium text-primary hover:underline">Voir tous les articles</Link>
          </div>
          <PostList posts={posts} />
        </section>
      </div>
    </div>
  );
}
