import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CookieProvider } from './components/CookieConsent';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Switched to BrowserRouter for production (Vercel) to remove the '#' from URLs.
// Vercel handles the server-side routing (rewrites to index.html) automatically.
root.render(
  <React.StrictMode>
    <CookieProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookieProvider>
  </React.StrictMode>
);