import BaseErrorHandler from './BaseErrorHandler';
import ErrorBoundary from './ErrorBoundary';
import { HandleAPIError } from './ServerError';

export { BaseErrorHandler, ErrorBoundary, HandleAPIError };

// // import * as Sentry from "@sentry/browser"; // Import the Sentry client

// type ErrorLevel = 'user' | 'mild' | 'severe';

// export const handleError = (error: Error, level: ErrorLevel) => {
//   if (level === 'user') {
//     // Display error to user on frontend
//   }

//   if (level === 'user' || level === 'mild') {
//     // Log error to Sentry
//     // Sentry.captureException(error);
//   }

//   // Send error to backend (implement your API call logic here)
//   // You can include the error message, level, user info, etc.
//   // sendErrorToBackend(error, level);
// };

// // Example API call function (replace with your actual backend logic)
// const sendErrorToBackend = async (error: Error, level: ErrorLevel) => {
//   try {
//     const response = await fetch('/api/log-error', {
//       method: 'POST',
//       body: JSON.stringify({ error: error.message, level }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       console.error('Error sending error to backend');
//     }
//   } catch (err) {
//     console.error('Error sending error to backend:', err);
//   }
// };
