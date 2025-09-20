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

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-muted">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">3+</div>
              <div className="text-sm text-secondary">AI Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-secondary">API Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-secondary">Lines of Code</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-secondary">Production Ready</div>
            </div>
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
                React & Next.js Integration
              </h3>
              <p className="text-secondary">
                Complete tutorials for integrating OpenAI, Claude, and other AI APIs into React applications with TypeScript support.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                API Comparisons & Performance
              </h3>
              <p className="text-secondary">
                Side-by-side comparisons of GPT-4, Claude, and Gemini APIs with performance benchmarks and cost analysis.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Production Best Practices
              </h3>
              <p className="text-secondary">
                Error handling, rate limiting, token optimization, and security practices for production AI applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Production-Ready Code Examples
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Every tutorial includes complete, tested code that you can use directly in your projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-muted/50 rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-secondary">TypeScript + OpenAI API</span>
            </div>
            <pre className="text-sm text-foreground overflow-x-auto">
              <code>{`import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResponse(prompt: string) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate response');
  }
}`}</code>
            </pre>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-secondary">✓ Error handling • ✓ TypeScript • ✓ Environment variables</span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog/getting-started-gpt4-api">
                  View Full Tutorial
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
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

      {/* FAQ Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-secondary">
              Common questions about AI integration and development
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How do I get started with AI API integration?
              </h3>
              <p className="text-secondary">
                Start with our "Getting Started with GPT-4 API" tutorial. It covers API key setup,
                basic requests, error handling, and TypeScript integration. You'll have a working AI feature in under 30 minutes.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Which AI API should I choose for my project?
              </h3>
              <p className="text-secondary">
                It depends on your use case. GPT-4 excels at general tasks and coding, Claude is great for analysis and safety,
                while Gemini offers competitive pricing. Check our detailed API comparison guide for specific recommendations.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How do I handle API costs and rate limits?
              </h3>
              <p className="text-secondary">
                Implement request caching, token counting, user rate limiting, and choose the right model for your task.
                Our production best practices guide covers cost optimization strategies that can reduce expenses by 60-80%.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Are these tutorials suitable for production use?
              </h3>
              <p className="text-secondary">
                Absolutely! Every code example includes proper error handling, security best practices, TypeScript types,
                and production-ready patterns. We focus on real-world implementation, not just proof-of-concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

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