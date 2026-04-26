import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : true
  );
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const scrollToSection = (href, closeMenu = false) => {
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);

    if (closeMenu) {
      setIsOpen(false);
    }

    if (!target) {
      window.location.hash = href;
      return;
    }

    window.history.replaceState(null, '', href);
    window.setTimeout(() => {
      const headerOffset = 96;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }, closeMenu ? 180 : 0);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        scrolled || isOpen 
          ? 'py-4 text-white bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-lg' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
    
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo */}
<div className="font-black text-2xl tracking-tighter text-neutral-500 dark:text-neutral-500 select-none">
  AN<span className="text-emerald-500 dark:text-emerald-400 animate-pulse">.</span>
</div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-500">
          {navLinks.map((link) => (
            <button
              key={link.name} 
              type="button"
              onClick={() => scrollToSection(link.href)}
              className="hover:text-black dark:hover:text-emerald-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90"
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-400 fill-yellow-400" />
            ) : (
              <Moon size={20} className="text-neutral-500 fill-neutral-500" />
            )}
          </button>

          <a
            href="mailto:aldrichhcirdla27@gmail.com"
            className="hidden sm:inline-flex items-center justify-center bg-neutral-950 dark:bg-white text-white dark:text-black text-[10px] font-extrabold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-sm"
          >
            LET'S TALK
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-550 dark:text-neutral-500"
          >
            {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence> 
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral dark:bg-neutral-250 border-b border-black/10 dark:border-neutral/500 overflow-hidden"
          >
            <div className="flex flex-col gap-8 p-10 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.name} 
                  type="button"
                  onClick={() => scrollToSection(link.href, true)}
                 className="w-full text-white py-5 rounded-2xl font-extrabold uppercase tracking-[0.2em] text-[10px] text-center transition-all hover:scale-[1.02] active:scale-95"
                >
                  {link.name}
                </button>
              ))}
              <a
                href="mailto:aldrichhcirdla27@gmail.com"
                onClick={() => setIsOpen(false)}
                className="w-full bg-neutral-950 dark:bg-white text-white dark:text-black py-5 rounded-2xl font-extrabold uppercase tracking-[0.2em] text-[10px] text-center transition-all hover:scale-[1.02] active:scale-95"
              >
                LET'S TALK
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
