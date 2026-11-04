import React from 'react';
import { ArrowDown, ArrowRight, Compass } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/mockData';

export const MonolithicHero: React.FC = () => {
  const { addToCart, setSelectedProduct } = useCart();
  const flagshipProduct = PRODUCTS[0];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden z-20 pointer-events-none">
      {/* Top Ledger Bar */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-[#BCA891] border-b border-[#261A11] pb-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C78D4B] animate-pulse" />
          <span>ACT I • THE REVERED VESSEL</span>
        </div>
        <span className="hidden sm:inline">COORDINATES 9°58'N 76°17'E • KERALA</span>
        <span className="text-[#E1B678]">EDITION NO. 04</span>
      </div>

      {/* Massive Background Display Typographic Monogram */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center select-none pointer-events-none -z-10 opacity-15">
        <span className="text-[20vw] font-display font-medium text-[#C78D4B] tracking-[-0.06em] whitespace-nowrap">
          VEDAROOTS
        </span>
      </div>

      {/* Hero Narrative Overlay (Left Anchored Asymmetrical, not centered) */}
      <div className="max-w-xl my-auto space-y-6 pt-12 text-left pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="w-10 h-[1px] bg-[#C78D4B]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C78D4B] font-bold">
            TAILA PAKA VIDHI PHARMACOPOEIA
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-medium text-[#F6F0E8] leading-[0.92] tracking-[-0.04em]">
          Sacred Oils.<br />
          <span className="text-amber-metallic italic font-normal">
            Proven Vitality.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[#BCA891] leading-relaxed font-normal max-w-md">
          Simmered for 336 hours in solid copper cauldrons with 24 hand-foraged botanicals.
          Clinically demonstrated to awaken dormant hair follicles and curb excessive shedding by 64%.
        </p>

        {/* Architectural CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          <button
            onClick={() => addToCart(flagshipProduct)}
            className="btn-maison-primary flex items-center justify-center gap-3 text-xs tracking-[0.15em]"
          >
            <span>Acquire Elixir • ${flagshipProduct.price}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setSelectedProduct(flagshipProduct)}
            className="btn-maison-outline flex items-center justify-center gap-2 text-xs tracking-[0.15em]"
          >
            <Compass className="w-3.5 h-3.5 text-[#C78D4B]" />
            <span>Monograph Details</span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex items-end justify-between border-t border-[#261A11] pt-4 text-xs font-mono tracking-widest text-[#BCA891] uppercase pointer-events-auto">
        <div className="flex items-center gap-2">
          <ArrowDown className="w-3.5 h-3.5 text-[#C78D4B] animate-bounce" />
          <span>Scroll to scrub the 336-hour copper maceration</span>
        </div>
        <span className="text-[#E1B678]">100% ORGANIC CERTIFIED</span>
      </div>
    </section>
  );
};

