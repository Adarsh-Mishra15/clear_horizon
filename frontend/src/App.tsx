import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Auth } from './components/Auth';
import { SnellenChart } from './components/SnellenChart';
import { AstigmatismTest } from './components/AstigmatismTest';
import { BlurTest } from './components/BlurTest';
import { LifestyleForm } from './components/LifestyleData';

function App() {
  const handleAuthSubmit = (data: any) => {
    console.log('Auth data:', data);
    // Handle authentication
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Eye className="h-8 w-8 text-blue-500" />
                  <span className="ml-2 text-xl font-bold">Vision Test</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                    Home
                  </Link>
                  <Link to="/snellen" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                    Snellen Test
                  </Link>
                  <Link to="/astigmatism" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                    Astigmatism Test
                  </Link>
                  <Link to="/blur" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                    Blur Test
                  </Link>
                  <Link to="/lifestyle" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                    Lifestyle Data
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Auth onSubmit={handleAuthSubmit} />} />
          <Route path="/snellen" element={<SnellenChart />} />
          <Route path="/astigmatism" element={<AstigmatismTest />} />
          <Route path="/blur" element={<BlurTest />} />
          <Route path="/lifestyle" element={<LifestyleForm />} />
         </Routes>
      </div>
    </Router>
  );
}

export default App;