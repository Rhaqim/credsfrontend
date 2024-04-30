'use client';

import React, { useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ fallback, children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Event listener to handle global errors
    const handleGlobalError = (error: ErrorEvent) => {
      // You can log the error to an error reporting service here
      console.error(error.error);
      setHasError(true);
    };

    // Add the event listener
    window.addEventListener('error', handleGlobalError);

    // Clean up by removing the event listener
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  // If there's an error, display the fallback component
  if (hasError) {
    return <>{fallback}</>;
  }

  // If no error, render the children
  return <>{children}</>;
};

export default ErrorBoundary;
