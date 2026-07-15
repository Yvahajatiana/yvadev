import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { PostMetadata } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: PostMetadata;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={`
      group relative h-full overflow-hidden rounded-[1.5rem] border border-border bg-background/95 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10
      ${featured ? 'md:col-span-2 md:row-span-2' : ''}
    `}>
      <Link href={`/blog/${post.slug}`} className="focus-ring flex h-full flex-col rounded-[1.5rem]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          {post.featured && (
            <div className="absolute left-4 top-4">
              <Badge variant="accent">À la une</Badge>
            </div>
          )}
        </div>

        <div className={`flex flex-1 flex-col p-5 ${featured ? 'md:p-8' : 'md:p-6'}`}>
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="default" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>

          <h2 className={`
            line-clamp-2 font-bold text-foreground transition-colors group-hover:text-primary
            ${featured ? 'mb-3 text-xl md:text-2xl' : 'mb-3 text-lg'}
          `}>
            {post.title}
          </h2>

          <p className={`
            mb-5 line-clamp-3 text-secondary
            ${featured ? 'text-base' : 'text-sm'}
          `}>
            {post.excerpt}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs text-secondary">
            <div className="flex items-center gap-1.5">
              <User aria-hidden="true" className="h-3.5 w-3.5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock aria-hidden="true" className="h-3.5 w-3.5" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
