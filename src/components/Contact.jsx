import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CornerDownLeft, Activity, Terminal } from 'lucide-react';

export default function Contact() {
  const systemDetails = [
    { icon: <Mail size={16} />, label: 'SYSTEM_ADDRESS', value: 'hello@aldrich.dev' },
    { icon: <Phone size={16} />, label: 'NETWORK_PHONE', value: '+63 9xx xxx xxxx' },
    { icon: <MapPin size={16} />, label: 'PHYSICAL_NODE', value: 'Manila, PH // GMT+8' },
  ];

  return (
    <section id="contact" className="relative py-32 px-6 max-w-6xl mx-auto selection:bg-emerald-500/20 overflow-hidden min-h-[70vh] flex flex-col justify-center">
      
      {/* 🚩 TACTICAL OVERLAY ELEMENTS */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {/* Decorative Grid Hint */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-emerald-500/10 rounded-full animate-pulse" />
        
        {/* Node Identifier */}
        <div className="absolute bottom-20 right-10 text-[8vw] font-black text-emerald-500/[0.03] select-none leading-none font-mono">
          ...
        </div>

        {/* UI Crosshairs */}
        <div className="absolute top-24 left-8 w-12 h-12 border-l-[1px] border-t-[1px] border-emerald-500/30" />
        <div className="absolute bottom-24 right-8 w-12 h-12 border-r-[1px] border-b-[1px] border-emerald-500/30" />
      </div>

      {/* 1. Formal Header - UNTOUCHED */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24 relative z-10"
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

      {/* 2. Structured Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* A. System Nodes (Details) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-10"
        >
          {systemDetails.map((detail, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="pl-6 border-l-[1px] border-neutral-800 hover:border-emerald-500/50 transition-all duration-500 group relative"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-500/50 group-hover:text-emerald-500 transition-colors">
                  <Activity size={10} className={idx === 0 ? "animate-pulse" : ""} />
                </span>
                <span className="text-neutral-500 text-[9px] font-mono uppercase tracking-[0.4em] font-bold">
                  {detail.label}
                </span>
              </div>
              
              <p 
                className="text-lg md:text-2xl font-bold tracking-tight text-neutral-400 dark:text-neutral-700 group-hover:text-neutral-900 dark:group-hover:text-emerald-400 transition-all duration-300 font-mono"
              >
                {detail.value}
              </p>

              {/* Decorative Byte Info */}
              <div className="mt-1 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[7px] font-mono text-emerald-500/40 tracking-[0.2em]">0x00{idx + 1}7F_READY</span>
                <div className="h-[1px] w-8 bg-emerald-500/20" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* B. Sidebar Stats (Right Side) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between self-stretch py-2 pl-12 border-l border-emerald-500/5">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-emerald-500" />
                <span className="text-[10px] font-mono text-emerald-500 tracking-[0.2em] font-bold">LIVE_STATUS</span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-mono text-neutral-600">
                    <span>SIGNAL_STRENGTH</span>
                    <span>98%</span>
                  </div>
                  <div className="h-[2px] w-full bg-neutral-900 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "98%" }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-emerald-500/40" 
                    />
                  </div>
                </div>

                <p className="text-[9px] font-mono text-neutral-500 leading-relaxed uppercase tracking-tighter italic">
                  // listening_for_incoming_packets... <br />
                  // rsa_encryption_active... <br />
                  // valenzuela_node_online_v1.0.4
                </p>
              </div>
           </div>

           <div className="pt-8 border-t border-emerald-500/5">
              <span className="text-[8px] font-mono text-neutral-800 tracking-widest uppercase">Unauthorized access is prohibited.</span>
           </div>
        </div>

      </div>
    </section>
  );
}