import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const count = searchParams.get('count') || '0';
    const status = searchParams.get('status') || 'Unknown';
    const followers = searchParams.get('followers') || '0';
    const following = searchParams.get('following') || '0';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#1F2937',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '70px',
              fontWeight: 'bold',
              color: '#F3F4F6',
              marginBottom: '20px',
            }}
          >
            {count} Posts
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '40px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#9CA3AF',
                fontSize: '32px',
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#F3F4F6' }}>{followers}</div>
              <div>Followers</div>
            </div>
            
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#9CA3AF',
                fontSize: '32px',
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#F3F4F6' }}>{following}</div>
              <div>Following</div>
            </div>
          </div>
          
          <div
            style={{
              display: 'flex',
              fontSize: '40px',
              color: '#9CA3AF',
            }}
          >
            {status}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 
