'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import csharp from 'highlight.js/lib/languages/csharp';
import 'highlight.js/styles/monokai.css';

// Register languages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('python', python);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('cs', csharp);

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lang = language || className?.replace('language-', '') || 'text';

  useEffect(() => {
    if (codeRef.current && lang !== 'text') {
      // Remove existing highlighting
      codeRef.current.removeAttribute('data-highlighted');
      codeRef.current.className = `language-${lang}`;
      codeRef.current.textContent = children;

      // Apply highlighting
      hljs.highlightElement(codeRef.current);
    }
  }, [children, lang]);

  return (
    <div className="relative group my-6">
      {/* Language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#272822] text-[#f8f8f2] text-sm font-medium rounded-t-lg border-b border-[#3e3d32]">
        <span className="text-xs uppercase tracking-wide opacity-70">
          {lang}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 w-6 p-0 text-[#f8f8f2]/70 hover:text-[#f8f8f2] hover:bg-[#f8f8f2]/10"
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
        'overflow-x-auto bg-[#272822] text-[#f8f8f2] p-4 rounded-b-lg text-sm leading-relaxed',
        'scrollbar-thin scrollbar-track-[#272822]/10 scrollbar-thumb-[#f8f8f2]/30',
        className
      )}>
        {lang !== 'text' ? (
          <code ref={codeRef} className={`language-${lang} font-mono hljs`}>
            {children}
          </code>
        ) : (
          <code className="font-mono">{children}</code>
        )}
      </pre>
    </div>
  );
}