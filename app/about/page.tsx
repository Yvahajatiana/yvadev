import { Metadata } from 'next';
import { Cloud, Code2, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'A propos',
  description: 'YvaDev est un blog engineering personnel sur l IA, le .NET, le cloud et l automatisation de delivery.',
  openGraph: {
    title: `A propos | ${siteConfig.name}`,
    description: 'Vision, positionnement et trajectoire de la plateforme YvaDev.',
    type: 'website',
  },
};

const pillars = [
  {
    title: 'Construire des produits IA utiles',
    description: 'Aller au-dela de la demo pour aborder architecture, garde-fous, UX et passage en production.',
    icon: Sparkles,
  },
  {
    title: 'Rester solide sur le socle .NET',
    description: 'Capitaliser sur C#, ASP.NET Core et les patterns qui rendent les services lisibles et robustes.',
    icon: Code2,
  },
  {
    title: 'Industrialiser le delivery',
    description: 'Traiter Docker, CI/CD, Ansible et Terraform comme une partie du produit, pas une tache annexe.',
    icon: Rocket,
  },
];

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-5xl space-y-16">
        <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent">
              <Cloud className="mr-2 h-4 w-4" />
              Blog engineering personnel
            </div>
            <h1 className="text-4xl font-bold text-foreground md:text-6xl">YvaDev, du contenu technique relie a une vraie chaine de delivery.</h1>
            <p className="text-lg text-secondary">
              Cette refonte remplace l'ancien WordPress par une base Next.js plus rapide, plus maintenable,
              et surtout directement connectee a une strategie de deploiement moderne.
            </p>
            <p className="text-secondary">
              L'objectif n'est pas seulement d'avoir un nouveau theme, mais un socle commun pour publier,
              experimenter, deployer et faire evoluer le site sans casser la cadence.
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-background/90 p-8 shadow-lg shadow-primary/5">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Ce que la refonte apporte</h2>
            <ul className="space-y-4 text-secondary">
              <li>Base de code unique partagee avec `ai4dev`.</li>
              <li>Contenu en MDX pour migrer et enrichir les articles plus vite.</li>
              <li>Build reproductible via Docker et GitHub Actions.</li>
              <li>Infrastructure versionnee sur Hetzner avec Terraform et Ansible.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-[1.75rem] border border-border bg-muted/50 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-3 text-2xl font-semibold text-foreground">{title}</h2>
              <p className="text-secondary">{description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-foreground p-8 text-white md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Roadmap immediate</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">01</div>
              <p className="text-white/80">Stabiliser la base applicative et le branding YvaDev.</p>
            </div>
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">02</div>
              <p className="text-white/80">Industrialiser build, image Docker, et deploiement automatise.</p>
            </div>
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">03</div>
              <p className="text-white/80">Migrer progressivement le contenu du WordPress vers MDX et nouvelles pages.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-[2rem] border border-border bg-primary/5 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Le socle est pret pour evoluer</h2>
            <p className="mt-2 max-w-2xl text-secondary">
              On peut maintenant brancher le repository final, les secrets GitHub et la migration du contenu.
            </p>
          </div>
          <Button asChild size="lg">
            <a href={`mailto:${siteConfig.author.email}`}>Contacter YvaDev</a>
          </Button>
        </section>
      </div>
    </div>
  );
}
