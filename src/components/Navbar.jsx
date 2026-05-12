import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';

const THEME_STORAGE_KEY = 'theme-preference';

export default function Navbar() {
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!isOpen) {
        return;
      }

      if (toggleRef.current?.contains(event.target)) {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    const nextTheme = theme === 'dark' ? 'dark' : 'light';

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage failures and still update the active theme.
    }

    root.classList.toggle('dark', nextTheme === 'dark');
    root.style.colorScheme = nextTheme;
    setIsDark(nextTheme === 'dark');
  };

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
<div className="font-black text-2xl tracking-tighter text-neutral-500 dark:text-neutral-300 select-none">
  AN<span className="text-emerald-500 dark:text-emerald-400 animate-pulse">.</span>
</div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.3em]">
          {navLinks.map((link) => (
            <button
              key={link.name} 
              type="button"
              onClick={() => scrollToSection(link.href)}
            className="text-neutral-500 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => applyTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90"
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-400 fill-yellow-400" />
            ) : (
              <Moon size={20} className="text-neutral-500 fill-neutral-500" />
            )}
          </button>
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=aldrichhcirdla27@gmail.com&su=Project%20Inquiry"
  target="_blank"
  rel="noopener noreferrer"
  className="hidden sm:inline-flex items-center justify-center bg-neutral-950 dark:bg-white text-white dark:text-black text-[10px] font-extrabold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-sm"
>
  LET'S TALK
</a>
          <button 
            ref={toggleRef}
            type="button"
            onClick={(event) => {
              setIsOpen((prev) => !prev);
              event.currentTarget.blur();
            }}
            className="md:hidden p-2 text-neutral-500 dark:text-neutral-300 bg-transparent focus:outline-none focus-visible:outline-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
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
            ref={menuRef}
            className="md:hidden bg-neutral dark:bg-neutral-250 border-b border-black/10 dark:border-neutral/500 overflow-hidden"
          >
            <div className="flex flex-col gap-8 p-10 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.name} 
                  type="button"
                  onClick={() => scrollToSection(link.href, true)}
                 className="w-full text-neutral-950 dark:text-white py-5 rounded-2xl font-extrabold uppercase tracking-[0.2em] text-[10px] text-center transition-all hover:scale-[1.02] active:scale-95"
                >
                  {link.name}
                </button>
              ))}
  <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=aldrichhcirdla27@gmail.com&su=Project%20Inquiry"
  target="_blank"
  rel="noopener noreferrer"
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
