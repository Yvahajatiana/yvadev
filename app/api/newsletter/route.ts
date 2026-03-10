import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Here you would integrate with your newsletter service
    // Examples: ConvertKit, Mailchimp, Substack, etc.
    
    // For demonstration, we'll simulate the API call
    const newsletterApiKey = process.env.NEWSLETTER_API_KEY;
    
    if (!newsletterApiKey) {
      console.log('Newsletter API key not configured, logging subscription:', email);
      
      // In development, just log the email
      return NextResponse.json(
        { message: 'Successfully subscribed! (Demo mode)' },
        { status: 200 }
      );
    }

    // Example integration with a newsletter service
    // Replace this with your actual newsletter service API call
    /*
    const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: newsletterApiKey,
        email: email,
        tags: ['yvadev-blog'],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter');
    }
    */

    // Rate limiting could be added here
    // You might want to store subscriptions in a database
    // and implement duplicate email checking

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

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
