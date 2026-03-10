import { Metadata } from 'next';
import { Cloud, Code2, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'A propos',
  description: 'YvaDev est un blog d ingenierie logicielle sur le software engineering, le .NET, l architecture, le cloud et l AI engineering.',
  openGraph: {
    title: `A propos | ${siteConfig.name}`,
    description: 'Positionnement editorial et domaines techniques couverts par YvaDev.',
    type: 'website',
  },
};

const pillars = [
  {
    title: 'Software Engineering applique',
    description: 'Design de services maintainables, quality engineering, resilience et organisation du code a l echelle.',
    icon: Sparkles,
  },
  {
    title: '.NET Engineering',
    description: 'C#, ASP.NET Core, patterns d architecture, messaging et structuration d applications modernes.',
    icon: Code2,
  },
  {
    title: 'AI Engineering',
    description: 'Integration de l intelligence artificielle dans des applications existantes avec contraintes reelles de produit et de production.',
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
              Blog d ingenierie logicielle
            </div>
            <h1 className="text-4xl font-bold text-foreground md:text-6xl">YvaDev partage des pratiques d ingenierie pour construire des systemes solides.</h1>
            <p className="text-lg text-secondary">
              Le blog s adresse aux developpeurs et ingenieurs logiciels qui veulent approfondir la conception d applications,
              l architecture logicielle, le cloud engineering et l intelligence artificielle appliquee.
            </p>
            <p className="text-secondary">
              Chaque article cherche a relier la theorie a des choix concrets : maintainability, scalabilite, observabilite,
              performance et integration progressive de nouvelles capacites dans des systemes existants.
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-background/90 p-8 shadow-lg shadow-primary/5">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Ce que couvre le blog</h2>
            <ul className="space-y-4 text-secondary">
              <li>Architecture .NET moderne et applications C# maintainables.</li>
              <li>Systemes distribues, messaging, resilience et patterns d integration.</li>
              <li>Cloud engineering, observabilite et pratiques DevOps.</li>
              <li>AI engineering pour integrer des capacites intelligentes dans des applications metier.</li>
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
          <h2 className="mb-4 text-3xl font-bold">Ligne editoriale</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">01</div>
              <p className="text-white/80">Expliquer des concepts techniques avec des exemples applicables a des systemes reels.</p>
            </div>
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">02</div>
              <p className="text-white/80">Partager des patterns d architecture et des decisions de conception utiles a long terme.</p>
            </div>
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">03</div>
              <p className="text-white/80">Aborder le cloud, le DevOps et l IA comme des problemes d ingenierie, pas comme des sujets isoles.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-[2rem] border border-border bg-primary/5 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Pour des developpeurs experimentes et curieux</h2>
            <p className="mt-2 max-w-2xl text-secondary">
              YvaDev publie des articles destines a mieux comprendre les systemes de production, les architectures evolutives et les pratiques d engineering modernes.
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
