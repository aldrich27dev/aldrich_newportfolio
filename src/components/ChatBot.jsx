import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal } from 'lucide-react';
import { SiFacebook, SiInstagram, SiGmail } from 'react-icons/si';
import { aldrichSystemPrompt } from './constants.js';

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/aldrichnaag27', icon: SiFacebook },
  { name: 'Instagram', href: 'https://www.instagram.com/aldrichruru', icon: SiInstagram },
  { name: 'Gmail', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=aldrichnaag72@gmail.com&su=Project%20Inquiry', icon: SiGmail },
];

async function requestGeminiReply(model, messages, options = {}) {
  const response = await fetch(GEMINI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      top_p: 0.8,
      max_tokens: 1000,
      ...options,
    }),
    signal: AbortSignal.timeout(20000),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error?.message || `Gemini request failed (${response.status})`);
  }

  const content = data?.choices?.[0]?.message?.content;

  if (!content || !content.trim()) {
    throw new Error('Gemini returned an empty reply');
  }

  return content.trim();
}

function renderMessageContent(content) {
  const parts = content.split(/(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g);

  return parts.map((part, index) => {
    const urlMatch = part.match(/^(https?:\/\/[^\s]+?)([.,;:!?)]*)$/);
    const emailMatch = part.match(/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})([.,;:!?)]*)$/);
    const match = urlMatch || emailMatch;

    if (!match) return part;

    const value = match[1];
    const trailing = match[2] || '';
    const isUrl = value.startsWith('http');

    return (
      <span key={index}>
        <a
          href={isUrl ? value : `mailto:${value}`}
          target={isUrl ? '_blank' : undefined}
          rel={isUrl ? 'noreferrer noopener' : undefined}
          className="font-semibold underline underline-offset-2 break-all hover:text-emerald-500"
        >
          {value}
        </a>
        {trailing}
      </span>
    );
  });
}

