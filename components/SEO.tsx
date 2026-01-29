import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "A sophisticated, minimalist portfolio for a Graphic Designer and Artist featuring a gallery grid, editorial layout, and smooth transitions.", 
  image = "/images/share.jpg", 
  type = 'website' 
}) => {
  const siteTitle = "Marcos Morales";
  const fullTitle = title === siteTitle ? siteTitle : `${title} | ${siteTitle}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Helper to update or create meta tags
    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard & Social Meta Tags
    if (description) {
      updateMeta('description', description);
      updateMeta('og:description', description, 'property');
      updateMeta('twitter:description', description);
    }

    updateMeta('og:title', fullTitle, 'property');
    updateMeta('twitter:title', fullTitle);
    updateMeta('og:type', type, 'property');
    updateMeta('twitter:card', 'summary_large_image');

    if (image) {
       updateMeta('og:image', image, 'property');
       updateMeta('twitter:image', image);
    }

  }, [fullTitle, description, image, type]);

  return null; // This component renders nothing visually
};

export default SEO;