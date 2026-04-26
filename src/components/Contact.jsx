import { useState } from 'react';
import { CheckCircle, Mail, MapPin, Phone, Send, X } from 'lucide-react';

export default function Contact() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contactMethods = [
    { icon: Mail, label: 'Email', value: 'aldrichnaag72@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+63 992 373 4701' },
    { icon: MapPin, label: 'Location', value: 'Manila, PH // GMT+8' },
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResult('Preparing message...');

    const formData = new FormData(event.target);
    formData.append('access_key', '068fa21e-11e8-4815-86c3-306423d7a19b');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult('');
        setIsModalOpen(true);
        event.target.reset();
      } else {
        setResult(`Error: ${data.message}`);
      }
    } catch {
      setResult('Connection failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl border border-card-border bg-card p-8 shadow-2xl shadow-black/30">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-text-primary/60 transition-colors hover:text-text-primary"
                aria-label="Close success message"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-text-heading">
                  Message sent
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-primary">
                  Thanks for reaching out. I'll review it and get back to you as soon as I can.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 transition-colors hover:bg-emerald-500 hover:text-black"
                >
                  Close
                </button>
              </div>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-emerald-500/70" />
            <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-emerald-600">
              Communication Interface
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-text-heading md:text-5xl text-text-primary">
            CONTACT ME.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-text-primary md:text-base">
            If you have a project idea, internship lead, or just want to say hi, send a message and I'll reply through the same theme the site already uses.
          </p>

          <div className="mt-10 space-y-4">
            {contactMethods.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-card-border bg-card/70 px-5 py-4 shadow-sm shadow-black/5 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/10 text-emerald-500">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-primary/50">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-text-heading md:text-base">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[2rem] border border-card-border bg-card/80 p-6 shadow-xl shadow-black/5 backdrop-blur-sm md:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-600">
                  Send a message
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-text-heading text-text-primary">
                  Let&apos;s build something clean.
                </h3>
              </div>
              <div className="hidden rounded-full border border-card-border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary/60 md:block">
                Usually replies within a day
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <input type="hidden" name="subject" value="New Portfolio Inquiry - Aldrich.dev" />
              <input type="hidden" name="from_name" value="Portfolio System" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  required
                  className="w-full rounded-2xl border border-card-border bg-bg-primary/70 px-4 py-3 text-sm text-text-heading outline-none transition-colors placeholder:text-text-primary/45 focus:border-emerald-500/60"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full rounded-2xl border border-card-border bg-bg-primary/70 px-4 py-3 text-sm text-text-heading outline-none transition-colors placeholder:text-text-primary/45 focus:border-emerald-500/60"
                />
              </div>

              <textarea
                name="message"
                placeholder="Write your message"
                required
                rows="6"
                className="w-full rounded-[1.5rem] border border-card-border bg-bg-primary/70 px-4 py-3 text-sm text-text-heading outline-none transition-colors placeholder:text-text-primary/45 focus:border-emerald-500/60"
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-700 transition-colors hover:bg-emerald-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Sending...' : <><Send size={14} /> Send message</>}
                </button>
              </div>

              {/* {result && (
                <div className="text-sm font-medium text-emerald-600">
                  {result}
                </div>
              )} */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
