import { Metadata } from 'next';
import { Bot, Code, Users, Zap, Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about AI4Dev\'s mission to make AI integration accessible to all developers through practical tutorials and comprehensive guides.',
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: 'Learn about AI4Dev\'s mission to make AI integration accessible to all developers through practical tutorials and comprehensive guides.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
            <Bot className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            About AI4Dev
          </h1>
          
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
            We're on a mission to make AI integration accessible to every developer, 
            regardless of their experience level.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Our Mission
            </h2>
            <p className="text-secondary">
              The AI revolution is here, but many developers struggle to integrate these powerful 
              technologies into their applications. We bridge that gap by providing practical, 
              hands-on tutorials and comprehensive guides.
            </p>
            <p className="text-secondary">
              From your first API call to production-ready AI applications, we're here to guide 
              you through every step of your AI development journey.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/10 p-6 rounded-lg text-center">
              <Code className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-secondary">Tutorials</div>
            </div>
            <div className="bg-accent/10 p-6 rounded-lg text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">10k+</div>
              <div className="text-sm text-secondary">Developers</div>
            </div>
            <div className="bg-secondary/10 p-6 rounded-lg text-center">
              <Zap className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">25+</div>
              <div className="text-sm text-secondary">APIs Covered</div>
            </div>
            <div className="bg-green-500/10 p-6 rounded-lg text-center">
              <Bot className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">99%</div>
              <div className="text-sm text-secondary">Satisfaction</div>
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What We Cover
            </h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Our content spans the entire AI development ecosystem, from beginner-friendly 
              introductions to advanced integration patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                API Integration
              </h3>
              <p className="text-secondary text-sm">
                Learn to integrate popular AI APIs like OpenAI GPT, Claude, Google Gemini, 
                and more into your applications.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Best Practices
              </h3>
              <p className="text-secondary text-sm">
                Production-ready patterns for error handling, rate limiting, caching, 
                and cost optimization.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Real-World Projects
              </h3>
              <p className="text-secondary text-sm">
                Build complete applications like chatbots, content generators, 
                and AI-powered tools from scratch.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Framework Integration
              </h3>
              <p className="text-secondary text-sm">
                Integrate AI into React, Next.js, Node.js, Python, and other 
                popular frameworks and languages.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Performance Optimization
              </h3>
              <p className="text-secondary text-sm">
                Learn how to optimize AI applications for speed, cost, and scalability 
                in production environments.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Security & Ethics
              </h3>
              <p className="text-secondary text-sm">
                Implement responsible AI practices including data privacy, content moderation, 
                and ethical considerations.
              </p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Approach
            </h2>
            <p className="text-secondary">
              We believe in learning by doing. Every tutorial includes working code examples 
              and real-world applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Practical Examples
              </h3>
              <p className="text-secondary text-sm">
                Every concept is illustrated with real code that you can copy, 
                paste, and modify for your own projects.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Step-by-Step Guides
              </h3>
              <p className="text-secondary text-sm">
                Complex topics broken down into digestible steps, making it easy 
                to follow along at your own pace.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Production Ready
              </h3>
              <p className="text-secondary text-sm">
                Learn not just how to make it work, but how to make it work 
                reliably in production environments.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Join Our Community
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Subscribe to our newsletter and join thousands of developers who stay updated 
            with the latest AI development trends and tutorials.
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
          <p className="text-xs text-secondary">
            No spam ever. Unsubscribe at any time.
          </p>
        </section>

        {/* Contact */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Get In Touch
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Have questions, suggestions, or want to contribute? We'd love to hear from you!
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:contact@ai4dev.blog">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://twitter.com/ai4dev" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/ai4dev" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://linkedin.com/company/ai4dev" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}