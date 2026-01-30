import SEO from '../components/SEO';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // --- CONFIGURACIÓN ---
    // Usamos FormSubmit.co que no requiere registro.
    // IMPORTANTE: La primera vez que envíes un mensaje desde la web, 
    // recibirás un email de FormSubmit pidiendo confirmar tu dirección. 
    // Después de confirmar, funcionará automáticamente.
    const ENDPOINT = "https://formsubmit.co/ajax/hello@marcos-morales.com";

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          _subject: "New Message from Portfolio", // Asunto del correo
          _template: "table", // Formato visual del correo
          _captcha: "false"   // Desactivar captcha visual si se desea
        })
      });

      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-10 max-w-5xl mx-auto"
    >
      <SEO 
        title="Contact" 
        description="Get in touch with Marcos Morales for design projects, collaborations, or inquiries." 
      />
      <div className="mb-20">
        <h2 className="text-sm font-sans uppercase tracking-widest text-gray-400 mb-6">
          Get in touch
        </h2>
        <a 
          href="mailto:hello@marcos-morales.com" 
          className="text-4xl md:text-6xl lg:text-7xl font-serif hover:italic transition-all duration-300 break-words leading-none"
        >
          hello@marcos-morales.com
        </a>
        <p className="mt-8 text-xl font-serif italic text-gray-500">
           @marcosmoralesdg
        </p>
      </div>

      <div className="border-t border-gray-300 pt-16 relative">
        <p className="text-sm font-sans uppercase tracking-widest text-gray-400 mb-12">
          Or send a message directly
        </p>
        
        <AnimatePresence mode="wait">
          {formStatus === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-100 p-8 text-center max-w-2xl"
            >
              <h3 className="font-serif text-2xl text-ink mb-2">Message Sent</h3>
              <p className="font-sans text-gray-500 text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
              <button 
                onClick={() => setFormStatus('idle')}
                className="mt-6 text-xs uppercase tracking-widest underline underline-offset-4 decoration-gray-400 hover:text-ink transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12 max-w-2xl"
              onSubmit={handleSubmit}
            >
              {/* Campos ocultos de configuración para FormSubmit */}
              <input type="hidden" name="_honey" style={{display: 'none'}} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group">
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest mb-2 text-gray-500">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest mb-2 text-gray-500">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg"
                  />
                </div>
              </div>
              
              <div className="group">
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-2 text-gray-500">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-ink transition-colors font-serif text-lg resize-none"
                  ></textarea>
              </div>

              <div className="flex items-center gap-6">
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="bg-ink text-paper px-10 py-4 font-sans uppercase tracking-[0.2em] text-xs hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Submit Message'}
                </button>
                
                {formStatus === 'error' && (
                  <p className="text-red-500 text-xs font-sans tracking-wide">
                    Something went wrong. Please try again later.
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Contact;