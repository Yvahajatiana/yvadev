import { ArrowRight, Cloud, Cpu, GitBranch, Server, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PostCard } from '@/components/blog/PostCard';
import { getFeaturedPosts, getLatestPosts } from '@/lib/posts';
import { FEATURED_POSTS_COUNT, LATEST_POSTS_COUNT } from '@/lib/constants';

const focusAreas = [
  {
    title: 'AI products',
    description: 'Designing useful AI features, integrating APIs, and shipping workflows that survive production constraints.',
    icon: Sparkles,
  },
  {
    title: '.NET systems',
    description: 'Clean application layers, async processing, performance work, and modern C# patterns for maintainable services.',
    icon: Cpu,
  },
  {
    title: 'Cloud delivery',
    description: 'Docker, CI/CD, Terraform and Ansible setups that keep deployments repeatable from laptop to Hetzner.',
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
              Refonte YvaDev basee sur le socle AI4Dev
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-5xl font-extrabold text-foreground md:text-7xl">
                Un blog engineering unique pour l'IA, le .NET et l'infrastructure.
              </h1>
              <p className="max-w-2xl text-lg text-secondary md:text-xl">
                YvaDev reprend la meme base applicative que `ai4dev`, puis l'etend pour devenir
                une plateforme editoriale et deploiement-ready: contenu, Docker, CI/CD, Terraform et Ansible.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/blog">
                  Lire les articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Voir la vision YvaDev</Link>
              </Button>
            </div>

            <div className="grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
              <div>
                <div className="text-3xl font-bold text-primary">1</div>
                <p className="text-sm text-secondary">Codebase Next.js commune avec AI4Dev</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">Docker</div>
                <p className="text-sm text-secondary">Runtime portable pour local et production</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">IaC</div>
                <p className="text-sm text-secondary">Provisioning Hetzner avec Terraform et Ansible</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-foreground px-6 py-8 text-white shadow-2xl shadow-primary/10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
                delivery blueprint
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">From commit to Hetzner</h2>
                <p className="text-sm text-white/70">
                  Une seule base applicative pour produire le site, construire l'image Docker,
                  deployer automatiquement et garder l'infra versionnee.
                </p>
              </div>
              <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">app</span>
                  <span>Next.js 14</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">container</span>
                  <span>Multi-stage Docker</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">pipeline</span>
                  <span>GitHub Actions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">infra</span>
                  <span>Terraform + Ansible</span>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                <Server className="h-4 w-4 text-primary" />
                Base parfaite pour migrer le contenu WordPress vers un front moderne.
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
          <h2 className="mb-4 text-3xl font-bold text-foreground">Meme moteur, nouveau positionnement</h2>
          <p className="mx-auto max-w-2xl text-secondary">
            Le coeur reste le blog AI4Dev: MDX, SEO, cartes d'articles, recherche et pages detaillees.
            La refonte YvaDev ajoute une ligne editoriale plus large, orientee engineering de bout en bout.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <CodeBlock
            language="yaml"
            title="Delivery flow"
            code={`name: yvadev-release
on:
  push:
    branches: [main]

jobs:
  build-and-release:
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: docker build -t ghcr.io/yvahajatiana/yvadev:$GITHUB_SHA .
      - run: terraform apply -auto-approve
      - run: ansible-playbook infra/ansible/playbooks/deploy.yml`}
          />
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="container">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Articles a mettre en avant</h2>
              <p className="text-secondary">Le contenu existant reste exploitable tel quel pendant la migration.</p>
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
              <h2 className="mb-2 text-3xl font-bold text-foreground">Dernieres publications</h2>
              <p className="text-secondary">Une base d'articles immediate pendant la refonte du contenu WordPress.</p>
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
            <h2 className="mb-4 text-3xl font-bold text-foreground">Suite logique de la migration</h2>
            <p className="text-secondary">
              Une fois les contenus WordPress migres, on pourra ajouter des pages service, cas clients,
              une taxonomie plus fine et un back-office editorial si besoin.
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
