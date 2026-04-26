import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const renderDelay = window.setTimeout(() => {
      setCanRender(true);
    }, 700);

    return () => window.clearTimeout(renderDelay);
  }, []);

  useEffect(() => {
    if (!canRender) {
      return undefined;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 420);
    };

    const visibilityDelay = window.setTimeout(() => {
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 250);

    return () => {
      window.clearTimeout(visibilityDelay);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [canRender]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!canRender || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          title="Scroll to top"
          initial={{ opacity: 0, x: 18, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 18, scale: 0.85 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-[100px] z-[120] flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/20 bg-card/95 text-text-heading shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors duration-300 hover:border-emerald-500/40 hover:text-emerald-500 sm:h-14 sm:w-14"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} strokeWidth={2.75} className="sm:size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
