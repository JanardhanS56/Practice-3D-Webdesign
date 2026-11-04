import React, { useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0A0705] border-t border-[#261A11] pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-[#BCA891]">
      <div className="max-w-7xl mx-auto">
        {/* Monolithic Brand Statement */}
        <div className="pb-16 border-b border-[#261A11] grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C78D4B] block">
              AUTHENTIQUE MAISON DE BOTANIQUE
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-medium text-[#F6F0E8] leading-[0.95] tracking-tight">
              Rooted in the eternal rhythms of ancient Ayurvedic lore.
            </h2>
            <p className="text-xs sm:text-sm text-[#BCA891] max-w-xl leading-relaxed pt-2">
              Every elixir is cold-macerated and slow-cooked for 336 hours in solid copper cauldrons according to Charaka Samhita pharmacopoeia. Non-greasy, 100% plant-active, zero chemical silicones.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E1B678] block">
              The Botanical Ledger Almanac
            </span>
            <p className="text-xs text-[#BCA891] leading-relaxed">
              Subscribe to unlock 15% courtesy on your first order, plus our seasonal Ayurvedic lunar hair almanac.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#17110C] border border-[#C78D4B]/40 text-xs text-[#E1B678] font-mono">
                ✓ Recorded. Courtesy code: <strong>VEDA15</strong>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="flex-1 px-4 py-3 bg-[#17110C] border border-[#261A11] text-xs text-[#F6F0E8] placeholder-[#BCA891]/40 focus:outline-none focus:border-[#C78D4B]"
                />
                <button
                  type="submit"
                  className="btn-maison-primary px-6 py-3 text-xs tracking-widest uppercase flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Monolithic Navigation & Legal Strip */}
        <div className="pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono text-[#BCA891]/70">
          <div className="flex flex-wrap gap-8 uppercase tracking-widest">
            <a href="#hero" className="hover:text-[#E1B678] transition-colors">3D Experience</a>
            <a href="#ingredients" className="hover:text-[#E1B678] transition-colors">24 Botanicals</a>
            <a href="#shop" className="hover:text-[#E1B678] transition-colors">Dispensary</a>
            <a href="#similar-products" className="hover:text-[#E1B678] transition-colors">Companions</a>
            <a href="#quiz" className="hover:text-[#E1B678] transition-colors">Scalp Oracle</a>
            <a href="#rituals" className="hover:text-[#E1B678] transition-colors">Ceremony</a>
          </div>

          <div className="flex items-center gap-6 text-[10px] uppercase tracking-wider">
            <span>© {new Date().getFullYear()} VedaRoots Maison Inc.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
