import { Metadata } from 'next';
import Link from 'next/link';
import { X } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';
import { PostList } from '@/components/blog/PostList';
import { getAllPosts, searchPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/constants';
import { BlogStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Articles',
  description: "Parcourez les articles YvaDev sur l'ingénierie logicielle, .NET, l'architecture, le cloud et l'intelligence artificielle.",
  openGraph: {
    title: `Articles | ${siteConfig.name}`,
    description: "Catalogue d'articles techniques sur l'ingénierie logicielle, le cloud et les architectures applicatives.",
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const allPosts = getAllPosts();
  const searchQuery = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const posts = searchQuery ? searchPosts(searchQuery) : allPosts;

  return (
    <>
      <BlogStructuredData />
      <div className="container py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              {searchQuery ? 'Résultats de recherche' : 'Articles et notes techniques'}
            </h1>
            <p className="mb-8 text-lg text-secondary">
              {searchQuery
                ? `${posts.length} résultat${posts.length !== 1 ? 's' : ''} pour "${searchQuery}"`
                : "Des articles pour approfondir l'ingénierie logicielle, .NET, l'architecture, le cloud et l'ingénierie de l'IA."}
            </p>

            <div className="mx-auto max-w-md">
              <SearchBar placeholder="Rechercher un article..." initialQuery={searchQuery || ''} />
            </div>

            {searchQuery && (
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog">
                    <X className="mr-2 h-4 w-4" />
                    Effacer la recherche
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="mb-12 grid gap-4 rounded-[1.75rem] border border-border bg-background/90 p-6 text-center sm:grid-cols-3">
            <div>
              <div className="text-2xl font-bold text-foreground">{posts.length}</div>
              <div className="text-sm text-secondary">Articles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{new Set(posts.flatMap((post) => post.tags)).size}</div>
              <div className="text-sm text-secondary">Thèmes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{posts.filter((post) => post.featured).length}</div>
              <div className="text-sm text-secondary">Mis en avant</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Sujets populaires</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts.flatMap((post) => post.tags)))
                .slice(0, 10)
                .map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-sm text-secondary transition-colors hover:bg-primary hover:text-white"
                  >
                    {tag}
                  </button>
                ))}
            </div>
          </div>

          {posts.length === 0 && searchQuery ? (
            <div className="py-16 text-center">
              <h3 className="mb-4 text-xl font-semibold text-foreground">Aucun article trouvé</h3>
              <p className="mb-6 text-secondary">
                Aucun contenu ne correspond à "{searchQuery}". Essaie avec d'autres mots-clés.
              </p>
              <Button variant="outline" asChild>
                <Link href="/blog">Voir tous les articles</Link>
              </Button>
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </div>
    </>
  );
}
