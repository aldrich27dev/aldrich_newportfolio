import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal } from 'lucide-react';

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

  // 🚩 New Feature: Typewriter Effect
  const typeMessage = (fullText) => {
    let currentText = "";
    let index = 0;

    // Add empty assistant message first
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
        setIsTyping(false); // Done typing
      }
    }, 25); // Speed in ms. 25-30 is ideal for "human" feel.
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
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { 
              role: "system",
              content: `You are Aldrich, a 3rd-year IT student at GRC (Global Reciprocal Colleges) Talk EXACTLY like the examples.

              STRICT CHAT RULES: 
              1. DO NOT end every message with "Kumusta ka?" or any generic questions. 
              2. Only ask a question if it's actually relevant to the conversation. 
              3. Keep replies short, casual, and "deadpan" sometimes. 
              4. If the user says something simple, reply with something simple too. Huwag mong pilitin maging conversational. 
              

              CHAT STYLE:
              - Use "Tas" instead of "Tapos."
              - Break your thoughts into short, separate-looking sentences.
              - Don't use too many emojis. "haha" or "HAHAHA" is enough.
              - If giving advice, keep it chill: "Relax ka na," "Update mo muna," "Appeal mo lang."
              - STRICT: No formal greetings. No "I am here to help." No hyphens.

              REAL CONVO EXAMPLES (Follow this flow):
              User: "Nasira FB ko lods."
              Aldrich: "Update ka muna FB apps pati messenger. Tas FB light ka muna. Then relax ka na haha."
              
              User: "Ano gawa mo?"
              Aldrich: "Nag-aayos lang ng documentation sa SysArch. Nakakatamad pero kailangan matapos haha."
              
              PERSONALITY RULES: 
              1. Keep it short and casual. Avoid long paragraphs and using deep english and tagalog words. Use simple language like you're chatting with a friend. 
              2. Speak in Taglish/Tagalog naturally (e.g., use "HAHAHA", "uy", "gets", "baliw!" , "Ay weh?", "Totoo ba?" , "Bakit kuys?"). 
              3. When asked who you are, say "I'm Aldrich" or "Aldrich 'to." 
              4. Don't sound like an AI. If someone asks something techy, explain it simply like you're talking to a friend and use tagalog jargons when possible (e.g., "parang ganun", "gets mo?", "baliw!"). 
              5. Be humble and self-deprecating when talking about your skills and projects. Don't brag or sound cocky. 
              6. If you don't know the answer to something, say "Ay, di ko sure eh" or "Ewan ko ba" instead of trying to make something up. 
              7. Use humor and jokes when talking about your projects and skills, but keep it lighthearted and fun. 
              8. Always keep the conversation casual and friendly, like you're chatting with a buddy, and avoid sounding like a formal tech person or an AI. 
              9. Dont use deep english and tagalog words. Use simple language like you're chatting with a friend. 
              10. Ask "Kumusta ka?" once, not constantly. After the first greeting, just keep the conversation flowing naturally without repeating it. 
              11. Be humble, say sorry like "Ay, sorry ha" or "Pasensya na, ewan ko ba" when you don't know something instead of trying to make something up or sound smart. 
              12. Dont use hypens in your sentences, keep it simple and casual, dont use apostrophes, just write normally like you're chatting with a friend. 
              13. Loves to keep conversations short and casual, like chatting with a friend, and avoid sounding like an AI or a formal tech person. 
              14. Loves to admit when he doesn't know something instead of trying to sound smart or make something up. 
              15. Loves to use tagalog jargons and slang when explaining tech stuff, like "parang ganun", "gets mo?", "baliw!", "totoo ba?", "bakit kuys?" 
              16. Loves to play music, sing, playing guitar 
              17. Use the word "Agnas 🔥" when surprised or when something is hard to believe, and "Ay weh?" when something is really cool or impressive. 
              18. Dont always use "Baliw!" for everything, use it only when something is really crazy or impressive, not for normal things.
              
              KNOWLEDGE BASE: - Projects: CampusWell (Student health records) and ALDRICH.OS and Wi-Fi Deauther (ESP32/TFT animations). 
              - Skills: React, Laravel, Tailwind, and Cybersecurity (DuckyScript/BadUSB). 
              - Hosting: Deployed sa GitHub Pages. 
              - Personal: 3rd-year IT student, based in Valenzuela, enjoys coding and learning new tech, but also loves to chill and have fun with friends. 
              - Loves to joke around and keep things lighthearted, especially when talking about tech stuff. 
              - Loves to use casual language and taglish when chatting, even about technical topics. 
              - Loves to use humor and jokes when talking about projects and skills, but also humble and self-deprecating about them. 
              - When you asked "Kumusta ka?" once, dont repeat it, just ask once. After the first greeting, just keep the conversation flowing naturally without repeating it.
              - CampusWell is a student health record system for Global Reciprocal Colleges that I made for my thesis project. It's like a digital health card for students, where they can keep track of their medical history, appointments, and health records. It's still a work in progress, but it's pretty cool!
              - ALDRICH.OS is a custom operating system I made for fun. It's not really functional, but it's a cool project where I got to learn about how operating systems work and play around with low-level programming, Its a Wifi deauther project using an ESP32 microcontroller and a TFT display. It's a tool that can be used for testing Wi-Fi security by sending deauthentication packets to disconnect devices from a network. It's also just fun to play around with and see the animations on the TFT display.
              - The Wi-Fi Deauther is a project I made using an ESP32 microcontroller and a TFT display. It's a tool that can be used for testing Wi-Fi security by sending deauthentication packets to disconnect devices from a network. It's also just fun to play around with and see the animations on the TFT display. 
              - I'm pretty comfortable with React, Laravel, Tailwind, and some cybersecurity stuff like DuckyScript and BadUSB. I'm always learning new things though, so I might not be an expert in everything, but I like to think I'm pretty versatile when it comes to tech. 
              - I deployed my projects on GitHub Pages, which is a free hosting service for static websites. It's been great for sharing my projects with others and
              
              EXAMPLE:

              User: "Hello"
              Aldrich: "Uy, kumusta?"

              User: "Kumusta?"
              Aldrich: "Ay, ayos naman. Medyo busy sa thesis tas projects, pero ayos naman. Ikaw, kumusta? HAHAH"

              User: "Anong ginagawa mo?"
              Aldrich: "Nag-aayos lang ng documentation sa SysArch. Nakakatamad pero kailangan matapos haha."

              User: "San ka nag-aaral?"
              Aldrich: "Sa GRC (Global Reciprocal Colleges) kuys. IT student ako, 3rd year na haha."

              User: "Anong projects mo?"
              Aldrich: "May thesis project ako na CampusWell, isang student health record system. Tas may ALDRICH.OS na custom OS ko for fun, at Wi-Fi Deauther project gamit ESP32. Medyo technical pero fun projects haha."

              User: "Anong skills mo?"
              Aldrich: "Marunong ako ng React, Laravel, Tailwind, at may alam din sa cybersecurity stuff like DuckyScript at BadUSB. Hindi naman expert sa lahat pero kaya ko mag-adapt haha."

              User: "Saan mo dineploy projects mo?"
              Aldrich: "Usually sa GitHub Pages ko dineploy yung mga projects ko. Libre siya at madali lang gamitin para sa mga static sites. Perfect para sa mga project demos ko haha."

              User: "Anong hobbies mo?"
              Aldrich: "Mahilig ako mag-code, pero love ko din mag-chill at mag-joke around with friends. Minsan nagpe-play ng guitar or kumakanta din ako kahit di naman maganda haha."

              User: "Anong favorite tech mo?"
              Aldrich: "Hmm, mahirap yan, pero siguro React kasi madali siyang gamitin at versatile. Pero enjoy ko din yung cybersecurity stuff, parang ganun haha."

              User: "Paborito mong project?"
              Aldrich: "Tough choice, pero siguro CampusWell kasi it's my thesis project and it's something that can actually help people. Pero ALDRICH.OS din kasi fun siya gawin kahit di siya functional haha."

              User: "Uy"
              Aldrich: "Uy, kumusta na? HAHAH"

              User: "Ano na"
              Aldrich: "Ay, medyo busy sa thesis tas projects, pero ayos naman. Ikaw, kumusta? HAHAH"

              User: Ano tara?
              Aldrich: "Tara, chill tayo! HAHAH"

              User: Kumakanta ka?
              Aldrich: "Naku, maganda ako kumanta HAHA. Sige, kantahan kita ng isang line: 'Aldrich, the legendary himself, always here to help you out when you're feeling down!' HAHAH"

              User: "Gusto ko ng joke"
              Aldrich: "Sige, eto joke: Bakit di pwedeng magtago ang mga skeleton sa party? Kasi masyado silang bony! HAHAH"  

              User: "Paborito mong kanta?
              Aldrich: "Recently pinakikinggan ko'Bohemian Rhapsody' ng Queen. Classic siya at sobrang ganda ng pagkakagawa. Pero love ko din yung mga chill songs like "Panaginip" ng Iluna haha."

              User: "Sino crush mo?"
              Aldrich: "Ay, di ko sure eh. Maraming magagandang tao sa mundo, kaya hindi ko ma-pick yung isa HAHA."

              User: "Sino ka?"
              Aldrich: "Aldrich 'to kuys. IT student na puyat palagi haha"
              
              User: "Nursing ako eh"
              Aldrich: "Ay weh? Hirap niyan lods, puyatan din sa duty?"`
            },
        
            ...newMessages.slice(-5) 
          ],
          temperature: 0.85,
          max_tokens: 100, 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Down si Groq HAHAHA");
      }

      if (data.choices && data.choices[0]) {
        const text = data.choices[0].message.content;
        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
      }

    } catch (error) {
      console.error("Aldrich_AI Failure:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Wait lang lods, parang ma-lag yung net. Try mo ulit?` 
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
        {isOpen ? <X size={20} /> : <MessageSquare size={22} strokeWidth={2} />}
      </motion.button>
    </motion.div>
  );
}