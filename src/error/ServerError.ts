import './ErrorNotification.css';

export enum ErrorDesignation {
  USER,
  API,
  NETWORK,
  UNKNOWN,
}

export function ErrorHandler( message: string, designation: ErrorDesignation) {
  switch (designation) {
    case ErrorDesignation.USER:
      return HandleUserError(message);
    case ErrorDesignation.API:
      return HandleAPIError(message);
    case ErrorDesignation.NETWORK:
      return HandleNetworkError(message);
    default:
      return HandleUserError('An unknown error occurred');
  }
}

/**
 * Displays an API error message on the page.
 * @param message The error message to display.
 */
function HandleUserError(message: string) {
  // Create the error container div element
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-container';

  // Create the error message div element
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.innerText = message;

  // Create the progress bar div element
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';

  // Append elements to the error container
  errorContainer.appendChild(errorMessage);
  errorContainer.appendChild(progressBar);

  // Append the error container div element to the body
  document.body.appendChild(errorContainer);

  // Hide the error container after 5 seconds
  setTimeout(() => {
    errorContainer.style.display = 'none';
  }, 5000);
}

export function HandleAPIError(message: string) {
  // Alert Developer
  console.error(message);
}

function HandleNetworkError(message: string) {
  // Alert Developer
  console.error(message);
}