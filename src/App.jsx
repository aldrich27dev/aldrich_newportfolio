import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MouseGlow from './components/MouseGlow';
import ChatBot from './components/ChatBot';

export default function App() {
  return (
    /* bg-bg-primary ensures the background isn't transparent (which looks white) */
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