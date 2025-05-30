import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const baseUrl = process.env.HOST_URL || 'https://farcasterstats.vercel.app';
const NEYNAR_API = 'https://api.neynar.com/v2/farcaster';

async function fetchWithRetry(url: string, retries = 3, timeout = 10000) {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'api_key': 'NEYNAR_API_DOCS_KEY' // Using public docs key for testing
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        console.log('Invalid JSON response:', text);
        throw new Error('Invalid JSON response');
      }
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${i + 1} failed for ${url}:`, error);
      continue;
    }
  }
  
  throw lastError;
}

async function fetchUserStats(fid: string) {
  try {
    const response = await fetchWithRetry(`${NEYNAR_API}/user/${fid}`);
    return response;
  } catch (error) {
    console.log('Failed to fetch user stats:', error);
    throw error;
  }
}

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

    // Fetch user stats
    const response = await fetchUserStats(fid);
    console.log('User response:', response);

    if (!response?.user) {
      throw new Error('User not found');
    }

    // Get cast count from response
    const postCount = response.user.active_status?.total_casts || 0;
    console.log('Final post count:', postCount);
    
    const status = getStatusText(postCount);
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