'use client';

import { useEffect, useState } from 'react';
import { TableOfContentsItem } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
      }
    );

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-2', className)}>
      <h4 className="font-semibold text-sm text-foreground mb-4">Dans cet article</h4>
      <nav aria-label="Sommaire de l’article">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'location' : undefined}
                className={cn(
                  'text-left text-sm transition-colors hover:text-primary block w-full',
                  item.level === 2 ? 'font-medium' : 'pl-4 font-normal',
                  activeId === item.id
                    ? 'text-primary font-medium'
                    : 'text-secondary'
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
