import React, { useState } from 'react';

export const AstigmatismTest: React.FC = () => {
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [currentTest, setCurrentTest] = useState<'radiating' | 'blur' | 'shapes' | 'grid'>('radiating');
  
  const renderRadiatingLines = () => {
    const lines = [];
    for (let i = 0; i < 12; i++) {
      const rotation = i * 15;
      lines.push(
        <div
          key={i}
          className={`absolute h-48 w-0.5 origin-bottom transform transition-colors ${
            selectedLines.includes(i) ? 'bg-indigo-600' : 'bg-gray-800'
          }`}
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={() => {
            if (selectedLines.includes(i)) {
              setSelectedLines(selectedLines.filter(line => line !== i));
            } else {
              setSelectedLines([...selectedLines, i]);
            }
          }}
          role="button"
          aria-pressed={selectedLines.includes(i)}
          tabIndex={0}
        />
      );
    }
    return lines;
  };

  const renderTest = () => {
    switch (currentTest) {
      case 'radiating':
        return (
          <div className="relative h-96 w-96 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {renderRadiatingLines()}
            </div>
            <div className="absolute w-4 h-4 bg-red-500 rounded-full" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Astigmatism Test</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-md ${
              currentTest === 'radiating'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setCurrentTest('radiating')}
          >
            Radiating Lines
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTest === 'blur'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setCurrentTest('blur')}
          >
            Blur Test
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTest === 'shapes'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setCurrentTest('shapes')}
          >
            Shapes
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTest === 'grid'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setCurrentTest('grid')}
          >
            Grid
          </button>
        </div>
        
        <div className="flex justify-center items-center min-h-[400px]">
          {renderTest()}
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          {selectedLines.length > 0 && currentTest === 'radiating' && (
            <div>
              <p className="text-gray-700">
                You've identified distortions at {selectedLines.length} different angles.
                {selectedLines.length > 2
                  ? ' This may indicate astigmatism.'
                  : ' This is within normal range.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};