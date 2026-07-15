import { Metadata } from 'next';
import { Cloud, Code2, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'À propos',
  description: "YvaDev est un blog d'ingénierie logicielle consacré à .NET, l'architecture, au cloud et à l'ingénierie de l'IA.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `À propos | ${siteConfig.name}`,
    description: 'Positionnement éditorial et domaines techniques couverts par YvaDev.',
    type: 'website',
  },
};

const pillars = [
  {
    title: 'Ingénierie logicielle appliquée',
    description: "Conception de services maintenables, qualité logicielle, résilience et organisation du code à l'échelle.",
    icon: Sparkles,
  },
  {
    title: '.NET Engineering',
    description: "C#, ASP.NET Core, patterns d'architecture, messagerie et structuration d'applications modernes.",
    icon: Code2,
  },
  {
    title: "Ingénierie de l'IA",
    description: "Intégration de l'intelligence artificielle dans des applications existantes, avec de véritables contraintes de produit et de production.",
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
              Blog d'ingénierie logicielle
            </div>
            <h1 className="text-4xl font-bold text-foreground md:text-6xl">YvaDev partage des pratiques d'ingénierie pour construire des systèmes solides</h1>
            <p className="text-lg text-secondary">
              Le blog s'adresse aux développeurs et ingénieurs logiciels qui veulent approfondir la conception d'applications,
              l'architecture logicielle, le cloud et l'intelligence artificielle appliquée.
            </p>
            <p className="text-secondary">
              Chaque article cherche à relier la théorie à des choix concrets : maintenabilité, passage à l'échelle, observabilité,
              performance et intégration progressive de nouvelles capacités dans des systèmes existants.
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-background/90 p-8 shadow-lg shadow-primary/5">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Ce que couvre le blog</h2>
            <ul className="space-y-4 text-secondary">
              <li>Architecture .NET moderne et applications C# maintenables.</li>
              <li>Systèmes distribués, messagerie, résilience et patterns d'intégration.</li>
              <li>Cloud, observabilité et pratiques DevOps.</li>
              <li>Ingénierie de l'IA pour intégrer des capacités intelligentes dans des applications métier.</li>
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
          <h2 className="mb-4 text-3xl font-bold">Ligne éditoriale</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">01</div>
              <p className="text-white/80">Expliquer des concepts techniques avec des exemples applicables à des systèmes réels.</p>
            </div>
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">02</div>
              <p className="text-white/80">Partager des patterns d'architecture et des décisions de conception utiles à long terme.</p>
            </div>
            <div>
              <div className="mb-2 text-sm uppercase tracking-[0.2em] text-white/60">03</div>
              <p className="text-white/80">Aborder le cloud, le DevOps et l'IA comme des problèmes d'ingénierie, pas comme des sujets isolés.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-[2rem] border border-border bg-primary/5 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Pour des développeurs expérimentés et curieux</h2>
            <p className="mt-2 max-w-2xl text-secondary">
              YvaDev publie des articles destinés à mieux comprendre les systèmes de production, les architectures évolutives et les pratiques modernes d'ingénierie.
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
