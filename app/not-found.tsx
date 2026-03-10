import Link from 'next/link';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center">
        <div className="mb-8">
          <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-2xl font-bold text-foreground">Page introuvable</h2>
          <p className="text-lg text-secondary">
            Le contenu recherche n'existe plus ou n'a pas encore ete migre vers la nouvelle version du site.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Retour accueil
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/blog">
              <BookOpen className="mr-2 h-4 w-4" />
              Parcourir les articles
            </Link>
          </Button>
        </div>

        <div className="mt-8">
          <Link href="/" className="inline-flex items-center text-sm text-secondary transition-colors hover:text-foreground">
            <ArrowLeft className="mr-2 h-3 w-3" />
            Retour vers YvaDev
          </Link>
        </div>
      </div>
    </div>
  );
}
