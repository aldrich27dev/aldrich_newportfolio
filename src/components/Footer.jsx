import { Sparkles } from 'lucide-react';
import { SiFacebook, SiInstagram, SiGmail } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/aldrichnaag27', icon: SiFacebook },
    { name: 'Instagram', href: 'https://www.instagram.com/aldrichruru', icon: SiInstagram },
    { name: 'Gmail', href: 'mailto:aldrichhcirdla27@gmail.com', icon: SiGmail },
  ];

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-card-border bg-bg-primary px-6 py-14 text-text-primary transition-colors duration-500 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-text-primary flex items-center justify-center rounded-md">
                <span className="text-bg-primary font-black text-xs">AN</span>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-text-heading text-text-primary">
                  Aldrich Naag
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-text-primary/55">
                  Front-end, backend, and embedded systems
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-text-primary">
              IT student focused on building clean interfaces, reliable systems, and projects that stay visually consistent from top to bottom.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600">
              <span>Manila</span>
              <span className="text-text-primary/20">|</span>
              <span>Philippines</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-6">
            <div>
              <div className="mt-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-semibold text-text-heading transition-colors hover:text-emerald-600"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.35em] text-text-primary/50">
                Connect
              </h4>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-card-border bg-card text-text-primary transition-all hover:-translate-y-0.5 hover:border-emerald-500/35 hover:text-emerald-600"
                    aria-label={social.name}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-card-border pt-6 text-xs text-text-primary/55 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} Aldrich Naag. All rights reserved.</p>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </div>
    </footer>
  );
}
