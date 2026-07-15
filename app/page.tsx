import { Metadata } from 'next';
import { ArrowRight, BrainCircuit, CheckCircle2, Cloud, Cpu, GitBranch, Server, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
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
    title: 'Architecture .NET',
    description: 'Architecture de services robustes, maintenabilité, qualité logicielle, performance et pratiques de production.',
    icon: Sparkles,
    href: '/topics/architecture-dotnet',
  },
  {
    title: 'C# et ASP.NET Core',
    description: "Conception d'applications avec C#, ASP.NET Core, messagerie, patterns d'architecture et code évolutif.",
    icon: Cpu,
    href: '/topics/csharp-aspnet-core',
  },
  {
    title: 'Cloud et systèmes distribués',
    description: 'Infrastructure cloud, automatisation, observabilité, chaînes de livraison et systèmes distribués.',
    icon: Cloud,
    href: '/topics/cloud-systemes-distribues',
  },
  {
    title: 'IA appliquée',
    description: "Intégration fiable de l'intelligence artificielle dans les produits, les workflows et les systèmes en production.",
    icon: BrainCircuit,
    href: '/topics/ia-appliquee',
  },
];

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(FEATURED_POSTS_COUNT);
  const latestPosts = getLatestPosts(LATEST_POSTS_COUNT);

  return (
    <div className="space-y-12 pb-16 md:space-y-16">
      <section className="container py-14 md:py-20">
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

      <section className="container grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {focusAreas.map(({ title, description, icon: Icon, href }) => (
          <Link key={title} href={href} className="group rounded-[1.75rem] focus-ring">
            <article className="h-full rounded-[1.75rem] border border-border bg-background/90 p-6 shadow-sm shadow-primary/5 transition-colors group-hover:border-primary/40">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mb-3 text-2xl font-semibold text-foreground">{title}</h2>
              <p className="text-secondary">{description}</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                Explorer ce parcours <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </article>
          </Link>
        ))}
      </section>

      <section className="container py-6 md:py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Une lecture orientée décision</p>
            <h2 className="text-3xl font-bold text-foreground">Comprendre le code, mais aussi le contexte qui le justifie</h2>
            <p className="mt-4 text-secondary">
              Un exemple n'est utile que s'il précise ses contraintes. Les guides YvaDev relient chaque implémentation
              à son rôle dans le système et aux conséquences opérationnelles du choix.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-secondary">
              {[
                'Le problème technique avant la solution.',
                'Les compromis de maintenabilité et de performance.',
                'Les points de contrôle nécessaires en production.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
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
            <Button variant="outline" asChild>
              <Link href="/about">Comprendre la ligne éditoriale</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
