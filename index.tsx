import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// IMPORTANT: 
// We use HashRouter here to prevent routing errors in the preview environment.
// WHEN DEPLOYING TO VERCEL: Change 'HashRouter' to 'BrowserRouter' below to get clean URLs (SEO friendly).
const Router = HashRouter; 

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);