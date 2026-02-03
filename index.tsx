
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Initialize the root element and render the main App component.
// This fix addresses the "Cannot find name 'root'" error by correctly using the React 18 createRoot API.
const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Could not find the root element to mount the application.");
}
