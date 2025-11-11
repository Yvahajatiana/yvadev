import remarkGfm from 'remark-gfm';

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
};

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    headings.push({ id, title, level });
  }

  return headings;
}