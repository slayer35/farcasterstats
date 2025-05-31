import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

console.log('🎨 OG Image API initialized');

export async function GET(req: NextRequest) {
  try {
    console.log('📨 OG GET request received');
    console.log('🌐 Request URL:', req.url);
    
    const searchParams = req.nextUrl.searchParams;
    const count = searchParams.get('count') || '0';
    const status = searchParams.get('status') || 'Unknown';
    const followers = searchParams.get('followers') || '0';
    const following = searchParams.get('following') || '0';

    console.log('📊 Parameters:', { count, status, followers, following });

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
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px',
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '80px',
                fontWeight: 'bold',
                color: '#F3F4F6',
              }}
            >
              {count} Posts
            </div>
            
            <div
              style={{
                display: 'flex',
                fontSize: '60px',
                color: '#9CA3AF',
              }}
            >
              {followers} Followers
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '60px',
                color: '#9CA3AF',
              }}
            >
              {following} Following
            </div>
            
            <div
              style={{
                display: 'flex',
                fontSize: '50px',
                color: '#A855F7',
                fontWeight: 'bold',
                padding: '10px 30px',
                borderRadius: '15px',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
              }}
            >
              {status}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('💥 Error:', error);
    
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
              fontSize: '48px',
              color: '#EF4444',
              fontWeight: 'bold',
            }}
          >
            Error
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
} 
