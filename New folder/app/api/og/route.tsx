import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const count = searchParams.get('count') || '0';
    const status = searchParams.get('status') || 'Unknown';

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
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {count} Posts
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '50px',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#4F46E5',
              padding: '10px 30px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            {status}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await fetch(
              new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZFhjA.woff2', 'https://fonts.gstatic.com')
            ).then((res) => res.arrayBuffer()),
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating image:', error);
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
              fontSize: '50px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            Error loading stats
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
