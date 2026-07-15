import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/constants';
import { postMatchesTopic, topics } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Parcours techniques',
  description: 'Explorez les parcours YvaDev sur l’architecture .NET, C# et ASP.NET Core, le cloud, les systèmes distribués et l’IA appliquée.',
  alternates: {
    canonical: `${siteConfig.url}/topics`,
  },
};

export default function TopicsPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Parcours techniques</p>
          <h1 className="mt-4 text-4xl font-bold text-foreground md:text-6xl">Approfondir un domaine, article après article</h1>
          <p className="mt-5 text-lg text-secondary">
            Quatre parcours organisent les publications autour de problèmes d’ingénierie cohérents, des fondamentaux jusqu’aux contraintes de production.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {topics.map((topic, index) => {
            const articleCount = posts.filter((post) => postMatchesTopic(post.tags, topic)).length;

            return (
              <article key={topic.slug} className="flex flex-col rounded-[1.75rem] border border-border bg-background/95 p-7">
                <div className="text-sm font-semibold text-primary">0{index + 1}</div>
                <h2 className="mt-4 text-2xl font-bold text-foreground">{topic.shortTitle}</h2>
                <p className="mt-3 flex-1 text-secondary">{topic.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                  <span className="text-sm text-secondary">{articleCount} article{articleCount > 1 ? 's' : ''}</span>
                  <Link href={`/topics/${topic.slug}`} className="focus-ring inline-flex items-center rounded-lg font-medium text-primary hover:underline">
                    Explorer <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
