import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Monitor, Database, Code2, GraduationCap } from 'lucide-react';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';

export default function About() {
  const targetRef = useRef(null);
  const constraintsRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Passive scroll effect: moves based on page position
  const xScroll = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const getSiIcon = (name, colorClass) => {
    const Icon = SiIcons[name];
    return Icon ? <Icon className={`${colorClass} text-[20px] md:text-[24px]`} /> : <Code2 size={20} />;
  };

  const stack = [
    { name: "React", icon: getSiIcon("SiReact", "text-[#61DAFB]") },
    { name: "JavaScript", icon: getSiIcon("SiJavascript", "text-[#F7DF1E]") },
    { name: "Laravel", icon: getSiIcon("SiLaravel", "text-[#FF2D20]") },
    { name: "PHP", icon: getSiIcon("SiPhp", "text-[#777BB4]") },
    { name: "C#", icon: getSiIcon("SiCsharp", "text-[#239120]") },
    { name: "MySQL", icon: getSiIcon("SiMysql", "text-[#4479A1]") },
    { name: "Arduino", icon: getSiIcon("SiArduino", "text-[#00979D]") },
    { name: "ESP32", icon: <FaIcons.FaMicrochip className="text-emerald-500 text-[20px] md:text-[24px]" /> },
    { name: "Node.js", icon: getSiIcon("SiNodedotjs", "text-[#339933]") },
    { name: "Tailwind", icon: getSiIcon("SiTailwindcss", "text-[#06B6D4]") },
    { name: "Git", icon: getSiIcon("SiGit", "text-[#F05032]") },
    { name: "Photoshop", icon: getSiIcon("SiPhotoshop", "text-[#2496ED]") },
  ];

  const doubleStack = [...stack, ...stack];

  return (
    <section 
      ref={targetRef} 
      id="about"
      className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto space-y-4 select-none"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Academic Card */}
        <motion.div whileHover={{ y: -5 }} className="bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="size-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-500">
              <GraduationCap size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 italic uppercase tracking-tighter dark:text-neutral-400 text-neutral-800">
              Academic
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              3rd Year <span className="text-neutral-500 dark:text-neutral-500 font-black">Information Technology</span> student. Focused on systems architecture and networking.
            </p>
          </div>
        </motion.div>

        {/* Development Card */}
        <motion.div whileHover={{ y: -5 }} className="bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="size-10 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-500">
              <Code2 size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 italic uppercase tracking-tighter dark:text-neutral-400 text-neutral-800">
              Development
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Building <span className="text-neutral-500 dark:text-neutral-500 font-black">CampusWell</span> to bridge the gap between health and tech.
            </p>
          </div>
        </motion.div>

        {/* Embedded Card */}
        <motion.div whileHover={{ y: -5 }} className="bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="size-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-500">
              <Cpu size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 italic uppercase tracking-tighter dark:text-neutral-400 text-neutral-800">
              Embedded
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
               Loves to develop custom firmware like <span className="text-neutral-500 dark:text-neutral-500 font-black">ALDRICH.OS</span> for ESP32 and BW16.
            </p>
          </div>
          <div className="mt-6 flex gap-2 items-center opacity-50">
              <Monitor size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest">System Active</span>
          </div>
        </motion.div>
      </div>


      <div className="bento-card p-6 md:p-8 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="size-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
            <Database size={20} />
          </div>
          <span className="text-neutral-400 text-[10px] uppercase tracking-[0.3em] font-black">Technologies & Frameworks</span>
        </div>

        <div className="relative h-24 md:h-32" ref={constraintsRef}>
          <motion.div 
            drag="x"
            dragConstraints={constraintsRef}
            style={{ x: xScroll }}
            className="flex gap-4 py-2 w-max cursor-grab active:cursor-grabbing absolute top-0"
          >
            {doubleStack.map((item, index) => (
              <div 
                key={`${item.name}-${index}`} 
                className="flex items-center gap-3 md:gap-4 px-5 py-4 md:px-8 md:py-6 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl min-w-fit pointer-events-none"
              >
                <span className="scale-90 md:scale-110 grayscale hover:grayscale-0 transition-all">
                  {item.icon}
                </span>
                <span className="text-[9px] md:text-xs font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}