import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/posts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validate query
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Validate limit
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 50' },
        { status: 400 }
      );
    }

    // Perform search
    const results = searchPosts(query).slice(0, limit);

    return NextResponse.json({
      query,
      results,
      total: results.length,
      limit,
    });

  } catch (error) {
    console.error('Search API error:', error);
    
    return NextResponse.json(
      { error: 'Search failed. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 10 } = await request.json();

    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid search query is required' },
        { status: 400 }
      );
    }

    if (typeof limit !== 'number' || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be a number between 1 and 50' },
        { status: 400 }
      );
    }

    // Perform search
    const results = searchPosts(query.trim()).slice(0, limit);

    // You could add analytics tracking here
    // trackSearchQuery(query, results.length);

    return NextResponse.json({
      query: query.trim(),
      results,
      total: results.length,
      limit,
    });

  } catch (error) {
    console.error('Search API error:', error);
    
    return NextResponse.json(
      { error: 'Search failed. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}