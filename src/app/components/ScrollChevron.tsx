'use client';

import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function ScrollChevron({ threshold = 100 }) {
  const [showChevron, setShowChevron] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    setShowChevron(window.scrollY < threshold && !isMobile);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setShowChevron(window.scrollY < threshold && !isMobile);
      });
    };

    const handleResize = () => {
      checkIfMobile();
      setShowChevron(window.scrollY < threshold && !isMobile);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold, isMobile]);

  const handleClick = () => {
    const target = document.getElementById('skills');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!showChevron || isMobile) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 10 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      className="fixed bottom-10 sm:bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 
           text-3xl sm:text-4xl text-gray-900 z-50"
    >
      <FiChevronDown
        className="hover:text-gray-700 transition-colors cursor-pointer"
        aria-label="Scroll down indicator"
        onClick={handleClick}
      />
    </motion.div>
  );
}
