import { ArrowRight, Bot, Cpu, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PostCard } from '@/components/blog/PostCard';
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
            <span>AI · C# · .NET · Production</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
            Build smarter apps with AI and modern .NET
          </h1>

          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto text-balance">
            Deep-dive tutorials on AI integration, C# patterns, and .NET development.
            Real-world code, production-ready — no fluff.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button asChild size="lg">
              <Link href="/blog">
                Browse Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">About AI4Dev</Link>
            </Button>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-muted">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">8+</div>
              <div className="text-sm text-secondary">Technical Guides</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">4</div>
              <div className="text-sm text-secondary">AI Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-secondary">C# & .NET Deep Dives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-secondary">Production Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What You&apos;ll Find Here
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Practical, in-depth content for developers who want to build with AI and write better .NET code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                AI Integration
              </h3>
              <p className="text-secondary">
                Integrate GPT-4, Claude, and local LLMs into your apps with battle-tested C# and JavaScript examples.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-lg">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                C# & .NET
              </h3>
              <p className="text-secondary">
                Modern C# patterns, .NET 10 features, performance optimization, and enterprise development practices.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Production Practices
              </h3>
              <p className="text-secondary">
                Background processing, error handling, API security, and architecture patterns for production systems.
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
            Every tutorial includes complete, tested code you can use directly in your projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <CodeBlock
            language="csharp"
            title="C# + ASP.NET Core"
            code={`// ASP.NET Core Channels — Lightweight Background Processing
var channel = Channel.CreateUnbounded<WorkItem>(
    new UnboundedChannelOptions { SingleReader = false });

// Producer: enqueue work from your API endpoints
await channel.Writer.WriteAsync(new WorkItem
{
    Id = Guid.NewGuid(),
    Payload = request.Data
});

// Consumer: background service processes items without blocking
await foreach (var item in channel.Reader.ReadAllAsync(stoppingToken))
{
    await _processor.HandleAsync(item, stoppingToken);
}`}
          />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-secondary">
              ✓ No external queues &nbsp;·&nbsp; ✓ Built-in .NET &nbsp;·&nbsp; ✓ Production-ready
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog/aspnet-core-channels-background-processing">
                View Full Tutorial
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
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
              <PostCard key={post.slug} post={post} />
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
                Fresh content on AI, C#, and .NET development
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
              <PostCard key={post.slug} post={post} />
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
              Everything you need to know about AI4Dev
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Is this blog for C# developers or AI developers?
              </h3>
              <p className="text-secondary">
                Both! AI4Dev bridges the gap between .NET development and AI. Most of our content
                covers C# and .NET in depth — while also teaching how to integrate modern AI APIs
                and models into your applications.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                What C# and .NET topics do you cover?
              </h3>
              <p className="text-secondary">
                We cover .NET 10 and C# 14 new features, delegates (Func, Action, Predicate),
                ASP.NET Core Channels for background processing, object equality (GetHashCode/Equals),
                performance patterns, and enterprise architecture practices.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Do your AI tutorials include C# examples?
              </h3>
              <p className="text-secondary">
                Yes — our AI Agents guide uses C# with LM-Kit.NET for local, enterprise-grade inference.
                We also cover GPT-4 and Claude integrations in TypeScript/JavaScript for web developers.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Are the code examples production-ready?
              </h3>
              <p className="text-secondary">
                Absolutely. Every example includes proper error handling, strong typing, and real-world
                patterns — not just proof-of-concepts. We focus on code you can actually ship.
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
              Stay Ahead in AI & .NET
            </h2>
            <p className="text-secondary">
              Get new tutorials on C#, .NET, and AI development delivered to your inbox.
              No spam, unsubscribe anytime.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
