import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

console.log('🎨 OG Image API initialized');

export async function GET(req: NextRequest) {
  try {
    console.log('📨 OG GET request received');
    console.log('🕐 Timestamp:', new Date().toISOString());
    console.log('🌐 Request URL:', req.url);
    console.log('📋 Request headers:', Object.fromEntries(req.headers.entries()));
    
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data: blob: *; connect-src 'self' *;"
    };
    
    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
      console.log('👉 Handling OPTIONS request');
      return new Response(null, { headers });
    }
    
    const searchParams = req.nextUrl.searchParams;
    console.log('🔍 Search params:', Object.fromEntries(searchParams.entries()));
    
    const count = searchParams.get('count') || '0';
    const status = searchParams.get('status') || 'Unknown';
    const followers = searchParams.get('followers') || '0';
    const following = searchParams.get('following') || '0';

    console.log('📊 Extracted parameters:');
    console.log(`📝 Count: ${count}`);
    console.log(`🏆 Status: ${status}`);
    console.log(`👥 Followers: ${followers}`);
    console.log(`➡️ Following: ${following}`);

    // Check if this is the initial state
    const isInitialState = status === 'Ready';
    console.log('🎯 Is initial state:', isInitialState);

    console.log('🎨 Starting image generation...');

    try {
      const imageResponse = new ImageResponse(
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
            {isInitialState ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#A855F7',
                    marginBottom: '30px',
                    textAlign: 'center',
                  }}
                >
                  📊 Farcaster Stats
                </div>
                
                <div
                  style={{
                    display: 'flex',
                    fontSize: '32px',
                    color: '#9CA3AF',
                    marginBottom: '40px',
                    textAlign: 'center',
                  }}
                >
                  Ready to check your posting activity?
                </div>
                
                <div
                  style={{
                    display: 'flex',
                    fontSize: '24px',
                    color: '#6B7280',
                    textAlign: 'center',
                    lineHeight: '1.4',
                  }}
                >
                  Click "Get My Stats" to see your<br/>
                  post count, followers, and status level!
                </div>
              </>
            ) : (
              <>
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
                      marginBottom: '10px',
                    }}
                  >
                    {count} Posts
                  </div>
                  
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '60px',
                      color: '#9CA3AF',
                      marginBottom: '10px',
                    }}
                  >
                    {followers} Followers
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      fontSize: '60px',
                      color: '#9CA3AF',
                      marginBottom: '10px',
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
              </>
            )}
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );

      console.log('✅ Image generated successfully');
      
      // Convert ImageResponse to array buffer
      const arrayBuffer = await imageResponse.arrayBuffer();
      console.log('📦 Image size:', arrayBuffer.byteLength, 'bytes');

      return new Response(arrayBuffer, {
        headers: {
          ...headers,
          'Content-Length': arrayBuffer.byteLength.toString()
        }
      });
    } catch (imageError) {
      console.error('🎨 Image generation error:', imageError);
      throw imageError;
    }
  } catch (error) {
    console.error('💥 Error in OG route:', error);
    console.error('📊 Error details:', (error as Error).message);
    console.error('📊 Error stack:', (error as Error).stack);
    
    const errorHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    // Return a simple fallback image response
    return new Response(
      `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1F2937"/>
        <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle">
          Error Loading Stats
        </text>
      </svg>`,
      { 
        status: 200,
        headers: errorHeaders
      }
    );
  }
} 
