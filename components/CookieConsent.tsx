import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to allow enter animations of the page to finish first
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 w-full z-[60] bg-paper border-t border-gray-300 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <p className="text-xs font-sans text-gray-500 text-center md:text-left leading-relaxed max-w-2xl">
              By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.
            </p>

            <div className="flex items-center gap-6 shrink-0">
              <button
                onClick={handleDecline}
                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-ink transition-colors font-sans py-2"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="bg-ink text-paper text-[10px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-gray-800 transition-colors font-sans"
              >
                Accept
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;