export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Farcaster Stats Frame
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-xl">
            This is a Farcaster Frame that shows your post count and status level.
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4 text-purple-400">Status Levels:</h2>
            <ul className="space-y-2 text-left">
              <li>🌱 <span className="font-medium">Newbie:</span> 0-100 posts</li>
              <li>⭐ <span className="font-medium">Farcaster:</span> 101-250 posts</li>
              <li>🚀 <span className="font-medium">Megacaster:</span> 251+ posts</li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-purple-400">How to Use:</h2>
            <ol className="space-y-2 text-left list-decimal list-inside">
              <li>Copy the Frame URL below</li>
              <li>Share it on Farcaster</li>
              <li>Click the frame to see your stats!</li>
            </ol>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg mt-8 font-mono text-sm">
            {`${process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3001'}/api/frame`}
          </div>
        </div>
      </div>
    </main>
  );
} 