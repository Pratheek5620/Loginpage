"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Link from 'next/link';

// Interface for error messages
interface ErrorData {
  message?: string;
}

const LoginImage = '/human_driving.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorData>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError({}); // Reset error

    try {
      const response = await axios.post(
        'https://65ddaf09dccfcd562f5525b5.mockapi.io/api/v1/Login',
        { email, password }
      );

      // Handle successful login
      console.log('Login successful:', response.data);
    } catch (error: any) {
      let errorMessage = 'Login failed.';

      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Your UI code */}
        <div className="flex w-full">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Email */}
            <div className="flex flex-col mb-3">
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                  placeholder="E-Mail Address"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col mb-6">
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex w-full">
              <button
                disabled={loading}
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 md:uppercase">
                  {loading ? "Processing...." : "Login"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
