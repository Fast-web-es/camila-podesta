import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface OptimizedImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  className?: string;
  sizes?: string; 
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, sizes, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className || ''}`}>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src={src}
        alt={alt}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        // 'will-change-opacity' hints the browser to optimize compositing for this element
        className={`w-full h-full object-cover block will-change-opacity ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;