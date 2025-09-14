'use client';

import { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { Button } from './Button';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={className}
    >
      <LinkIcon className="h-4 w-4 mr-2" />
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}