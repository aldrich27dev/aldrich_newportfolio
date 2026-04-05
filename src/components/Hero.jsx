import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [showBubble, setShowBubble] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      // 1. Skip the initial page load check
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // 2. Use localStorage for permanent memory across refreshes/sessions
      const hasShownPermanently = localStorage.getItem('dark_protest_permanent');

      // 3. Trigger only if Light Mode is activated AND never shown before
      if (!isDark && !hasShownPermanently) {
        setShowBubble(true);
        localStorage.setItem('dark_protest_permanent', 'true'); 

        const timer = setTimeout(() => {
          setShowBubble(false);
        }, 2000);

        return () => clearTimeout(timer);
      } else if (isDark) {
        setShowBubble(false);
      }
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-32 pb-4 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 relative">
      
      {/* 🚩 PERMANENT ONCE-ONLY NOTIFICATION 🚩 */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key="permanent-toast"
            initial={{ opacity: 0, y: -50, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              mass: 0.8
            }}
            className="fixed top-10 left-1/2 z-[9999] pointer-events-none"
          >
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 px-8 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center">
              <p className="text-sm font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100 flex items-center gap-3">
                <span className="text-xl">🌙</span>
                ITS BETTER WHEN ITS DARK
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Identity Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bento-card md:col-span-3 p-10 flex flex-col justify-center min-h-[400px]"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="size-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.3em]">
            System v2.0.26_Stable
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9]">
          ALDRICH NAAG <br />
          <span className="text-4xl md:text-6xl text-neutral-400 dark:text-neutral-700">Front-End Dev.</span>
        </h1>

        <p className="text-neutral-500 dark:text-neutral-400 mt-8 text-lg max-w-md leading-relaxed font-medium">
          3rd year IT student focused on high-performance systems and embedded hardware.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div 
        className="bento-card md:col-span-1 p-8 flex flex-col items-center justify-center text-center group/profile cursor-pointer relative"
      >
        <div className="size-32 rounded-full overflow-hidden relative border border-black/5 dark:border-white/10 shadow-inner bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center z-10 mb-6">
           <motion.img 
            src="public/images/aldrich.webp" 
            className="size-full object-cover absolute inset-0"
            variants={{ initial: { opacity: 1 }, hover: { opacity: 0 } }}
            initial="initial"
            whileHover="hover"
          />
          <motion.img 
            src="public/images/Gemini_Generated_Image_chfck5chfck5chfc.webp" 
            className="size-full object-cover absolute inset-0"
            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
            initial="initial"
            whileHover="hover"
          />
        </div>

        <h2 className="font-bold text-xl text-text-primary">Manila, PH</h2>
        <p className="text-neutral-500 text-sm mt-1 font-mono">14.5995° N, 120.9842° E</p>

        <div className="mt-6 px-3 py-1 border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-mono uppercase tracking-tighter rounded-full">
          Online_Now
        </div>
      </motion.div>
    </section>
  );
}