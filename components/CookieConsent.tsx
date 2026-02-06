import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONTEXT DEFINITION ---
type ConsentStatus = 'accepted' | 'declined' | null;

interface CookieContextType {
  consent: ConsentStatus;
  updateConsent: (status: 'accepted' | 'declined') => void;
  showBanner: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};

// --- PROVIDER COMPONENT ---
export const CookieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent') as ConsentStatus;
    setConsent(storedConsent);

    // If no choice has been made, show banner after delay
    if (!storedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateConsent = (status: 'accepted' | 'declined') => {
    localStorage.setItem('cookieConsent', status);
    setConsent(status);
    setIsVisible(false);
  };

  const showBanner = () => {
    setIsVisible(true);
  };

  return (
    <CookieContext.Provider value={{ consent, updateConsent, showBanner }}>
      {children}
      <CookieBanner isVisible={isVisible} onAccept={() => updateConsent('accepted')} onDecline={() => updateConsent('declined')} />
    </CookieContext.Provider>
  );
};

// --- UI COMPONENT ---
interface CookieBannerProps {
  isVisible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ isVisible, onAccept, onDecline }) => {
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
              We use cookies to enable video content and analyze site traffic. 
              According to GDPR, we cannot load third-party embeds (like Vimeo or YouTube) without your consent.
            </p>

            <div className="flex items-center gap-6 shrink-0">
              <button
                onClick={onDecline}
                className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-ink transition-colors font-sans py-2"
              >
                Decline (Essential Only)
              </button>
              <button
                onClick={onAccept}
                className="bg-ink text-paper text-[10px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-gray-800 transition-colors font-sans"
              >
                Accept All
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;