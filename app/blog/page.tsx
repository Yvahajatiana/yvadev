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
  title: 'All Articles',
  description: 'Browse all AI development tutorials, guides, and articles to master AI integration in your applications.',
  openGraph: {
    title: `All Articles | ${siteConfig.name}`,
    description: 'Browse all AI development tutorials, guides, and articles to master AI integration in your applications.',
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
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {searchQuery ? `Search Results` : 'All Articles'}
          </h1>
          <p className="text-lg text-secondary mb-8">
            {searchQuery 
              ? `${posts.length} result${posts.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : 'Explore our complete collection of AI development tutorials and guides'
            }
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <SearchBar 
              placeholder="Search articles..." 
              initialQuery={searchQuery || ''}
            />
          </div>

          {/* Clear Search */}
          {searchQuery && (
            <div className="text-center mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog">
                  <X className="h-4 w-4 mr-2" />
                  Clear Search
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-sm text-secondary">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{posts.length}</div>
            <div>Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {new Set(posts.flatMap(post => post.tags)).size}
            </div>
            <div>Topics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {posts.filter(post => post.featured).length}
            </div>
            <div>Featured</div>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Popular Topics</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(posts.flatMap(post => post.tags)))
              .slice(0, 10)
              .map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-sm bg-muted text-secondary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>

        {/* Posts List */}
        {posts.length === 0 && searchQuery ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              No articles found
            </h3>
            <p className="text-secondary mb-6">
              We couldn't find any articles matching "{searchQuery}". 
              Try searching with different keywords.
            </p>
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All Articles
              </Link>
            </Button>
          </div>
        ) : (
          <PostList posts={posts} />
        )}

        {/* Load More (placeholder for future pagination) */}
        {posts.length > 12 && !searchQuery && (
          <div className="text-center mt-12">
            <button className="button-secondary">
              Load More Articles
            </button>
          </div>
        )}
        </div>
      </div>
    </>
  );
}