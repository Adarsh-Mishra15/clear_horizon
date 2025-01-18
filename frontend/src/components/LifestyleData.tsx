import React, { useState } from 'react';
import type { LifestyleData } from '../types';

export const LifestyleForm: React.FC = () => {
  const [formData, setFormData] = useState<LifestyleData>({
    screenTime: 0,
    outdoorHours: 0,
    readingPosture: 'good',
    lastUpdated: new Date()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6">Lifestyle Data Collection</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Screen Time (hours)
            </label>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={formData.screenTime}
              onChange={(e) => setFormData({
                ...formData,
                screenTime: parseFloat(e.target.value)
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Outdoor Activity (hours)
            </label>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={formData.outdoorHours}
              onChange={(e) => setFormData({
                ...formData,
                outdoorHours: parseFloat(e.target.value)
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reading/Working Posture
            </label>
            <select
              value={formData.readingPosture}
              onChange={(e) => setFormData({
                ...formData,
                readingPosture: e.target.value
              })}
              className="w-full p-2 border rounded-md"
            >
              <option value="excellent">Excellent - Perfect posture</option>
              <option value="good">Good - Minor issues</option>
              <option value="fair">Fair - Some problems</option>
              <option value="poor">Poor - Needs improvement</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Data
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds</li>
            <li>• Maintain proper posture while reading or working</li>
            <li>• Ensure adequate lighting in your workspace</li>
            <li>• Take regular breaks from screen time</li>
            <li>• Spend at least 2 hours outdoors daily for eye health</li>
          </ul>
        </div>
      </div>
    </div>
  );
};