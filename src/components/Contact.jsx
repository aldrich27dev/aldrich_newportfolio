import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Terminal, Send, CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Contact() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const systemDetails = [
    { icon: <Mail size={16} />, label: 'SYSTEM_ADDRESS', value: 'hello@aldrich.dev' },
    { icon: <Phone size={16} />, label: 'NETWORK_PHONE', value: '+63 9xx xxx xxxx' },
    { icon: <MapPin size={16} />, label: 'PHYSICAL_NODE', value: 'Manila, PH // GMT+8' },
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult("INITIATING_SEQUENCE...");
    
    const formData = new FormData(event.target);
    formData.append("access_key", "068fa21e-11e8-4815-86c3-306423d7a19b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        setResult(""); // Clear result text
        setIsModalOpen(true); // Open the success modal
        event.target.reset();
      } else {
        setResult(`ERROR: ${data.message}`);
      }
    } catch (error) {
      setResult("CONNECTION_FAILED");
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="relative py-32 px-6 max-w-6xl mx-auto selection:bg-emerald-500/20 overflow-hidden min-h-[70vh] flex flex-col justify-center">
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-900 border border-emerald-500/30 p-8 max-w-sm w-full relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-emerald-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex flex-col items-center text-center gap-4">
                <CheckCircle size={48} className="text-emerald-500" />
                <h3 className="text-xl font-bold font-mono text-white">TRANSMISSION_SUCCESSFUL</h3>
                <p className="text-neutral-400 text-sm font-mono leading-relaxed">
                  The data packet has been successfully received by the network. Standing by for further commands.
                </p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 w-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 py-2 font-mono text-xs uppercase hover:bg-emerald-500 hover:text-black transition-all"
                >
                  ACKNOWLEDGE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚩 TACTICAL OVERLAY */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 border border-emerald-500/10 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 text-[8vw] font-black text-emerald-500/[0.03] select-none leading-none font-mono">
          ...
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24 relative z-10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-emerald-500" />
          <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
            Communication_Interface
          </span>
        </div>
        <h2 className="text-xl md:text-5xl font-black tracking-tighter uppercase leading-none">
          <span className="text-text-primary">CONTACT ME.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        <div className="lg:col-span-7 space-y-12">
          
          <div className="space-y-10">
            {systemDetails.map((detail, idx) => (
              <div key={idx} className="pl-6 border-l-[1px] border-neutral-800">
                <div className="flex items-center gap-2 mb-2 text-emerald-500">
                  {detail.icon}
                  <span className="text-neutral-500 text-[9px] font-mono uppercase tracking-[0.4em] font-bold">
                    {detail.label}
                  </span>
                </div>
                <p className="text-lg md:text-xl font-bold font-mono text-neutral-300">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="space-y-4 pt-8 border-t border-neutral-800">
            <input type="hidden" name="subject" value="New Portfolio Inquiry - Aldrich.dev" />
            <input type="hidden" name="from_name" value="Portfolio System" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Full Name" required className="bg-neutral-900/50 border border-neutral-800 text-white p-3 font-mono text-sm outline-none focus:border-emerald-500 transition-all" />
              <input type="email" name="email" placeholder="Email Address" required className="bg-neutral-900/50 border border-neutral-800 text-white p-3 font-mono text-sm outline-none focus:border-emerald-500 transition-all" />
            </div>
            <textarea name="message" placeholder="Write Message" required rows="4" className="w-full bg-neutral-900/50 border border-neutral-800 text-white p-3 font-mono text-sm outline-none focus:border-emerald-500 transition-all" />
            
            <button 
              type="submit" disabled={loading}
              className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all disabled:opacity-50"
            >
              {loading ? "TRANSMITTING..." : <><Send size={14} />Send</>}
            </button>
            
            {result && (
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 animate-pulse">
                {result.includes("ERROR") ? <AlertCircle size={14}/> : <CheckCircle size={14}/>}
                {result}
              </div>
            )}
          </form>
        </div>

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
                  // system_node_online_v1.0.4
                </p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}