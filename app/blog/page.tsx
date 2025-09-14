import { Metadata } from 'next';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { PostList } from '@/components/blog/PostList';
import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all AI development tutorials, guides, and articles to master AI integration in your applications.',
  openGraph: {
    title: `All Articles | ${siteConfig.name}`,
    description: 'Browse all AI development tutorials, guides, and articles to master AI integration in your applications.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            All Articles
          </h1>
          <p className="text-lg text-secondary mb-8">
            Explore our complete collection of AI development tutorials and guides
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
            />
          </div>
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
        <PostList posts={posts} />

        {/* Load More (placeholder for future pagination) */}
        {posts.length > 12 && (
          <div className="text-center mt-12">
            <button className="button-secondary">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}