import { type ClassValue, clsx } from 'clsx';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMM dd, yyyy');
}

export function formatDateLong(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMMM dd, yyyy');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}