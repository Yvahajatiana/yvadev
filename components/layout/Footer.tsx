import Link from 'next/link';
import { Github } from 'lucide-react';
import { siteConfig } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="col-span-1 space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white">
                YD
              </div>
              <span className="text-xl font-bold text-foreground">YvaDev</span>
            </Link>
            <p className="max-w-md text-secondary">
              Blog technique sur le software engineering, le .NET, l architecture logicielle,
              le cloud engineering et l intelligence artificielle appliquee.
            </p>
            <div className="flex space-x-4">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary transition-colors hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-secondary transition-colors hover:text-foreground">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary transition-colors hover:text-foreground">
                  A propos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Themes</h3>
            <ul className="space-y-2 text-secondary">
              <li>Software Engineering</li>
              <li>.NET & architecture</li>
              <li>Cloud & DevOps</li>
              <li>AI Engineering</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-secondary md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.shortName}. Tous droits reserves.</p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
