'use client';

import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';

// Register languages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, language, title, className = '' }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      // Remove existing highlighting
      codeRef.current.removeAttribute('data-highlighted');
      codeRef.current.className = `language-${language}`;
      codeRef.current.textContent = code;

      // Apply highlighting
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className={`code-block ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs text-secondary">{title}</span>
        </div>
      )}
      <pre className="bg-muted/50 rounded-lg p-6 border border-border overflow-x-auto">
        <code ref={codeRef} className={`language-${language} text-sm`}>
          {code}
        </code>
      </pre>
    </div>
  );
}