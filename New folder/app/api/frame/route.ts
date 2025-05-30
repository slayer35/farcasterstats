import { NextRequest, NextResponse } from 'next/server';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const client = new NeynarAPIClient({
  apiKey: process.env.NEYNAR_API_KEY || ''
});

function getStatusText(postCount: number): string {
  if (postCount <= 100) return 'Newbie';
  if (postCount <= 250) return 'Farcaster';
  return 'Megacaster';
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { untrustedData: { fid } } = data;

    try {
      // Using v2 API to get user data
      const response = await client.fetchBulkUsers({ fids: [fid] });
      const user = response.users[0];
      
      if (!user) {
        throw new Error('User not found');
      }

      // Get stats from user object
      // @ts-ignore - Neynar API types are not up to date
      const postCount = user.activeStatus?.totalCasts || 0;
      const status = getStatusText(postCount);

      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Farcaster Stats</title>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.HOST_URL}/api/og?count=${postCount}&status=${status}" />
            <meta property="fc:frame:button:1" content="Refresh Stats" />
            <meta property="og:image" content="${process.env.HOST_URL}/api/og?count=${postCount}&status=${status}" />
            <meta property="og:title" content="Farcaster Stats" />
            <meta property="og:description" content="Check your Farcaster stats!" />
          </head>
          <body>
            <p>Your Farcaster Stats: ${postCount} posts (${status})</p>
          </body>
        </html>`,
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    } catch (error) {
      console.error('API Error:', error);
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Error - Farcaster Stats</title>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.HOST_URL}/api/og?count=0&status=Error" />
            <meta property="fc:frame:button:1" content="Try Again" />
          </head>
          <body>
            <p>Failed to fetch user data. Please try again.</p>
          </body>
        </html>`,
        {
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }
  } catch (error) {
    console.error('Request Error:', error);
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Error - Farcaster Stats</title>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.HOST_URL}/api/og?count=0&status=Error" />
          <meta property="fc:frame:button:1" content="Try Again" />
        </head>
        <body>
          <p>Invalid request. Please try again.</p>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }
}

export async function GET() {
  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>Farcaster Stats</title>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.HOST_URL}/api/og?count=0&status=Click to Start!" />
        <meta property="fc:frame:button:1" content="Check Your Stats" />
        <meta property="og:image" content="${process.env.HOST_URL}/api/og?count=0&status=Click to Start!" />
        <meta property="og:title" content="Farcaster Stats" />
        <meta property="og:description" content="Check your Farcaster stats!" />
      </head>
      <body>
        <p>Click the button to check your Farcaster stats!</p>
      </body>
    </html>`,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
} 