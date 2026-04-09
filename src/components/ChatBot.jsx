import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal } from 'lucide-react';
import { aldrichSystemPrompt } from './constants.js';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello Kuys! Aldrich to HAHAH' }
  ]);
  const scrollRef = useRef(null);
  const [showHint, setShowHint] = useState(true);

  // 🚩 Suggestion Questions
  const suggestions = [
    "Ano tech stack mo?",
    "Musta CampusWell?",
    "Ano yung ALDRICH.OS?",
    "Marunong ka mag-ayos ng phone?"
  ];
  


useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    
    // 🚩 Auto-hide Hint Bubble after 5 seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

 
  const typeMessage = (fullText) => {
    let currentText = "";
    let index = 0;


    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = currentText;
          return updated;
        });
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false); 
      }
    }, 25); 
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
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;


    const pastMessages = newMessages
      .filter(msg => msg.role !== 'system')
      .slice(-6); 

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          aldrichSystemPrompt, 
          ...pastMessages,    
        ],
        temperature: 0.7,
        top_p: 0.8,
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Down si Groq HAHAHA");
    }

    if (data.choices?.[0]?.message?.content) {
      const text = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    }

  } catch (error) {
    console.error("Aldrich_AI Failure:", error);

    const errorPool = {
      tech: [
        "Wait lang kuys, parang may bug sa code ko HAHAHA. check ko lang documentation.",
        "Gagii, nag-error ata yung deployment. puyat lang to lods, try mo ulit.",
        "Ay gagi nag crash yung server HAHAHA. debug ko muna saglit pre."
      ],
      hardware: [
        "Teka lang, parang uminit yung device ko HAHAHAHA. check ko lang wiring.",
        "HAHAHAH solid ka talaga🔥teka parang nag-short yung lead sa pcb. wait lang pre.",
        "Di ko mabuksan yung serial monitor lods, check ko lang connection haha."
      ],
      short: [
        "Haha wait lang pre, parang nawalan ako ng signal. Ano ulit yun?",
        "Sige lang lods, pero teka lang... nag-hang ata utak ko HAHA. Wait lang.",
        "Omsim pre! Kaso wait lang, parang nag-timeout net ko HAHA.",
        "Gagi, pati signal dito sa Caloocan tumatawa na rin HAHA. Wait lang lods.",
        "Wait lang ha, puyat is life talaga—nag-error saglit haha."
      ],
      random: [
        "Wait lang ha, mahina ata net dito sa caloocan. under development pa kasi HAHA.",
        "Teka pre, kape lang ako saglit. puyat is life talaga haha.",
        "Parang nag-timeout utak ko lods haha. ano ulit yun? try mo ulit i-send.",
        "Gagi nawalan ata ako ng signal haha. wait lang pre.",
        "Di ko ma-gets, parang sabog pa utak ko sa puyat. ano ulit yun?"
      ]
    };


    const checkInput = userMsg.toLowerCase().trim();
    let selectedCategory;

    if (checkInput.includes("code") || checkInput.includes("react") || checkInput.includes("laravel") || checkInput.includes("api")) {
      selectedCategory = errorPool.tech;
    } else if (checkInput.includes("esp32") || checkInput.includes("hardware") || checkInput.includes("wiring") || checkInput.includes("os")) {
      selectedCategory = errorPool.hardware;
    } 
    else if (checkInput.length <= 5 || checkInput.includes("haha") || checkInput.includes("sige") || checkInput.includes("okay")) {
      selectedCategory = errorPool.short;
    } 
    else {
      selectedCategory = errorPool.random;
    }

    const randomError = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];

    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: randomError 
    }]);

  } finally {
    setIsTyping(false);
  }
};

 return (
    <motion.div
      animate={{ 
        bottom: 24, 
        right: 30 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }
            }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.05 }} 
            className="absolute -top-14 right-0 md:-right-2 whitespace-nowrap 
                       bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md 
                       text-neutral-900 dark:text-white 
                       px-4 py-2 rounded-2xl rounded-br-none 
                       shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]
                       border border-neutral-200/50 dark:border-white/10 
                       font-mono text-[10px] md:text-[11px] font-medium z-[99999]"
          >
            <div className="flex items-center gap-2">
              
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              May question kuys? Chat mo 'ko! 👇
            </div>

            <div className="absolute -bottom-2 right-4 md:right-6 w-0 h-0 
                          border-l-[8px] border-l-transparent 
                          border-t-[8px] border-t-white/90 dark:border-t-neutral-900/90 
                          border-r-[8px] border-r-transparent">
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-[310px] md:w-[380px] h-[480px] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-emerald-500" />
                <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 tracking-widest">Aldrich_AI_v1.0</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[12px] scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-emerald-500 text-white rounded-tr-none' 
                      : 'bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 rounded-tl-none border border-transparent dark:border-white/5 shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && messages[messages.length-1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 dark:bg-white/5 px-3 py-2 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestion Chips */}
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

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 bg-neutral-50 dark:bg-white/5 border-t border-neutral-100 dark:border-white/5 flex gap-2">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                disabled={isTyping}
                placeholder={isTyping ? "Aldrich is typing..." : "Type command..."} 
                className="flex-1 bg-transparent outline-none text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 disabled:opacity-50" 
              />
              <button 
                type="submit" 
                disabled={isTyping || !input.trim()}
                className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
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
          isOpen ? 'bg-neutral-900 text-white border-transparent' : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border-neutral-200 dark:border-white/10'
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