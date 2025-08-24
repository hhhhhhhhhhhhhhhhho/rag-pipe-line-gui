import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RAG Pipeline GUI
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to the RAG Pipeline GUI application
        </p>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Vite + React + TypeScript + TailwindCSS
          </h2>
          <p className="text-gray-600 mb-6">
            This is a modern React application with TailwindCSS styling.
          </p>
          
          <div className="space-y-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full"
              onClick={() => setCount(count => count + 1)}
            >
              Count is {count}
            </button>
            
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full"
              onClick={() => setCount(0)}
            >
              Reset Count
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code>{' '}
            and save to test HMR
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
