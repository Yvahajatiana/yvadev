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
      group relative overflow-hidden rounded-xl border border-border bg-background transition-all duration-200 hover:shadow-lg hover:shadow-primary/5
      ${featured ? 'md:col-span-2 md:row-span-2' : ''}
    `}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          {post.featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="accent">À la une</Badge>
            </div>
          )}
        </div>

        <div className={`p-6 ${featured ? 'md:p-8' : ''}`}>
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h2 className={`
            font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2
            ${featured ? 'text-xl md:text-2xl mb-3' : 'text-lg mb-2'}
          `}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className={`
            text-secondary line-clamp-3 mb-4
            ${featured ? 'text-base' : 'text-sm'}
          `}>
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-secondary">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
