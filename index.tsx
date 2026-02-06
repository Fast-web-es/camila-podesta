import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CookieProvider } from './components/CookieConsent';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// We use HashRouter here because the preview environment serves the app from a dynamic subpath 
// (the long ID in your URL). HashRouter ignores that path and uses the hash (#) for navigation,
// ensuring the app renders correctly everywhere.
root.render(
  <React.StrictMode>
    <CookieProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CookieProvider>
  </React.StrictMode>
);