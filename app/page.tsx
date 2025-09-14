import { ArrowRight, Bot, Code, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { PostList } from '@/components/blog/PostList';
import { getFeaturedPosts, getLatestPosts } from '@/lib/posts';
import { FEATURED_POSTS_COUNT, LATEST_POSTS_COUNT } from '@/lib/constants';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(FEATURED_POSTS_COUNT);
  const latestPosts = getLatestPosts(LATEST_POSTS_COUNT);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted rounded-full text-sm text-secondary">
            <Bot className="h-4 w-4" />
            <span>AI Integration Made Simple</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
            Master AI Integration in Your Apps
          </h1>
          
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto text-balance">
            Learn to integrate AI into your applications with practical tutorials, 
            code examples, and the latest AI development news.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button asChild size="lg">
              <Link href="/blog">
                Explore Tutorials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need for AI Development
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              From beginner tutorials to advanced integration patterns, 
              we cover all aspects of AI development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Practical Tutorials
              </h3>
              <p className="text-secondary">
                Step-by-step guides with real code examples you can use in your projects.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                API Comparisons
              </h3>
              <p className="text-secondary">
                Compare different AI APIs and choose the best one for your use case.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Best Practices
              </h3>
              <p className="text-secondary">
                Learn industry best practices for production AI applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Articles
              </h2>
              <p className="text-secondary">
                Our most popular and comprehensive guides
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <div key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="space-y-3">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Bot className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-secondary line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="text-xs text-secondary">
                        {post.readingTime}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Latest Articles
              </h2>
              <p className="text-secondary">
                Fresh content about AI development
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.slice(0, 6).map((post) => (
              <div key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="space-y-3 p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-muted text-secondary rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-secondary line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="text-xs text-secondary">
                      {post.readingTime} • {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="bg-primary/5 py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Stay Updated
            </h2>
            <p className="text-secondary">
              Get the latest AI development tutorials and news delivered to your inbox. 
              No spam, unsubscribe at any time.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
            <p className="text-xs text-secondary">
              Join 1,000+ developers who trust AI4Dev for their AI learning journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}