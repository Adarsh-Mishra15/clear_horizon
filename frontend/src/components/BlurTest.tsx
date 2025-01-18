import React, { useState } from 'react';

const BLUR_LEVELS = [
  { level: 0, text: 'This is clear text with no blur' },
  { level: 0.5, text: 'This text has very slight blur' },
  { level: 1, text: 'This text has mild blur' },
  { level: 2, text: 'This text has moderate blur' },
  { level: 3, text: 'This text has significant blur' }
];

export const BlurTest: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [results, setResults] = useState<number[]>([]);
  const [testComplete, setTestComplete] = useState(false);

  const handleResponse = (canRead: boolean) => {
    if (!canRead) {
      setResults([...results, currentLevel]);
      setTestComplete(true);
    } else if (currentLevel < BLUR_LEVELS.length - 1) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setResults([...results, BLUR_LEVELS.length]);
      setTestComplete(true);
    }
  };

  const resetTest = () => {
    setCurrentLevel(0);
    setResults([]);
    setTestComplete(false);
  };

  const getBlurScore = () => {
    const lastResult = results[results.length - 1];
    if (lastResult === 0) return 'Very Sensitive to Blur';
    if (lastResult <= 1) return 'Moderately Sensitive to Blur';
    if (lastResult <= 2) return 'Average Blur Sensitivity';
    return 'Less Sensitive to Blur';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        {!testComplete ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Blur Sensitivity Test</h2>
              <p className="text-gray-600 mb-8">Can you read the text below?</p>
            </div>

            <div className="text-center mb-8">
              <p 
                className="text-xl mb-8"
                style={{ filter: `blur(${BLUR_LEVELS[currentLevel].level}px)` }}
              >
                {BLUR_LEVELS[currentLevel].text}
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleResponse(true)}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
              >
                Yes, I can read it
              </button>
              <button
                onClick={() => handleResponse(false)}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
              >
                No, too blurry
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Test Complete</h2>
            <p className="text-xl mb-6">Your Blur Sensitivity: {getBlurScore()}</p>
            <p className="mb-8 text-gray-600">
              You started having difficulty reading at blur level {results[0]}.
            </p>
            <button
              onClick={resetTest}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Take Test Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};