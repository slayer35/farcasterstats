import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const count = searchParams.get('count') || '0';
  const status = searchParams.get('status') || 'Unknown';

  const svg = `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="400" fill="#1F2937"/>
      <text x="400" y="180" font-family="Arial" font-size="60" font-weight="bold" fill="white" text-anchor="middle">${count} Posts</text>
      <rect x="250" y="220" width="300" height="60" rx="8" fill="#4F46E5"/>
      <text x="400" y="262" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">${status}</text>
    </svg>
  `;

  const svgBuffer = Buffer.from(svg);

  return new Response(svgBuffer, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    },
  });
} 
