import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, SendHorizontal, CornerDownLeft } from 'lucide-react';

const SystemInput = ({ label, icon, ...props }) => (
  <div className="relative flex flex-col gap-3 w-full group">
    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
      {icon || <CornerDownLeft size={10} className="opacity-50" />}
      <label className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
        {label}
      </label>
    </div>
    <div className="relative">
      <input 
        {...props}
        className="w-full bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 px-6 py-5 text-sm text-text-heading dark:text-white rounded-2xl placeholder-neutral-500 outline-none transition-all duration-300
        focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)]"
      />
    </div>
  </div>
);

export default function Contact() {
  const systemDetails = [
    { icon: <Mail size={18} />, label: 'SYSTEM_ADDRESS', value: 'hello@aldrich.dev' },
    { icon: <Phone size={18} />, label: 'NETWORK_PHONE', value: '+63 9xx xxx xxxx' },
    { icon: <MapPin size={18} />, label: 'PHYSICAL_NODE', value: 'Manila, PH // GMT+8' },
  ];

  // Animation variants for staggered entrance
  const listContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto selection:bg-emerald-500/20 overflow-hidden">
      
      {/* 1. Formal Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-30"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-emerald-500" />
          <span className="text-emerald-600 dark:text-emerald-500 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
            Communication_Interface
          </span>
        </div>
        <h2 className="text-xl md:text-5xl font-black tracking-tighter uppercase leading-none">
          <span className="text-text-primary">CONTACT ME.</span>
        </h2>
      </motion.div>

      {/* 2. Structured Layout - Added items-start to fix placement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* A. Left side: Details with Outline Text & Scroll Stagger */}
        <motion.div 
          variants={listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-5 space-y-16"
        >

          <div className="space-y-12">
            {systemDetails.map((detail, idx) => (
              <motion.div 
                key={idx} 
                variants={listItem}
                className="pl-6 hover:text-emerald-500"
              >
                <span className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest block mb-2">
                  {detail.label}
                </span>
                
                {/* Minimal Outline Text Logic */}
                <p 
                  className="text-xl md:text-xl font-mid tracking-tight cursor-default group-hover:text-text-heading dark:text-neutral-800 "
                  style={{
                    WebkitTextStroke: "1px var(--color-card-border, #d4d4d4)",
                  }}
                >
                  {detail.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* B. Right side: Formal Form with Slide-in */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SystemInput label="Sender_Name" placeholder="Enter full name" type="text" />
            <SystemInput label="Return_Address" placeholder="name@domain.com" type="email" />
            </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
               <CornerDownLeft size={10} className="rotate-90 opacity-50" />
               <label className="text-[10px] font-mono uppercase tracking-[0.3em] font-black">YOUR MESSAGE</label>
            </div>
            <textarea 
              placeholder="YOUR MESSAGE HERE..."
              className="w-full bg-black-100 dark:bg-white-900/50 border border-neutral-200 dark:border-neutral-800 px-6 py-5 text-sm text-text-heading dark:text-black rounded-[2rem] placeholder-neutral-500 min-h-[200px] outline-none transition-all duration-300
              focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] resize-none"
            />
          </div>

          <div className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-12 py-6 bg-emerald-500 text-neutral-950 rounded-2xl flex items-center justify-center gap-6 group shadow-lg shadow-emerald-500/20 font-black uppercase tracking-[0.4em] text-[10px]"
            >
              SEND
              <SendHorizontal size={18} className="transition-transform group-hover:translate-x-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}