export default function ChatBot() {
  const greetingText = 'Hello Kuys! Aldrich to HAHAHA';
  const followUpGreetingText = 'Kumusta na?';
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsScrolled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const scrollRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const suggestions = [
    'Ano tech stack mo?',
    'Musta?',
    'Ano yung ALDRICH.OS?',
    'Marunong ka mag-ayos ng phone?',
    'Paano kita macocontact?'
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => {
      setShowHint(false);
    }, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !hasPlayedGreeting && messages.length === 0) {
      setHasPlayedGreeting(true);
      showAssistantMessage(greetingText, 1000, () => {
        showAssistantMessage(followUpGreetingText, 850);
      });
    }
  }, [followUpGreetingText, greetingText, hasPlayedGreeting, isOpen, messages.length]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const showAssistantMessage = (fullText, delay = 1200, onComplete) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
      typingTimeoutRef.current = null;
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
    }, delay);
  };

  const handleSendMessage = async (e, manualText = null) => {
    if (e) e.preventDefault();

    const userMsg = manualText || input.trim();
    if (!userMsg || isTyping) return;

    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const pastMessages = newMessages
        .filter(msg => msg.role !== 'system')
        .slice(-4);

      const conversation = [aldrichSystemPrompt, ...pastMessages];

      let botMessage;

      try {
        botMessage = await requestGeminiReply('gemini-3.6-flash', conversation, {
          reasoning_effort: 'minimal',
        });
      } catch (primaryError) {
        console.warn('Gemini 3.6 Flash unavailable, falling back to 3.5 Flash-Lite:', primaryError);
        botMessage = await requestGeminiReply('gemini-3.5-flash-lite', conversation);
      }

      showAssistantMessage(botMessage);
      return;
    } catch (error) {
      console.error('Aldrich_AI Failure:', error);

      const errorPool = {
        tech: [
          'Wait lang kuys, parang may bug sa code ko HAHAHA. check ko lang documentation.',
          'Gagii, nag-error ata yung deployment. puyat lang to lods, try mo ulit.',
          'Ay gagi nag crash yung server HAHAHA. debug ko muna saglit pre.'
        ],
        hardware: [
          'Teka lang, parang uminit yung device ko HAHAHAHA. check ko lang wiring.',
          'HAHAHAH solid ka talaga teaka parang nag-short yung lead sa pcb. wait lang pre.',
          'Di ko mabuksan yung serial monitor lods, check ko lang connection haha.'
        ],
        short: [
          'Haha wait lang pre, parang nawalan ako ng signal. Ano ulit yun?',
          'Sige lang lods, pero teka lang... nag-hang ata utak ko HAHA. Wait lang.',
          'Omsim pre! Kaso wait lang, parang nag-timeout net ko HAHA.',
          'Gagi, pati signal dito sa Caloocan tumatawa na rin HAHA. Wait lang lods.',
          'Wait lang ha, puyat is life talaga nag-error saglit haha.'
        ],
        random: [
          'Wait lang ha, mahina ata net dito sa caloocan. under development pa kasi HAHA.',
          'Teka pre, kape lang ako saglit. puyat is life talaga haha.',
          'Parang nag-timeout utak ko lods haha. ano ulit yun? try mo ulit i-send.',
          'Gagi nawalan ata ako ng signal haha. wait lang pre.',
          'Di ko ma-gets, parang sabog pa utak ko sa puyat. ano ulit yun?'
        ]
      };

      const checkInput = userMsg.toLowerCase().trim();
      let selectedCategory;

      if (
        checkInput.includes('code') ||
        checkInput.includes('react') ||
        checkInput.includes('laravel') ||
        checkInput.includes('api')
      ) {
        selectedCategory = errorPool.tech;
      } else if (
        checkInput.includes('esp32') ||
        checkInput.includes('hardware') ||
        checkInput.includes('wiring') ||
        checkInput.includes('os')
      ) {
        selectedCategory = errorPool.hardware;
      } else if (
        checkInput.length <= 5 ||
        checkInput.includes('haha') ||
        checkInput.includes('sige') ||
        checkInput.includes('okay')
      ) {
        selectedCategory = errorPool.short;
      } else {
        selectedCategory = errorPool.random;
      }

      const randomError = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];
      showAssistantMessage(randomError, 900);
      return;
    } finally {
      if (!typingTimeoutRef.current) {
        setIsTyping(false);
      }
    }
  };

  return (
    <motion.div
      animate={{
        bottom: 24,
        right: 30
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed z-[99999] flex flex-col items-end"
    >
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                delay: 3,
                duration: 0.4,
                y: {
                  repeat: Infinity,
                  duration: 2,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }
            }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.05 }}
            className="absolute -top-14 right-0 md:-right-2 whitespace-nowrap 
                       bg-card/90 backdrop-blur-md 
                       text-text-heading dark:text-text-heading 
                       px-4 py-2 rounded-2xl rounded-br-none 
                       shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]
                       border border-card-border 
                       text-[10px] md:text-[11px] font-medium z-[99999]"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              May question kuys? Chat mo 'ko! 👇
            </div>

            <div
              className="absolute -bottom-2 right-4 md:right-6 w-0 h-0 
                          border-l-[8px] border-l-transparent 
                          border-t-[8px] border-t-card/90 
                          border-r-[8px] border-r-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-[310px] md:w-[380px] h-[480px] bg-card/95 border border-card-border rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-md"
          >
            <div className="p-4 border-b border-card-border bg-bg-primary/70 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase text-text-primary/70 tracking-widest">
                  Aldrich_AI_v1.0
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-primary/50 hover:text-text-heading transition-colors">
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-[12px] scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl whitespace-pre-wrap break-words ${
                      msg.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-tr-none'
                        : 'bg-bg-primary text-text-heading rounded-tl-none border border-card-border shadow-sm'
                    }`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-bg-primary px-3 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center border border-card-border shadow-sm">
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {!isTyping && messages.length < 5 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {suggestions.map((text, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(null, text)}
                    className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full hover:bg-emerald-500 hover:text-white transition-all font-mono"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="p-4 bg-bg-primary/70 border-t border-card-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                placeholder={isTyping ? 'Aldrich is typing...' : 'Type command...'}
                className="flex-1 bg-transparent outline-none text-sm text-text-heading placeholder:text-text-primary/45 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 border-t border-card-border bg-bg-primary/70 px-4 py-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-primary/45">
                Reach me
              </span>
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    aria-label={social.name}
                    className="inline-flex items-center gap-1 rounded-full border border-card-border bg-card px-2.5 py-1 text-[10px] font-semibold text-text-primary transition-colors hover:border-emerald-500/40 hover:text-emerald-600"
                  >
                    <Icon size={12} />
                    {social.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (showHint) setShowHint(false);
        }}
        className={`size-12 md:size-14 rounded-full md:rounded-2xl flex items-center justify-center shadow-emerald-500/20 shadow-xl transition-all border ${
          isOpen ? 'bg-card text-text-heading border-card-border' : 'bg-card/95 text-text-heading border-card-border'
        }`}
      >
        {isOpen ? (
          <X size={20} />
        ) : (
          <div className="relative">
            <MessageSquare size={22} strokeWidth={2} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-neutral-900"></span>
            </span>
          </div>
        )}
      </motion.button>
    </motion.div>
  );
}