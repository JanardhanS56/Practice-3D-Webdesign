import React, { useState } from 'react';
import { Leaf, Sparkles, CheckCircle2, MapPin, FlaskConical, ChevronRight, Info } from 'lucide-react';
import { BOTANICAL_INGREDIENTS } from '../../data/mockData';
import { BotanicalIngredient } from '../../types';

export const IngredientsSection: React.FC = () => {
  const [activeIngredient, setActiveIngredient] = useState<BotanicalIngredient>(BOTANICAL_INGREDIENTS[0]);

  return (
    <section id="ingredients" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-botanical-900/40 border-t border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-800/80 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Leaf className="w-3.5 h-3.5 text-gold-400" />
            <span>Phytochemical Potency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-botanical-50 leading-tight">
            The 24 Sacred Botanicals of{' '}
            <span className="text-gold-gradient">Taila Paka Vidhi</span>
          </h2>
          <p className="mt-4 text-botanical-200 text-base sm:text-lg leading-relaxed">
            Every drop is cold-macerated and slow-cooked in copper cauldrons for 336 hours.
            Explore the bioactive compounds clinically verified to awaken cellular follicle growth.
          </p>
        </div>

        {/* Botanical Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {BOTANICAL_INGREDIENTS.map((item) => {
            const isSelected = activeIngredient.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIngredient(item)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gold-500 text-botanical-950 border-gold-400 shadow-lg shadow-gold-500/20 scale-105'
                    : 'bg-botanical-900/90 text-botanical-200 border-gold-500/20 hover:border-gold-500/50 hover:text-gold-300'
                }`}
              >
                <span>🌿</span>
                <span>{item.commonName}</span>
                <span className={`text-[10px] hidden md:inline opacity-75 ${isSelected ? 'text-botanical-900' : 'text-botanical-400'}`}>
                  ({item.sanskritName.split(' ')[0]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Ingredient Spotlight Card */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-2xl relative overflow-hidden transition-all duration-500">
          {/* Subtle botanical glow backdrop */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[120px] opacity-25 pointer-events-none"
            style={{ backgroundColor: activeIngredient.color }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Sanskrit & Science */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-botanical-800 text-gold-300 border border-gold-500/20">
                  {activeIngredient.role}
                </span>
                <span className="text-xs italic text-botanical-300 font-serif">
                  {activeIngredient.scientificName}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-gold-gradient">
                  {activeIngredient.sanskritName}
                </h3>
                <p className="text-sm font-medium text-botanical-300 mt-1">
                  Commonly known as: <strong>{activeIngredient.commonName}</strong>
                </p>
              </div>

              <p className="text-botanical-200 text-base leading-relaxed">
                {activeIngredient.description}
              </p>

              {/* Bioactive & Extraction Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-botanical-900/80 border border-botanical-800 flex items-start gap-3">
                  <FlaskConical className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-botanical-400 block">
                      Bioactive Phytochemical
                    </span>
                    <span className="text-sm font-semibold text-botanical-100 mt-0.5 block">
                      {activeIngredient.bioactive}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-botanical-900/80 border border-botanical-800 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-botanical-400 block">
                      Ethical Origin
                    </span>
                    <span className="text-sm font-semibold text-botanical-100 mt-0.5 block">
                      {activeIngredient.origin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Clinical Benefits */}
              <div className="space-y-2 pt-2">
                <span className="text-xs uppercase tracking-widest font-bold text-gold-400 block">
                  Observed Clinical Scalp Actions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeIngredient.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-botanical-200">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Visual Infographic & Extraction Method */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="p-6 rounded-2xl bg-botanical-950/80 border border-gold-500/25 relative overflow-hidden">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Artisanal Extraction Method</span>
                </div>
                <h4 className="text-lg font-serif font-bold text-botanical-100 mb-2">
                  {activeIngredient.extraction}
                </h4>
                <p className="text-xs text-botanical-300 leading-relaxed">
                  Extracted without chemical solvents, synthetic hexane, or high heat to preserve 100% of the active flavonoids, vitamins, and natural essential fatty acids.
                </p>

                <div className="mt-5 pt-4 border-t border-botanical-800 flex items-center justify-between text-xs">
                  <span className="text-botanical-400">Purity Guarantee:</span>
                  <span className="text-gold-300 font-semibold">Pharmacopoeia Grade A</span>
                </div>
              </div>

              {/* Ayurvedic Dosha Balance */}
              <div className="p-5 rounded-2xl bg-botanical-950/80 border border-botanical-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-botanical-900 border border-gold-500/20 flex items-center justify-center">
                    <Info className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-botanical-100 uppercase tracking-wider">
                      Ayurvedic Dosha Effect
                    </h5>
                    <p className="text-xs text-botanical-300">Pacifies Vata & Pitta Aggravation</p>
                  </div>
                </div>
                <a
                  href="#shop"
                  className="inline-flex items-center gap-1 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <span>Shop Blends</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
