import { siteConfig } from '@/lib/constants';
import { Post } from '@/types';

interface WebsiteStructuredDataProps {
  url?: string;
}

interface ArticleStructuredDataProps {
  post: Post;
  url: string;
}

export function WebsiteStructuredData({ url = siteConfig.url }: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url,
    sameAs: [siteConfig.social.twitter, siteConfig.social.linkedin, siteConfig.social.github].filter(Boolean),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      description: siteConfig.author.bio,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
      },
      sameAs: [siteConfig.social.twitter, siteConfig.social.linkedin, siteConfig.social.github].filter(Boolean),
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }} />;
}

export function BlogStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.shortName} Blog`,
    description: 'Engineering notes about AI, .NET, cloud infrastructure and delivery automation.',
    url: `${siteConfig.url}/blog`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog`,
    },
    inLanguage: 'fr-FR',
    genre: ['Technology', 'Artificial Intelligence', 'Programming', 'Software Delivery'],
    keywords: siteConfig.keywords?.join(', '),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }} />;
}

export function ArticleStructuredData({ post, url }: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}${post.coverImage}`,
      alt: post.coverImageAlt,
    },
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date(post.date).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${siteConfig.url}/blog`,
      name: `${siteConfig.shortName} Blog`,
    },
    keywords: post.tags.join(', '),
    genre: ['Technology', 'Tutorial', 'Programming'],
    inLanguage: 'en-US',
    wordCount: post.content.split(' ').length,
    timeRequired: post.readingTime,
    articleSection: 'Technology',
    about: post.tags.map((tag) => ({
      '@type': 'Thing',
      name: tag,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }} />;
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }} />;
}

export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }} />;
}
