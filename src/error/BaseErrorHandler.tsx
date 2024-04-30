'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ErrorHandlerProps {
  error: string;
  resetErrorBoundary?: () => void;
}

const ErrorHandler = ({ error, resetErrorBoundary }: ErrorHandlerProps) => {
  const [showToast, setShowToast] = useState(false);

  // Show the toast message when the component mounts and hide it after 5 seconds
  useEffect(() => {
    setShowToast(true);
    const timeoutId = setTimeout(() => {
      setShowToast(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full box-border p-4">
      {/* Show a toast message */}
      {showToast && (
        <div className="fixed bottom-0 left-0 z-50 w-full p-4">
          <div className="bg-yellow-400 text-white rounded-lg p-4 flex items-center justify-between">
            <p>{error}</p>
            <button onClick={() => setShowToast(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Show the main error message */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <pre className="text-red-500">{error}</pre>
        <div className="flex flex-row mt-4 justify-center space-x-4">
          {/* Retry button */}
          {resetErrorBoundary && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={resetErrorBoundary}
            >
              Try again
            </button>
          )}

          {/* Go to home button */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/">Go to home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandler;
