import React, { useState } from 'react';
import { Plus, Eye, ShieldCheck, Check } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

export const ArchivalDispensary: React.FC = () => {
  const { addToCart, setSelectedProduct } = useCart();
  const [selectedFormulation, setSelectedFormulation] = useState<Product>(PRODUCTS[0]);

  return (
    <section id="shop" className="relative w-full min-h-screen py-28 px-6 sm:px-12 lg:px-16 z-20 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto bg-[#0A0705]/95 border border-[#C78D4B]/30 p-8 sm:p-14 shadow-2xl backdrop-blur-md space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#261A11] pb-8 gap-6 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C78D4B]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C78D4B] font-bold">
                ACT IV • DISPENSARY ARCHIVE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-medium text-[#F6F0E8] tracking-tight">
              The Curated <span className="text-amber-metallic italic">Dispensary</span>
            </h2>
            <p className="text-xs text-[#BCA891] max-w-xl leading-relaxed">
              Bottled in UV-protective dark amber glass. Hand-numbered batches strictly limited to 500 units per lunar extraction.
            </p>
          </div>

          <div className="text-xs font-mono text-[#E1B678] bg-[#17110C] px-4 py-2 border border-[#261A11]">
            CURRENT HARVEST: BATCH #04-KERALA
          </div>
        </div>

        {/* Flagship Spotlight & Formulation Switcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Formulation Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCA891]/60 block mb-2">
              SELECT FORMULATION DOSSIER:
            </span>
            {PRODUCTS.map((prod) => {
              const active = selectedFormulation.id === prod.id;
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedFormulation(prod)}
                  className={`p-4 border cursor-pointer transition-all ${
                    active
                      ? 'bg-[#17110C] border-[#C78D4B]'
                      : 'bg-transparent border-[#261A11] hover:border-[#C78D4B]/40'
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className={`text-base font-display font-medium ${active ? 'text-[#E1B678]' : 'text-[#F6F0E8]'}`}>
                      {prod.name}
                    </h4>
                    <span className="text-xs font-mono text-[#E1B678]">${prod.price}</span>
                  </div>
                  <p className="text-[11px] text-[#BCA891] line-clamp-1">
                    {prod.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Formulation Detail Card */}
          <div className="lg:col-span-7 bg-[#17110C] border border-[#261A11] p-8 space-y-6 text-left">
            <div className="flex justify-between items-start border-b border-[#261A11] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C78D4B]">
                  {selectedFormulation.category.toUpperCase()} PROTOCOL
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F6F0E8] mt-1">
                  {selectedFormulation.name}
                </h3>
                <span className="text-xs font-mono text-[#BCA891] block mt-0.5">
                  {selectedFormulation.volume} • Rated ★ {selectedFormulation.rating} ({selectedFormulation.reviewCount} Reviews)
                </span>
              </div>

              <div className="text-right">
                <span className="text-3xl font-display text-[#E1B678] block">
                  ${selectedFormulation.price}
                </span>
                <span className="text-xs font-mono text-[#BCA891]/50 line-through">
                  ${selectedFormulation.originalPrice}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F6F0E8]/90 leading-relaxed font-normal">
              {selectedFormulation.description}
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C78D4B] block">
                Clinical Outcomes:
              </span>
              <div className="space-y-1.5">
                {selectedFormulation.keyBenefits.slice(0, 3).map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#BCA891]">
                    <Check className="w-3.5 h-3.5 text-[#E1B678] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#261A11] flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(selectedFormulation)}
                className="btn-maison-primary flex-1 py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Acquire Formulation • ${selectedFormulation.price}</span>
              </button>

              <button
                onClick={() => setSelectedProduct(selectedFormulation)}
                className="btn-maison-outline py-3.5 px-6 text-xs flex items-center justify-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 text-[#C78D4B]" />
                <span>Monograph Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

