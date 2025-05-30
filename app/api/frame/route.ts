import { NextRequest, NextResponse } from 'next/server';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const baseUrl = process.env.HOST_URL || 'https://farcasterstats.vercel.app';
console.log('Base URL:', baseUrl);
console.log('Neynar API Key:', process.env.NEYNAR_API_KEY ? 'Set' : 'Not set');

// Initialize with v2 API
const client = new NeynarAPIClient({
  apiKey: process.env.NEYNAR_API_KEY || ''
});

function getStatusText(postCount: number): string {
  if (postCount <= 100) return '🌱 Newbie';
  if (postCount <= 250) return '⭐ Farcaster';
  return '🚀 Megacaster';
}

export async function POST(req: NextRequest) {
  try {
    console.log('Received POST request');
    const data = await req.json();
    console.log('Request data:', data);
    
    const { untrustedData: { fid } } = data;
    console.log('FID:', fid);

    const { users } = await client.fetchBulkUsers({ fids: [Number(fid)] });
    console.log('User data:', users[0]);
    
    const user = users[0];
    if (!user) {
      throw new Error('User not found');
    }

    // @ts-ignore - Neynar API types might be outdated
    const postCount = user?.profile?.stats?.total_casts || 0;
    const status = getStatusText(postCount);
    console.log('Post count:', postCount);
    console.log('Status:', status);

    const imageUrl = `${baseUrl}/api/og?count=${postCount}&status=${encodeURIComponent(status)}`;
    console.log('Image URL:', imageUrl);

    return new NextResponse(
      `<!DOCTYPE html><html><head><meta property="fc:frame" content="vNext"/><meta property="fc:frame:image" content="${imageUrl}"/><meta property="fc:frame:button:1" content="Refresh Stats"/><meta property="fc:frame:post_url" content="${baseUrl}/api/frame"/></head><body><p>${postCount} posts - ${status}</p></body></html>`,
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    const errorUrl = `${baseUrl}/api/og?count=0&status=Error`;

    return new NextResponse(
      `<!DOCTYPE html><html><head><meta property="fc:frame" content="vNext"/><meta property="fc:frame:image" content="${errorUrl}"/><meta property="fc:frame:button:1" content="Try Again"/><meta property="fc:frame:post_url" content="${baseUrl}/api/frame"/></head><body>Error occurred</body></html>`,
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      }
    );
  }
}

export async function GET() {
  console.log('Received GET request');
  const imageUrl = `${baseUrl}/api/og?count=0&status=Click%20to%20Start!`;
  console.log('Initial image URL:', imageUrl);

  return new NextResponse(
    `<!DOCTYPE html><html><head><meta property="fc:frame" content="vNext"/><meta property="fc:frame:image" content="${imageUrl}"/><meta property="fc:frame:button:1" content="Check Your Stats"/><meta property="fc:frame:post_url" content="${baseUrl}/api/frame"/></head><body>Click to start!</body></html>`,
    {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    }
  );
} 