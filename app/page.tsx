"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Farcaster Stats Frame
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-xl">
            This is a Farcaster Frame that shows your post count and status level.
          </p>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-3 text-blue-400">ℹ️ Interactive Frame</h2>
            <div className="text-left space-y-2">
              <p>
                This is a <strong>Farcaster Frame</strong> with interactive functionality. Users can click the button to see their stats.
              </p>
              <p className="text-sm text-blue-300">
                The frame automatically detects user FID and shows personalized data.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4 text-purple-400">Frame Preview:</h2>
            <div className="border-2 border-gray-600 rounded-lg overflow-hidden">
              <img 
                src="/api/og?count=0&status=Ready&followers=0&following=0" 
                alt="Frame Preview" 
                className="w-full max-w-md mx-auto"
              />
              <div className="bg-gray-700 p-3 text-center">
                <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-medium">
                  🎯 Get My Stats11
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  ↑ This button works in Farcaster
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4 text-purple-400">Status Levels:</h2>
            <ul className="space-y-2 text-left">
              <li>🌱 <span className="font-medium">Newbie:</span> 0-100 posts</li>
              <li>⭐ <span className="font-medium">Farcaster:</span> 101-250 posts</li>
              <li>🚀 <span className="font-medium">Megacaster:</span> 251+ posts</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mt-8">
            <h3 className="text-purple-400 font-semibold mb-2">Frame URL:</h3>
            <div className="font-mono text-sm break-all bg-gray-900 p-3 rounded border-2 border-purple-500">
              {`https://farcasterstats.vercel.app/api/frame`}
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('https://farcasterstats.vercel.app/api/frame');
                alert('Frame URL copied! Share it in a Farcaster cast.');
              }}
              className="mt-3 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-medium"
            >
              📋 Copy Frame URL
            </button>
            <p className="text-xs text-purple-400 mt-2">
              Share this URL in Farcaster to show the interactive frame.
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-3 text-green-400">✅ How to Use:</h2>
            <ol className="space-y-3 text-left list-decimal list-inside">
              <li><strong>Copy</strong> the frame URL above</li>
              <li><strong>Go to Farcaster</strong> and create a new cast</li>
              <li><strong>Paste the URL</strong> in your cast</li>
              <li><strong>Post it</strong> - the frame will appear</li>
              <li><strong>Users can click</strong> "🎯 Get My Stats" to see their data</li>
            </ol>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-3 text-yellow-400">💡 What Happens:</h2>
            <ul className="space-y-2 text-left text-sm">
              <li>• Frame detects user's Farcaster ID automatically</li>
              <li>• Fetches real post count, followers, and following data</li>
              <li>• Shows personalized stats with status level</li>
              <li>• Each user sees their own unique data</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 