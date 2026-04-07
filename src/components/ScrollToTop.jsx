import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const Icon = ({ name }) => {
    const LucideIcon = LucideIcons[name] || LucideIcons.ArrowUp;
    return <LucideIcon size={20} />;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Increased threshold to 400px so it doesn't show too early
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      if (scrolled > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          // Entry Animation: Slides up from the bottom and fades in
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-[9999] group flex flex-col items-center gap-2"
        >
          {/* Tactical OS Label */}
          <span className="text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-[0.2em] mb-1">
            // GO UP!
          </span>

          <div className="size-14 bg-text-primary text-bg-primary border border-card-border rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer overflow-hidden relative">
            <Icon name="ArrowUp" />
            
            {/* Emerald "Active" indicator to match your terminal vibe */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}