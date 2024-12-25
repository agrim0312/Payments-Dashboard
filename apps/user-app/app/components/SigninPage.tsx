"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const SignInPage = ({ SignIn }:{
    SignIn:Function
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    SignIn();
  };

  const formatPhoneNumber = (value:any) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e:any) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    if (formattedNumber.length <= 12) { // 123-456-7890
      setPhone(formattedNumber);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-[#0074DE] text-3xl font-bold">venmo</h1>
        </div>

        {/* Sign In Form */}
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-xl text-gray-800 font-medium mb-6">Log in</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Phone number"
                  className="w-full p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  required
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />
                <button
                  type="button"
                  className="text-[#0074DE] text-sm font-medium ml-2"
                  onClick={() => setPhone('')}
                >
                  Change
                </button>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none pr-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-[#0074DE] text-sm font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#0074DE] text-white rounded-full py-3 font-medium transition-colors
                ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;