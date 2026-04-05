import React from 'react';
import * as LucideIcons from 'lucide-react';
// 🚩 NEW: Import react-icons for brand-specific, solid vectors 🚩
import { SiFacebook, SiInstagram, SiGmail } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Bulletproof Icon Component (Kept for navigation/generic icons)
  const Icon = ({ name, size = 18, className = "" }) => {
    const LucideIcon = LucideIcons[name] || LucideIcons[`${name}Icon`] || LucideIcons.HelpCircle;
    return <LucideIcon size={size} className={className} />;
  };

  // 🚩 Updated socialLinks array to include Instagram and use brand-specific color hints 🚩
  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/aldrichnaag27", icon: SiFacebook, colorClass: "text-[#1877F2]" },
    { name: "Instagram", href: "https://www.instagram.com/aldrichruru", icon: SiInstagram, colorClass: "text-[#E4405F]" },
    { name: "Gmail", href: "mailto:aldrichhcirdla27@gmail.com", icon: SiGmail, colorClass: "text-[#EA4335]" },
  ];

  return (
    <footer className="w-full py-16 px-6 md:px-12 border-t border-card-border bg-bg-primary text-text-primary transition-colors duration-500">
      <div className="max-w-screen-2xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-text-primary flex items-center justify-center rounded-md">
                <span className="text-bg-primary font-black text-xs">AN</span>
              </div>
              <h2 className="text-2xl font-black tracking-tighter uppercase underline decoration-emerald-500/30">
                Aldrich Naag
              </h2>
            </div>
            <p className="opacity-70 text-sm max-w-xs leading-relaxed font-medium">
              IT student focused on Front-end Development and Embedded Systems, building reliable and efficient digital projects.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest">
              <span>● Manila</span>
              <span className="opacity-20">|</span>
              <span>Philippines</span>
            </div>
          </div>

          {/* Navigation & Connect */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono opacity-50 uppercase tracking-[0.3em] font-bold text-left">
                // Connect
              </h4>
              <div className="flex gap-2 justify-start items-center">
                {/* 🚩 Replaced mapping logic to use react-icons vectors 🚩 */}
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.href} 
                    className="size-10 border border-card-border flex items-center justify-center rounded-lg hover:border-text-primary transition-all duration-300 group"
                  >
                    {/* Using social.icon directly from Simple Icons */}
                    <social.icon 
                      size={20} 
                      className={`group-hover:scale-110 ${social.colorClass} opacity-60 group-hover:opacity-100 transition-all`} 
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
            © {currentYear} Aldrich Naag. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}