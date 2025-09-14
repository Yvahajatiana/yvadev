import NextImage from 'next/image';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  caption?: string;
  priority?: boolean;
}

export function Image({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  caption,
  priority = false 
}: ImageProps) {
  return (
    <figure className="my-8">
      <div className={cn(
        'relative overflow-hidden rounded-lg border border-border',
        className
      )}>
        <NextImage
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 400}
          className="w-full h-auto"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-secondary mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}