import React, { useState } from 'react';
import { FlaskConical, MapPin, Check, Compass } from 'lucide-react';
import { BOTANICAL_INGREDIENTS } from '../../data/mockData';
import { BotanicalIngredient } from '../../types';

export const HerbariumLedger: React.FC = () => {
  const [activeSpecimen, setActiveSpecimen] = useState<BotanicalIngredient>(
    BOTANICAL_INGREDIENTS[0]
  );

  return (
    <section id="ingredients" className="relative w-full min-h-screen py-28 px-6 sm:px-12 lg:px-16 z-20 pointer-events-none">
      <div className="max-w-6xl mr-auto pointer-events-auto bg-[#0A0705]/95 border border-[#C78D4B]/30 p-8 sm:p-14 shadow-2xl backdrop-blur-md space-y-10">
        {/* Chapter Header */}
        <div className="space-y-3 border-b border-[#261A11] pb-8 text-left">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C78D4B] font-bold">
              ACT III • THE SACRED HERBARIUM DOSSIER
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-medium text-[#F6F0E8] tracking-tight">
            The Botanical <span className="text-amber-metallic italic">Specimen Ledger</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#BCA891] max-w-xl leading-relaxed">
            24 wildcrafted herbs macerated in pure lipid suspension. Inspect the bioactive phytochemical signatures responsible for cellular follicle activation.
          </p>
        </div>

        {/* Specimen Index & Monograph Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Vertical Index Column (Left) */}
          <div className="lg:col-span-4 flex flex-col space-y-1.5 border-r border-[#261A11] pr-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCA891]/60 mb-2 block">
              TAXONOMY INDEX (CHOOSE SPECIMEN)
            </span>
            {BOTANICAL_INGREDIENTS.map((herb, idx) => {
              const active = activeSpecimen.id === herb.id;
              return (
                <button
                  key={herb.id}
                  onClick={() => setActiveSpecimen(herb)}
                  className={`p-3 text-left transition-all flex items-center justify-between border ${
                    active
                      ? 'bg-[#17110C] border-[#C78D4B] text-[#E1B678]'
                      : 'bg-transparent border-transparent text-[#BCA891] hover:border-[#261A11] hover:text-[#F6F0E8]'
                  }`}
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[10px] opacity-50">0{idx + 1}.</span>
                    <div>
                      <strong className="text-xs font-display font-medium block">
                        {herb.commonName}
                      </strong>
                      <span className="text-[10px] font-mono opacity-60 block">
                        {herb.sanskritName.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono opacity-40 uppercase">
                    {herb.role.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Specimen Dossier (Right) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#261A11] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C78D4B]">
                  BIOACTIVE PHARMACOPOEIA
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-medium text-[#F6F0E8] mt-0.5">
                  {activeSpecimen.sanskritName}
                </h3>
                <span className="text-xs italic font-display text-[#BCA891] block">
                  Binomial Classification: {activeSpecimen.scientificName}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#BCA891] block">
                  Therapeutic Role
                </span>
                <span className="text-xs font-mono font-bold text-[#E1B678] bg-[#17110C] px-3 py-1 border border-[#261A11] block mt-1">
                  {activeSpecimen.role}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F6F0E8]/90 leading-relaxed font-normal">
              {activeSpecimen.description}
            </p>

            {/* Phytochemical Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#17110C] border border-[#261A11] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCA891] block">
                  Active Molecule
                </span>
                <strong className="text-xs font-mono text-[#E1B678] block">
                  {activeSpecimen.bioactive}
                </strong>
              </div>

              <div className="p-4 bg-[#17110C] border border-[#261A11] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCA891] block">
                  Wild Harvest Coordinates
                </span>
                <strong className="text-xs font-mono text-[#E1B678] block">
                  {activeSpecimen.origin}
                </strong>
              </div>
            </div>

            {/* Documented Clinical Outcomes */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C78D4B] block">
                Observed Follicular Mechanism of Action:
              </span>
              <div className="space-y-1.5">
                {activeSpecimen.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#BCA891]">
                    <Check className="w-3.5 h-3.5 text-[#E1B678] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

