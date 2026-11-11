import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Monitor, Database, Code2, GraduationCap } from 'lucide-react';
import {
  SiArduino,
  SiCss,
  SiFlask,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si';
import { FaMicrochip } from 'react-icons/fa';
import { DiPhotoshop } from 'react-icons/di';
import { TbBrandCSharp } from 'react-icons/tb';

const TECH_ICONS = {
  DiPhotoshop,
  FaMicrochip,
  SiArduino,
  SiCss,
  SiFlask,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  TbBrandCSharp,
};

export default function About() {
  const targetRef = useRef(null);

  const getTechIcon = (name, colorClass) => {
    const Icon = TECH_ICONS[name];
    return Icon ? <Icon className={`${colorClass} text-[20px] md:text-[24px]`} /> : <Code2 size={20} />;
  };

  const stack = [
    { name: 'HTML', icon: getTechIcon('SiHtml5', 'text-[#E34F26]') },
    { name: 'CSS', icon: getTechIcon('SiCss', 'text-[#1572B6]') },
    { name: 'React', icon: getTechIcon('SiReact', 'text-[#61DAFB]') },
    { name: 'Tailwind', icon: getTechIcon('SiTailwindcss', 'text-[#06B6D4]') },
    { name: 'JavaScript', icon: getTechIcon('SiJavascript', 'text-[#F7DF1E]') },
    { name: 'Laravel', icon: getTechIcon('SiLaravel', 'text-[#FF2D20]') },
    { name: 'Node.js', icon: getTechIcon('SiNodedotjs', 'text-[#339933]') },
    { name: 'PHP', icon: getTechIcon('SiPhp', 'text-[#777BB4]') },
    { name: 'Flask', icon: getTechIcon('SiFlask', 'text-white') },
    { name: 'MySQL', icon: getTechIcon('SiMysql', 'text-[#4479A1]') },
    { name: 'PostgreSQL', icon: getTechIcon('SiPostgresql', 'text-[#4169E1]') },
    { name: 'C#', icon: getTechIcon('TbBrandCSharp', 'text-[#512BD4]') },
    { name: 'Python', icon: getTechIcon('SiPython', 'text-[#3776AB]') },
    { name: 'Git', icon: getTechIcon('SiGit', 'text-[#F05032]') },
    { name: 'Supabase', icon: getTechIcon('SiSupabase', 'text-[#3ECF8E]') },
    { name: 'Photoshop', icon: getTechIcon('DiPhotoshop', 'text-[#31A8FF]') },
    { name: 'ShadCN', icon: getTechIcon('SiShadcnui', 'text-white') },
    { name: 'Arduino', icon: getTechIcon('SiArduino', 'text-[#00979D]') },
    { name: 'ESP32', icon: getTechIcon('FaMicrochip', 'text-emerald-500') },
  ];


  const cardStyle = "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-all duration-300";

  return (
    <section 
      ref={targetRef}
      id="about"
      className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto space-y-8 select-none bg-transparent"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Academic Card */}
        <motion.div whileHover={{ y: -5 }} className="bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="size-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-500">
              <GraduationCap size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 italic uppercase tracking-tighter dark:text-neutral-200 text-neutral-800">
              Academic
            </h3>
     <p className="text-neutral-500 dark:text-neutral-200 text-sm leading-relaxed">
  3rd Year <span className="text-neutral-500 dark:text-neutral-100 font-black">Information Technology</span> student at <span className="text-neutral-500 dark:text-neutral-100 font-bold">Global Reciprocal Colleges (GRC)</span>.
</p>
          </div>
        </motion.div>

        {/* Development Card */}
        <motion.div whileHover={{ y: -5 }} className="bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="size-10 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-500">
              <Code2 size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 italic uppercase tracking-tighter dark:text-neutral-200 text-neutral-800">
              Development
            </h3>
            <p className="text-neutral-500 dark:text-neutral-200 text-sm leading-relaxed">
              Building <span className="text-neutral-500 dark:text-neutral-100 font-black">CampusWell</span> to bridge the gap between health and tech.
            </p>
          </div>
        </motion.div>

        {/* Embedded Card */}
        <motion.div whileHover={{ y: -5 }} className="bento-card p-8 flex flex-col justify-between">
          <div>
            <div className="size-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-500">
              <Cpu size={24} />
            </div>
            <h3 className="font-bold text-xl mb-4 italic uppercase tracking-tighter dark:text-neutral-200 text-neutral-800">
              Embedded
            </h3>
            <p className="text-neutral-500 dark:text-neutral-200 text-sm leading-relaxed">
               Loves to develop custom firmware like <span className="text-neutral-500 dark:text-neutral-100 font-black">ALDRICH.OS</span> for ESP32 and BW16.
            </p>
          </div>
          <div className="mt-6 flex gap-2 items-center opacity-50">
              <Monitor size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-widest">System Active</span>
          </div>
        </motion.div>
      </div>

      {/* Skills Grid Header */}
      <div className="flex items-center gap-4 pt-4 transition-colors duration-500">
         <div className="flex items-center gap-4 mb-8">
          <div className="size-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
            <Database size={20} />
          </div>
          <span className="text-neutral-400 dark:text-neutral-200 text-[20px] uppercase tracking-[0.3em] font-black">Technologies & Frameworks</span>
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {stack.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.02 }}
            className={`group relative overflow-hidden flex flex-col items-center justify-center gap-4 w-full px-5 py-8 ${cardStyle} rounded-xl hover:bg-black/10 dark:hover:bg-white/10`}
          >
            {/* Triple Line Detail */}
            <div className="absolute top-3 right-3 flex flex-col gap-[3px] opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="block h-px w-3 bg-black dark:bg-white" />
              <span className="block h-px w-3 bg-black dark:bg-white" />
              <span className="block h-px w-3 bg-black dark:bg-white" />
            </div>

            {/* Icon */}
            <div className="grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-110">
              {item.icon}
            </div>

            {/* Label */}
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors text-center">
              {item.name}
            </span>

            {/* Neon Green Hover Line */}
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#00ff88] group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
