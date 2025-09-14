import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
                AI
              </div>
              <span className="font-bold text-xl text-foreground">AI4Dev</span>
            </Link>
            <p className="text-secondary mb-4 max-w-md">
              Master AI integration in your applications with practical tutorials, 
              code examples, and the latest AI development news.
            </p>
            <div className="flex space-x-4">
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-secondary hover:text-foreground transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog/tag/tutorials" className="text-secondary hover:text-foreground transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/blog/tag/apis" className="text-secondary hover:text-foreground transition-colors">
                  API Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/tag/gpt-4" className="text-secondary hover:text-foreground transition-colors">
                  GPT-4
                </Link>
              </li>
              <li>
                <Link href="/blog/tag/claude" className="text-secondary hover:text-foreground transition-colors">
                  Claude
                </Link>
              </li>
              <li>
                <Link href="/blog/tag/integration" className="text-secondary hover:text-foreground transition-colors">
                  Integration
                </Link>
              </li>
              <li>
                <Link href="/blog/tag/best-practices" className="text-secondary hover:text-foreground transition-colors">
                  Best Practices
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-secondary hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-secondary hover:text-foreground text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}