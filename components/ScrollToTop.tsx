import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  threshold?: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ threshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-50
        w-10 h-10 flex items-center justify-center
        bg-white dark:bg-black
        border border-slate-200 dark:border-slate-800
        text-slate-600 dark:text-slate-400
        hover:text-blue-600 dark:hover:text-blue-400
        hover:border-blue-500 dark:hover:border-blue-500
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        ${isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
    >
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  );
};

export default ScrollToTop;
