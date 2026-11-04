import React, { useState } from 'react';
import { Leaf, ArrowRight, ShieldCheck, Heart, Sparkles, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-botanical-950 border-t border-gold-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-botanical-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold-400/40 bg-botanical-900 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-gold-400" />
              </div>
              <span className="text-2xl font-serif tracking-widest text-gold-gradient font-bold">
                VEDAROOTS
              </span>
            </div>
            <p className="text-xs text-botanical-300 leading-relaxed max-w-sm">
              Rooted in 5,000 years of authentic Ayurvedic pharmacopoeia. Hand-crafted in small batches using the sacred Taila Paka Vidhi 14-day slow-maceration technique.
            </p>
            <div className="flex items-center gap-4 text-xs text-botanical-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" /> Ayush Certified
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" /> 100% Cruelty Free
              </span>
            </div>
          </div>

          {/* Quick Links 1: The Dispensary */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Dispensary
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#shop" className="hover:text-gold-300 transition-colors">Root Revival Elixir</a></li>
              <li><a href="#shop" className="hover:text-gold-300 transition-colors">Rosemary DHT Drops</a></li>
              <li><a href="#shop" className="hover:text-gold-300 transition-colors">Neem Clarifying Scalp Oil</a></li>
              <li><a href="#shop" className="hover:text-gold-300 transition-colors">Hibiscus Repair Nectar</a></li>
              <li><a href="#similar-products" className="hover:text-gold-300 transition-colors">Neem Wood Combs</a></li>
            </ul>
          </div>

          {/* Quick Links 2: Botanical Science */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Herbal Science
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#ingredients" className="hover:text-gold-300 transition-colors">24 Sacred Botanicals</a></li>
              <li><a href="#ingredients" className="hover:text-gold-300 transition-colors">Taila Paka Vidhi Process</a></li>
              <li><a href="#quiz" className="hover:text-gold-300 transition-colors">Ayurvedic Dosha Quiz</a></li>
              <li><a href="#rituals" className="hover:text-gold-300 transition-colors">Shiro-Abhyanga Ritual</a></li>
              <li><a href="#reviews" className="hover:text-gold-300 transition-colors">Clinical Evidence</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
              The Botanical Almanac
            </h4>
            <p className="text-xs text-botanical-300 leading-relaxed">
              Subscribe to receive 15% off your first cold-pressed order, plus our seasonal Ayurvedic lunar hair almanac and scalp care recipes.
            </p>
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-botanical-900 border border-gold-500/40 text-xs text-gold-300">
                ✨ Welcome to the circle. Check your inbox for code <strong>VEDA15</strong>.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-botanical-900 border border-gold-500/30 text-xs text-botanical-100 placeholder-botanical-500 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-botanical-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <span className="text-[10px] text-botanical-500 block">
              Zero spam. Unsubscribe with one click anytime.
            </span>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-botanical-850 flex flex-col sm:flex-row items-center justify-between text-[11px] text-botanical-400 gap-4">
          <p>© {new Date().getFullYear()} VedaRoots Botanical Alchemy Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gold-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold-300 cursor-pointer">Terms of Ritual Service</span>
            <span className="hover:text-gold-300 cursor-pointer">COA Lab Analyses</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
