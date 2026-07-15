import { PostMetadata } from '@/types';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: PostMetadata[];
  showFeatured?: boolean;
  className?: string;
}

export function PostList({ posts, showFeatured = false, className = '' }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-lg font-semibold text-foreground mb-2">Aucun article disponible</h3>
        <p className="text-secondary">De nouveaux contenus seront publiés prochainement.</p>
      </div>
    );
  }

  // If showing featured, separate featured from regular posts
  if (showFeatured) {
    const featuredPosts = posts.filter(post => post.featured);
    const regularPosts = posts.filter(post => !post.featured);

    return (
      <div className={className}>
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Articles à la une</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
              {featuredPosts.map((post, index) => (
                <PostCard 
                  key={post.slug} 
                  post={post} 
                  featured={index === 0} 
                />
              ))}
            </div>
          </div>
        )}

        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Derniers articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular grid layout
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
