import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported

const LETTERS = ['E', 'F', 'P', 'T', 'O', 'Z', 'L', 'D'];
const SIZES = [72, 60, 48, 36, 24, 18, 14, 10];
const SCORES = ['20/200', '20/100', '20/70', '20/50', '20/40', '20/30', '20/25', '20/20'];

export const SnellenChart: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentLetter, setCurrentLetter] = useState('');
  const [score, setScore] = useState('');
  const [testComplete, setTestComplete] = useState(false);

  useEffect(() => {
    if (!testComplete) {
      setCurrentLetter(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
    }
  }, [currentLevel, testComplete]);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      if (currentLevel < SIZES.length - 1) {
        setCurrentLevel(prev => prev + 1);
      } else {
        setTestComplete(true);
        const score = SCORES[currentLevel];
        setScore(score);
        saveScore(score); // Save score after completion
      }
    } else {
      const score = currentLevel > 0 ? SCORES[currentLevel - 1] : SCORES[0];
      setTestComplete(true);
      setScore(score);
      saveScore(score); // Save score if incorrect
    }
  };

  const saveScore = async () => {
    const requestBody = {
      acuity_score: score,
      cylinder_power: 1, // Example values for testing
      astigmation: 1, // Example values for testing
      blurness: 0, // Example values for testing
      screen_time: 5, // Example values for testing
      outdoor_activity: 2, // Example values for testing
      reading_posture: 'Good', // Example values for testing
      reading_distance: 30, // Example values for testing
      lightning_condition: 'Good', // Example values for testing
      screen_breaks: 3, // Example values for testing
    };
  
    console.log('Sending request body:', requestBody); // Log the request body to verify
    try {
      const response = await axios.post('http://localhost:4000/api/v1/tests', requestBody);
      console.log('Score saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };
  

  const resetTest = () => {
    setCurrentLevel(0);
    setTestComplete(false);
    setScore('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        {!testComplete ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Snellen Chart Test</h2>
              <p className="text-gray-600">Identify the letter shown below</p>
            </div>
            
            <div className="flex justify-center items-center h-64">
              <p style={{ fontSize: `${SIZES[currentLevel]}px` }} className="font-mono">
                {currentLetter}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8">
              {LETTERS.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleAnswer(letter === currentLetter)}
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {letter}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Test Complete</h2>
            <p className="text-xl mb-6">Your vision score: {score}</p>
            <p className="mb-8 text-gray-600">
              {score === '20/20' 
                ? 'Congratulations! You have perfect vision!'
                : 'You may want to consult an eye care professional for a comprehensive exam.'}
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
