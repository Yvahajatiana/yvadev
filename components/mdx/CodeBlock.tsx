'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lang = language || className?.replace('language-', '') || 'text';

  return (
    <div className="relative group">
      {/* Language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-foreground text-background text-sm font-medium rounded-t-lg border-b border-border/20">
        <span className="text-xs uppercase tracking-wide opacity-70">
          {lang}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 w-6 p-0 text-background/70 hover:text-background hover:bg-background/10"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span className="sr-only">
            {copied ? 'Copied!' : 'Copy code'}
          </span>
        </Button>
      </div>

      {/* Code content */}
      <pre className={cn(
        'overflow-x-auto bg-foreground text-background p-4 rounded-b-lg text-sm leading-relaxed',
        'scrollbar-thin scrollbar-track-background/10 scrollbar-thumb-background/30',
        className
      )}>
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  );
}