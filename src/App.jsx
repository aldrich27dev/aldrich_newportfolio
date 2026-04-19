import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MouseGlow from './components/MouseGlow';
import ChatBot from './components/ChatBot';
import SkeletonLoader from './components/SkeletonLoader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadStartedAt = window.performance.now();
    let releaseTimerId;

    const finishLoading = () => {
      const elapsed = window.performance.now() - loadStartedAt;
      const remainingDelay = Math.max(900 - elapsed, 150);

      releaseTimerId = window.setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, remainingDelay);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      isMounted = false;
      window.clearTimeout(releaseTimerId);
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-500">
      <Navbar />
      <main className="space-y-2">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <MouseGlow />
      <ChatBot isVisible={true} />
    </div>
  );
}
