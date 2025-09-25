import Link from 'next/link';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-secondary text-lg">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/blog">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Articles
            </Link>
          </Button>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-secondary hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-3 w-3" />
            Back to AI4Dev
          </Link>
        </div>
      </div>
    </div>
  );
}