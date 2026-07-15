export interface Topic {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  introduction: string;
  tags: string[];
  principles: string[];
}

export const topics: Topic[] = [
  {
    slug: 'architecture-dotnet',
    title: 'Architecture .NET pour des applications maintenables',
    shortTitle: 'Architecture .NET',
    description: 'Guides sur la structuration des applications .NET, les frontières d’architecture, la maintenabilité et les décisions de conception.',
    introduction: 'Cette sélection rassemble les pratiques qui aident à faire évoluer une application .NET sans transformer chaque changement en risque. Elle aborde la structure du code, les dépendances, la persistance et les compromis d’architecture.',
    tags: ['Architecture', '.NET', 'Clean Architecture', 'Maintainability', 'Design Patterns', 'Entity Framework Core', 'Software Architect'],
    principles: [
      'Définir des frontières adaptées au domaine et à la taille du système.',
      'Préférer une structure lisible à une accumulation d’abstractions.',
      'Rendre les décisions d’architecture vérifiables par le code et les tests.',
    ],
  },
  {
    slug: 'csharp-aspnet-core',
    title: 'C# et ASP.NET Core, des fondamentaux à la production',
    shortTitle: 'C# et ASP.NET Core',
    description: 'Ressources C# et ASP.NET Core sur le langage, les API, la validation, la concurrence et la construction d’applications web.',
    introduction: 'Ce parcours relie les fondamentaux du langage C# aux contraintes d’une application ASP.NET Core. Les articles vont de la lisibilité du code aux API, à la validation et aux mécanismes asynchrones utilisés en production.',
    tags: ['C#', 'ASP.NET Core', '.NET 9', 'Async', 'Concurrency', 'Validation', 'API'],
    principles: [
      'Maîtriser le langage avant de multiplier les couches techniques.',
      'Concevoir des contrats d’API explicites et des validations prévisibles.',
      'Traiter concurrence, annulation et erreurs comme des choix de conception.',
    ],
  },
  {
    slug: 'cloud-systemes-distribues',
    title: 'Cloud et systèmes distribués fiables',
    shortTitle: 'Cloud et systèmes distribués',
    description: 'Articles sur le cloud, les microservices, la messagerie, la résilience, l’observabilité et les systèmes distribués.',
    introduction: 'Les systèmes distribués déplacent la complexité vers le réseau, les données et l’exploitation. Cette page regroupe les contenus consacrés aux choix cloud, à la messagerie et aux mécanismes nécessaires pour rester fiable malgré les pannes.',
    tags: ['Cloud', 'DevOps', 'Distributed Systems', 'Microservices', 'Messaging', 'Reliability', 'Infrastructure'],
    principles: [
      'Adopter la distribution seulement lorsqu’elle répond à une contrainte réelle.',
      'Concevoir les erreurs partielles, les reprises et l’idempotence dès le départ.',
      'Rendre le système observable avant de chercher à le faire monter en charge.',
    ],
  },
  {
    slug: 'ia-appliquee',
    title: 'Intelligence artificielle appliquée aux logiciels',
    shortTitle: 'IA appliquée',
    description: 'Guides sur les LLM, les agents, le prompt engineering et l’intégration fiable de capacités d’IA dans les applications.',
    introduction: 'L’intégration d’un modèle ne se limite pas à un appel d’API. Ces contenus traitent les LLM, les agents et le contexte comme des composants applicatifs avec des contrats, des mesures, des coûts et des risques.',
    tags: ['AI Engineering', 'LLM', 'AI Agents', 'MCP', 'Prompt Engineering', 'ChatGPT', 'SLM'],
    principles: [
      'Partir du besoin produit et définir le comportement attendu.',
      'Encadrer les sorties probabilistes par des validations déterministes.',
      'Mesurer qualité, latence, coût et taux de recours humain.',
    ],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function postMatchesTopic(postTags: string[], topic: Topic): boolean {
  const normalizedPostTags = postTags.map((tag) => tag.toLowerCase());
  return topic.tags.some((tag) => normalizedPostTags.includes(tag.toLowerCase()));
}
