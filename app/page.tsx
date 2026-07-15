import { Metadata } from 'next';
import { ArrowRight, Cloud, Cpu, GitBranch, Server, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PostCard } from '@/components/blog/PostCard';
import { getFeaturedPosts, getLatestPosts } from '@/lib/posts';
import { FEATURED_POSTS_COUNT, LATEST_POSTS_COUNT, siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Architecture .NET, Cloud et IA en production',
  alternates: {
    canonical: siteConfig.url,
  },
};

const focusAreas = [
  {
    title: 'Software Engineering',
    description: 'Architecture de services robustes, maintenabilité, qualité logicielle, performance et pratiques de production.',
    icon: Sparkles,
  },
  {
    title: '.NET Engineering',
    description: "Conception d'applications avec C#, ASP.NET Core, messagerie, patterns d'architecture et code évolutif.",
    icon: Cpu,
  },
  {
    title: 'Cloud & DevOps',
    description: 'Infrastructure cloud, automatisation, observabilité, chaînes de livraison et systèmes distribués.',
    icon: Cloud,
  },
];

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(FEATURED_POSTS_COUNT);
  const latestPosts = getLatestPosts(LATEST_POSTS_COUNT);

  return (
    <div className="space-y-16 pb-16">
      <section className="container py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              <GitBranch className="mr-2 h-4 w-4" />
              Ingénierie logicielle · .NET · Cloud · IA
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-5xl font-extrabold text-foreground md:text-7xl">
                Des choix d'architecture .NET expliqués pour la production
              </h1>
              <p className="max-w-2xl text-lg text-secondary md:text-xl">
                YvaDev documente des décisions techniques concrètes : structuration d'applications C#, systèmes distribués,
                observabilité, cloud et intégration fiable de l'intelligence artificielle.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/blog">
                  Explorer les guides techniques
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Découvrir la ligne éditoriale</Link>
              </Button>
            </div>

            <div className="grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
              <div>
                <div className="text-3xl font-bold text-primary">4</div>
                <p className="text-sm text-secondary">Domaines couverts par le blog</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">.NET</div>
                <p className="text-sm text-secondary">Applications, patterns et architecture</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">Prod</div>
                <p className="text-sm text-secondary">Systèmes fiables, observables et capables de monter en charge</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-foreground px-6 py-8 text-white shadow-2xl shadow-primary/10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
                Priorités d'ingénierie
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">De la décision technique à la production</h2>
                <p className="text-sm text-white/70">
                  Chaque guide relie une pratique d'ingénierie à ses compromis : maintenabilité, fiabilité,
                  performance, coût opérationnel et évolution du système.
                </p>
              </div>
              <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">logiciel</span>
                  <span>Architecture et qualité</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">.net</span>
                  <span>C# et ASP.NET Core</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">cloud</span>
                  <span>Systèmes distribués</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">IA</span>
                  <span>IA appliquée aux produits</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                <Server className="h-4 w-4 text-primary" />
                Pour les développeurs qui veulent comprendre pourquoi une solution tient — ou échoue — en production.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container grid gap-6 md:grid-cols-3">
        {focusAreas.map(({ title, description, icon: Icon }) => (
          <article key={title} className="rounded-[1.75rem] border border-border bg-background/90 p-6 shadow-sm shadow-primary/5">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">{title}</h2>
            <p className="text-secondary">{description}</p>
          </article>
        ))}
      </section>

      <section className="container py-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Ce que tu trouveras sur YvaDev</h2>
          <p className="mx-auto max-w-2xl text-secondary">
            Des articles techniques sur la conception logicielle, les architectures distribuées, le cloud,
            l'automatisation et l'intégration de l'IA dans des applications réelles.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <CodeBlock
            language="csharp"
            title="Production-oriented .NET"
            code={`public sealed class OrderProjectionWorker : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var message in _stream.ReadAllAsync(stoppingToken))
        {
            using var activity = _activitySource.StartActivity("project-order");
            await _projection.ApplyAsync(message, stoppingToken);
        }
    }
}`}
          />
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Articles à la une</h2>
              <p className="text-secondary">Guides approfondis sur l'ingénierie logicielle, le cloud et les systèmes applicatifs.</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">
                Tout parcourir
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section className="container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Dernières publications</h2>
              <p className="text-secondary">Nouveaux articles sur .NET, l'architecture, le cloud et l'ingénierie de l'IA.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.slice(0, 6).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="container py-16">
        <div className="grid gap-6 rounded-[2rem] border border-border bg-muted/60 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-foreground">Un contenu orienté vers la pratique</h2>
            <p className="text-secondary">
              Le fil conducteur du blog reste le même : expliquer des choix techniques concrets,
              montrer des implémentations applicables et relier chaque concept aux contraintes de production.
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
