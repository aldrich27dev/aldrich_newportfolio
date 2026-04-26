import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profilePic from '/images/aldrich.webp';
import hoverPic from '/images/Gemini_Generated_Image_chfck5chfck5chfc.webp';

const TITLES = ["Full-Stack Dev.", "AI & Cloud Dev.", "Systems Dev."];

export default function Hero() {
  const [showBubble, setShowBubble] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const isFirstRender = useRef(true);

  // --- Title Cycling Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // --- Theme Observer ---
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      const hasShownPermanently = localStorage.getItem('dark_protest_permanent');
      if (!isDark && !hasShownPermanently) {
        setShowBubble(true);
        localStorage.setItem('dark_protest_permanent', 'true');
        const timer = setTimeout(() => setShowBubble(false), 2000);
        return () => clearTimeout(timer);
      } else if (isDark) {
        setShowBubble(false);
      }
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // --- Greeting Logic ---
  useEffect(() => {
    const hasBeenGreeted = sessionStorage.getItem('has_been_greeted');
    if (!hasBeenGreeted) {
      const hour = new Date().getHours();
      let text = '';
      if (hour < 12) text = 'Good Morning! ☀️';
      else if (hour < 18) text = 'Good Afternoon! ☕';
      else text = 'Good Evening! 🌙';

      setGreeting(text);
      setIsVisible(true);
      sessionStorage.setItem('has_been_greeted', 'true');
      const hideTimer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(hideTimer);
    }
  }, []);

  const activeBubbleText = isProfileHovered ? "NO! NO! NO! 😠" : greeting;

  return (
    <section className="pt-32 pb-4 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 relative">
      
      {/* Dark Mode Protest Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key="permanent-toast"
            initial={{ opacity: 0, y: -50, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
            className="fixed top-10 left-1/2 z-[9999] pointer-events-none"
          >
            <div className="group relative bg-neutral-950 border border-neutral-800 px-6 py-3 flex items-center gap-4 transition-all hover:border-emerald-500/50">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-500 font-bold">
                ITS BETTER WHEN ITS DARK
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bento-card md:col-span-3 p-10 flex flex-col justify-center min-h-[400px]"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="size-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-neutral-500 text-[10px] uppercase tracking-[0.3em]">
            System v2.0.26_Stable
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-800">
          ALDRICH NAAG <br />
          <div className="relative h-[60px] md:h-[80px] overflow-hidden mt-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={TITLES[titleIndex]}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute left-0 text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 via-neutral-500 to-neutral-700 dark:from-neutral-100 dark:via-neutral-400 dark:to-neutral-600"
              >
                {TITLES[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>
        <p className="text-lg md:text-xl text-neutral-500 max-w-lg leading-relaxed">
    <span className="text-neutral-500 font-medium text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-700">focused on high-performance systems and embedded hardware.</span> 
  </p>

        {/* <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-2lg max-w-md leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 via-neutral-500 to-neutral-700">
          3rd year IT student focused on high-performance systems and embedded hardware.
        </p> */}
      </motion.div>

      {/* Profile Sidebar */}
      <motion.div className="bento-card md:col-span-1 p-8 flex flex-col items-center justify-center text-center group/profile cursor-pointer relative">
        <div 
          className="relative group/profile cursor-pointer mb-6"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          <AnimatePresence>
            {(isVisible || isProfileHovered) && (
              <motion.div
                key="speech-bubble"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute -top-12 -right-8 z-20"
              >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 px-4 py-2 rounded-2xl rounded-bl-none shadow-xl relative">
                  <p className={`text-[11px] font-bold tracking-tight whitespace-nowrap transition-colors duration-300 ${isProfileHovered ? 'text-red-500 animate-bounce' : 'text-neutral-800 dark:text-neutral-100'}`}>
                    {activeBubbleText}
                  </p>
                  <div className="absolute -bottom-2 left-0 w-4 h-4 bg-white dark:bg-neutral-900 border-b border-l border-neutral-200 dark:border-white/10 -rotate-45" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="size-32 rounded-full overflow-hidden relative border border-black/5 dark:border-white/10 shadow-inner bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center z-10">
            <motion.img 
              src={profilePic}
              className="size-full object-cover absolute inset-0"
              variants={{ initial: { opacity: 1 }, hover: { opacity: 0 } }}
              initial="initial"
              whileHover="hover"
            />
            <motion.img 
              src={hoverPic}
              className="size-full object-cover absolute inset-0"
              variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
              initial="initial"
              whileHover="hover"
            />
          </div>
        </div>

        <h2 className="font-bold text-xl text-text-primary">Manila, PH</h2>
        <p className="text-neutral-500 text-sm mt-1">14.5995° N, 120.9842° E</p>

        <div className="mt-6 px-3 py-1 border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] uppercase tracking-tighter rounded-full">
          Online_Now
        </div>
      </motion.div>
    </section>
  );
}
