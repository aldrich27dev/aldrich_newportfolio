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
        // 🚩 Entry Animation
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: [0, 8, 0], // 🚩 Ito yung Floating Logic (baba, taas, balik)
        }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          // Transition para sa entry
          opacity: { duration: 0.4 },
          // 🚩 Transition para sa floating loop
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        
        onClick={scrollToTop}
        // 🚩 Centered and positioned below navbar
        className="fixed top-[75px] left-1/2 -translate-x-1/2 z-[9998] group flex flex-col items-center"
      >
        <div className="relative">
          {/* 🚩 The Floating Body */}
          <div className="size-10 md:size-12 bg-white/10 dark:bg-neutral-900/40 backdrop-blur-md text-emerald-500 border border-emerald-500/20 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center hover:scale-110 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
            <Icon name="ArrowUp" size={20} strokeWidth={3} />
            
            {/* Scanline effect para sa tactical vibe */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent s-full animate-scan" />
          </div>

          {/* 🚩 Shadow Glow sa ilalim para mukhang nakalutang */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-emerald-500/20 blur-sm rounded-full group-hover:w-6 transition-all" />
        </div>

        {/* Label */}
        <span className="text-[7px] font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-[0.3em] mt-3 bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-sm border border-emerald-500/20">
          SYS.UP
        </span>
      </motion.button>
    )}
  </AnimatePresence>
);
}