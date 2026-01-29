import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string; // Helpful for browser to pick right size
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, sizes, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      {/* 
         Blur placeholder logic could go here, but for now just a nice background color 
         prevents the "collapse" effect.
      */}
      
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src={src}
        alt={alt}
        sizes={sizes}
        loading="lazy"     // CRITICAL: Only download when visible
        decoding="async"   // CRITICAL: Don't freeze main thread while decoding
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover block ${className}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;