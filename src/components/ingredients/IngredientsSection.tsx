import React, { useState } from 'react';
import { Leaf, FlaskConical, MapPin, Check, ArrowRight } from 'lucide-react';
import { BOTANICAL_INGREDIENTS } from '../../data/mockData';
import { BotanicalIngredient } from '../../types';

export const IngredientsSection: React.FC = () => {
  const [activeHerb, setActiveHerb] = useState<BotanicalIngredient>(BOTANICAL_INGREDIENTS[0]);

  return (
    <section id="ingredients" className="py-28 px-4 sm:px-6 lg:px-8 relative bg-[#0A0705] border-t border-[#261A11]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C78D4B] uppercase">
              PHARMACOPOEIA BOTANIQUE
            </span>
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-[#F6F0E8] leading-tight">
            The 24 Sacred Actives of{' '}
            <span className="text-amber-metallic italic">Taila Paka Vidhi</span>
          </h2>
          <p className="mt-4 text-[#BCA891] text-sm sm:text-base leading-relaxed">
            Slow-cooked in virgin cold-pressed sesame lipid matrices for 336 hours. Every molecule is bound directly to organic polyphenols for maximum cutaneous penetration.
          </p>
        </div>

        {/* Botanical Selector Monograph Ribbon (Architectural, sharp lines) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {BOTANICAL_INGREDIENTS.map((item) => {
            const active = activeHerb.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveHerb(item)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.12em] font-sans transition-all border ${
                  active
                    ? 'bg-[#C78D4B] text-[#0A0705] border-[#E1B678] font-bold shadow-lg'
                    : 'bg-[#17110C]/80 text-[#BCA891] border-[#261A11] hover:border-[#C78D4B]/40 hover:text-[#F6F0E8]'
                }`}
              >
                <span>{item.commonName}</span>
                <span className="text-[10px] ml-2 opacity-70 italic font-display lowercase">
                  ({item.sanskritName.split(' ')[0]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Monograph Card */}
        <div className="maison-card p-8 sm:p-14 border border-[#C78D4B]/25 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Scientific Monograph & Ayurvedic Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 bg-[#261A11] text-[#E1B678] border border-[#C78D4B]/30">
                  {activeHerb.role}
                </span>
                <span className="text-xs italic font-display text-[#BCA891]">
                  Binomial: {activeHerb.scientificName}
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-5xl font-display font-medium text-amber-metallic">
                  {activeHerb.sanskritName}
                </h3>
                <span className="text-xs uppercase tracking-widest text-[#BCA891] block mt-1">
                  Classical Designation: {activeHerb.commonName}
                </span>
              </div>

              <p className="text-[#F6F0E8]/90 text-sm sm:text-base leading-relaxed font-normal">
                {activeHerb.description}
              </p>

              {/* Bioactive & Provenance Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#17110C] border border-[#261A11] flex items-start gap-3">
                  <FlaskConical className="w-5 h-5 text-[#C78D4B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#BCA891] block">
                      Bioactive Molecule
                    </span>
                    <strong className="text-xs text-[#F6F0E8] mt-0.5 block font-mono">
                      {activeHerb.bioactive}
                    </strong>
                  </div>
                </div>

                <div className="p-4 bg-[#17110C] border border-[#261A11] flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C78D4B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#BCA891] block">
                      Wild Harvest Provenance
                    </span>
                    <strong className="text-xs text-[#F6F0E8] mt-0.5 block">
                      {activeHerb.origin}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Verified Clinical Actions */}
              <div className="pt-2 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C78D4B] font-bold block">
                  Documented In-Vitro & Follicular Actions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeHerb.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#BCA891]">
                      <Check className="w-3.5 h-3.5 text-[#E1B678] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Artisanal Extraction Technique */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="p-8 bg-[#0A0705] border border-[#C78D4B]/30 relative">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E1B678] block mb-2">
                  Maceration Technique
                </span>
                <h4 className="text-xl font-display font-medium text-[#F6F0E8] mb-3">
                  {activeHerb.extraction}
                </h4>
                <p className="text-xs text-[#BCA891] leading-relaxed">
                  Extracted without artificial chemical solvents, synthetic hexane, or volatile thermal cracking to preserve 100% of the active flavonoids, vitamins, and natural fatty acids.
                </p>
                <div className="mt-6 pt-4 border-t border-[#261A11] flex items-center justify-between text-xs text-[#BCA891]">
                  <span>Purity Standard:</span>
                  <span className="text-[#E1B678] font-bold">Pharmacopoeia Grade A</span>
                </div>
              </div>

              <div className="p-6 bg-[#17110C] border border-[#261A11] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C78D4B] font-bold block">
                    Ayurvedic Energetics (Virya)
                  </span>
                  <span className="text-xs text-[#F6F0E8] mt-0.5 block">
                    Sheeta (Cooling) • Pacifies Pitta & Vata
                  </span>
                </div>
                <a
                  href="#shop"
                  className="btn-maison-outline text-[10px] py-2 px-3 flex items-center gap-1.5"
                >
                  <span>Explore Blend</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
