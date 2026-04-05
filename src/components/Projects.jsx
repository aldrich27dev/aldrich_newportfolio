import { motion } from 'framer-motion';

export default function Projects() {
  const items = [
    { 
      name: "CampusWell", 
      type: "Full-stack // System Architecture", 
      color: "bg-emerald-500",
      glow: "shadow-emerald-500/20",
      desc: "Student mental health & wellness management system.",
      github: "https://github.com/yourusername/campuswell" 
    },
    { 
      name: "Cess Sweetz", 
      type: "Website // Cake & Pastry", 
      color: "bg-pink-500 dark:bg-pink-600", 
      glow: "shadow-pink-500/20",
      desc: "Brand identity and web platform for a pastry shop.",
      github: "https://github.com/aldrich27dev/cess" 
    },
    { 
      name: "Simple Calculator", 
      type: "React + Tailwind // Utility", 
      color: "bg-blue-500", 
      glow: "shadow-blue-500/20",
      desc: "Clean, functional calculator built with modern stack.",
      github: "https://github.com/aldrich27dev/calcu" 
    },
    { 
      name: "Aldrich Quiz", 
      type: "Web App // Interactive", 
      color: "bg-yellow-500 dark:bg-yellow-600", 
      glow: "shadow-yellow-500/20",
      desc: "Interactive quiz platform with dynamic scoring.",
      github: "https://github.com/aldrich27dev/myquizapp" 
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
          // System_Records: Executing_Fetch
        </span>
        <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase mt-4 text-text-primary">
          Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((project, i) => (
          /* Wrap card in anchor tag for redirection */
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            key={i}
            className="block outline-none"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative h-[380px] bg-card rounded-[2.5rem] p-10 overflow-hidden border border-card-border shadow-sm hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className={`absolute -inset-24 opacity-0 group-hover:opacity-15 dark:group-hover:opacity-10 transition-opacity blur-3xl rounded-full ${project.color} pointer-events-none`} />

              <div className="flex justify-between items-start relative z-10">
                <div className={`size-14 ${project.color} ${project.glow} rounded-2xl shadow-lg flex items-center justify-center`}>
                  <div className="size-6 border-2 border-white/30 rounded-full animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-widest">
                  NODE_0{i + 1}
                </span>
              </div>

              <div className="mt-10 relative z-10">
                <h3 className="text-3xl font-black tracking-tighter text-text-primary group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 mt-1 font-mono text-[10px] uppercase tracking-widest font-bold">
                  {project.type}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 mt-4 text-sm leading-relaxed max-w-[85%]">
                  {project.desc}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/[0.03] dark:bg-white/[0.02] rounded-tl-[3rem] border-t border-l border-card-border transition-all group-hover:w-36 group-hover:h-36 group-hover:bg-emerald-500/5" />
              
              <div className="absolute bottom-8 left-10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-tighter">
                View on GitHub →
              </div>
            </motion.div>
          </a>
        ))}
      </div>
    </section>
  );
}