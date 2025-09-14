'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from './Input';
import { PostMetadata } from '@/types';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  initialQuery?: string;
}

interface SearchResult {
  query: string;
  results: PostMetadata[];
  total: number;
  limit: number;
}

export function SearchBar({ className, placeholder = "Search articles...", initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PostMetadata[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search query
  const debouncedQuery = useMemo(() => {
    const handler = setTimeout(() => query, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Perform search
  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`);
      if (response.ok) {
        const data: SearchResult = await response.json();
        setResults(data.results);
        setIsOpen(data.results.length > 0);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect for debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/blog/${results[selectedIndex].slug}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        
        {/* Loading/Clear Button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-secondary animate-spin" />
          ) : query ? (
            <button
              onClick={clearSearch}
              className="p-0.5 hover:bg-muted rounded"
              aria-label="Clear search"
            >
              <X className="h-3 w-3 text-secondary" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-4 text-center text-secondary">
              No articles found for "{query}"
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="px-4 py-2 border-b border-border">
                <span className="text-xs text-secondary">
                  {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </span>
              </div>

              {/* Results List */}
              <div className="py-2">
                {results.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 hover:bg-muted transition-colors",
                      selectedIndex === index && "bg-muted"
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-sm line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-xs text-secondary mt-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs text-secondary">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-secondary">•</span>
                          <span className="text-xs text-secondary">
                            {post.readingTime}
                          </span>
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-muted text-secondary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Show All Results Link */}
              {results.length >= 8 && (
                <div className="px-4 py-2 border-t border-border">
                  <Link
                    href={`/blog?search=${encodeURIComponent(query)}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-primary hover:underline"
                  >
                    View all results for "{query}"
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}