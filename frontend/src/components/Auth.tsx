import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';  // Import axios
import { AuthFormData } from '../types';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

  const validateForm = () => {
    const newErrors: Partial<AuthFormData> = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!formData.username || formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }

      if (!formData.phoneNumber?.match(/^\+?[\d\s-]{10,}$/)) {
        newErrors.phoneNumber = 'Invalid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:4000/api/v1/users/login',  // Adjust this URL to match your backend
          {
            email: formData.email,
            password: formData.password,
          }
        );
        console.log('Login successful:', response.data);
        // Optionally store the token or proceed with the user session
        localStorage.setItem('authToken', response.data.token);
        // Handle successful login (e.g., redirect to dashboard)
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Login failed');
        } else {
          setErrorMessage('Network error, please try again');
        }
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        {errorMessage && (
          <p className="text-sm text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? 'username-error' : undefined}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600" id="username-error">{errors.username}</p>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  aria-invalid={!!errors.phoneNumber}
                  aria-describedby={errors.phoneNumber ? 'phone-error' : undefined}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600" id="phone-error">{errors.phoneNumber}</p>
                )}
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" id="email-error">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600" id="password-error">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};
