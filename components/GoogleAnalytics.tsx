import React, { useEffect } from 'react';
import { useCookieConsent } from './CookieConsent';

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // 🔴 REPLACE THIS WITH YOUR ACTUAL ID FROM GOOGLE ANALYTICS

const GoogleAnalytics: React.FC = () => {
  const { consent } = useCookieConsent();

  useEffect(() => {
    // Only load GA if consent is strictly 'accepted'
    if (consent === 'accepted') {
      
      // 1. Load the main script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      // 2. Initialize the dataLayer
      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', { 'anonymize_ip': true });
      `;
      document.head.appendChild(inlineScript);

      // Cleanup not typically needed for GA as it persists, 
      // but conceptually we only inject.
    }
  }, [consent]);

  return null; // This component renders nothing visually
};

export default GoogleAnalytics;