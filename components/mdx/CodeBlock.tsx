'use client';

import { useEffect, useRef } from 'react';
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
  const codeRef = useRef<HTMLElement>(null);

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
      {/* Code content */}
      <pre className={cn(
        'overflow-x-auto bg-[#272822] text-[#f8f8f2] p-4 rounded-lg text-sm leading-relaxed',
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