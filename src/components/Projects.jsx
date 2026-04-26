import { motion } from 'framer-motion';
import StackIcon from "tech-stack-icons";

export default function Projects() {
  const items = [
    { 
      name: "CampusWell", 
      type: "Full-stack", 
      color: "bg-emerald-500", 
      glow: "shadow-emerald-500/20", 
      desc: "Student mental health & wellness management system.", 
      tech: ["react", "nodejs", "laravel", "tailwindcss", "git", "github"], 
      github: "https://github.com/aldrich27dev/campus_well", 
      live: "https://aldrich27dev.github.io/campus_well/" 
    },
    { 
      name: "GRC | Buddy", 
      type: "Full-stack", 
      color: "bg-red-500", 
      glow: "shadow-red-500/20", 
      desc: "A real-time student matching chat platform for Global Reciprocal Colleges.", 
      tech: ["react", "firebase", "tailwindcss", "git", "github"], 
      github: "https://github.com/aldrich27dev/grc_buddy", 
      live: "https://aldrich27dev.github.io/grc_buddy/" 
    },
    { 
      name: "Simple Calculator", 
      type: "Utility", 
      color: "bg-blue-500", 
      glow: "shadow-blue-500/20", 
      desc: "Functional calc built with modern stack.", 
      tech: ["react", "tailwindcss", "git", "github"], 
      github: "https://github.com/aldrich27dev/calcu", 
      live: "https://aldrich27dev.github.io/calcu/" 
    },
    { 
      name: "Aldrich Quiz", 
      type: "Interactive", 
      color: "bg-yellow-500", 
      glow: "shadow-yellow-500/20",
      desc: "Gamified quiz platform.", 
      tech: ["react", "tailwindcss", "typescript", "git", "github"], 
      github: "https://github.com/aldrich27dev/myquizapp", 
      live: "https://aldrich27dev.github.io/myquizapp/" 
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto transition-colors duration-500">
      <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-emerald-600">
              RECENT
            </span>
        <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase mt-4 text-text-primary">
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -8 }}
            className="group relative h-[420px] bg-card rounded-[2.5rem] p-10 overflow-hidden border border-card-border shadow-sm flex flex-col"
          >
            {/* Background Glow */}
            <div className={`absolute -inset-24 opacity-0 group-hover:opacity-10 transition-opacity blur-3xl rounded-full ${project.color} pointer-events-none`} />

            {/* Header */}
            <div className="flex justify-between items-start relative z-10">
              <div className={`size-12 ${project.color} ${project.glow} rounded-2xl flex items-center justify-center`}>
                <div className="size-4 border-2 border-white/30 rounded-full animate-pulse" />
              </div>
              <span className="text-[10px] text-neutral-400">NODE_0{i + 1}</span>
            </div>

            {/* Content */}
            <div className="mt-8 relative z-10 flex-grow">
              <h3 className="text-2xl font-black text-text-primary group-hover:text-emerald-600 transition-colors">
                {project.name}
              </h3>
              <p className="text-emerald-600 text-[10px] uppercase tracking-widest font-bold mt-1">
                {project.type}
              </p>
              <p className="text-neutral-500 mt-4 text-sm leading-relaxed">
                {project.desc}
              </p>
              
              {/* Tech Logos using library */}
              <div className="flex gap-3 mt-6">
                {project.tech.map((t) => (
                  <div key={t} className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity">
                    <StackIcon name={t} />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="relative z-10 flex gap-6 mt-6 pt-6 border-t border-card-border">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-emerald-500 transition-colors">
                Repository
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-emerald-500 transition-colors">
                Live View
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
