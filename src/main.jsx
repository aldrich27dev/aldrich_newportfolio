import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import MouseGlow from './components/MouseGlow.jsx'
import ChatBot from './components/ChatBot.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <Contact />
    <Footer />
    <ScrollToTop />
    <MouseGlow />
    <ChatBot />

  </StrictMode>,
)
