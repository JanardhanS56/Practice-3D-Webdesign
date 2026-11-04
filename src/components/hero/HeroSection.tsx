import React, { useState } from 'react';
import { RotateCw, Eye, Droplet, Leaf, ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';
import { Scene3D } from '../3d/Scene3D';
import { ViewAngle } from '../../types';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/mockData';

export const HeroSection: React.FC = () => {
  const [viewAngle, setViewAngle] = useState<ViewAngle>('showcase');
  const [selectedHotspot, setSelectedHotspot] = useState<{
    title: string;
    subtitle: string;
    desc: string;
  } | null>(null);

  const { addToCart, setSelectedProduct } = useCart();
  const flagshipProduct = PRODUCTS[0];

  const angleOptions: { id: ViewAngle; label: string; icon: React.ReactNode }[] = [
    { id: 'showcase', label: '360° Orbit', icon: <RotateCw className="w-3.5 h-3.5" /> },
    { id: 'label', label: 'Keshya Seal', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'dropper', label: 'Gold Dropper', icon: <Droplet className="w-3.5 h-3.5" /> },
    { id: 'ingredients', label: 'Macerated Herbs', icon: <Leaf className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="hero" className="relative w-full min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden bg-[#0A0705]">
      {/* Background radial haze */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] bg-[#C78D4B]/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Architectural Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 text-left z-10">
          {/* Provenance Tag */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C78D4B] uppercase">
              MAISON BOTANIQUE • KERALA 1928
            </span>
          </div>

          {/* Headline with exact fluid scale and font-display */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#F6F0E8] leading-[0.98] tracking-[-0.04em]">
            Sacred Botanicals.{' '}
            <span className="text-amber-metallic block italic font-normal mt-1">
              Clinically Documented Vitality.
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-sm sm:text-base text-[#BCA891] max-w-lg leading-relaxed font-normal">
            Concocted over 336 hours in solid copper cauldrons with 24 revered Ayurvedic actives.
            Demonstrated to reactivate dormant hair follicles, inhibit localized DHT, and bestow deep mirror-sheen luster.
          </p>

          {/* Quantitative Clinical Monograph */}
          <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#261A11] max-w-lg">
            <div>
              <span className="text-3xl sm:text-4xl font-display text-[#E1B678] block">88%</span>
              <span className="text-[10px] tracking-[0.18em] text-[#BCA891] uppercase block mt-1">
                Density Increase
              </span>
            </div>
            <div className="border-l border-[#261A11] pl-6">
              <span className="text-3xl sm:text-4xl font-display text-[#E1B678] block">336h</span>
              <span className="text-[10px] tracking-[0.18em] text-[#BCA891] uppercase block mt-1">
                Copper Maceration
              </span>
            </div>
            <div className="border-l border-[#261A11] pl-6">
              <span className="text-3xl sm:text-4xl font-display text-[#E1B678] block">24</span>
              <span className="text-[10px] tracking-[0.18em] text-[#BCA891] uppercase block mt-1">
                Sacred Botanicals
              </span>
            </div>
          </div>

          {/* Architectural Action CTAs (No generic rounded pill buttons) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
            <button
              onClick={() => addToCart(flagshipProduct)}
              className="btn-maison-primary flex items-center justify-center gap-3 text-xs tracking-[0.15em]"
            >
              <span>Acquire Root Revival • ${flagshipProduct.price}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setSelectedProduct(flagshipProduct)}
              className="btn-maison-outline flex items-center justify-center gap-2 text-xs tracking-[0.15em]"
            >
              <Compass className="w-3.5 h-3.5 text-[#C78D4B]" />
              <span>Inspect Pharmacopoeia</span>
            </button>
          </div>

          {/* Hotspot Selected Indicator if clicked */}
          {selectedHotspot && (
            <div className="p-4 rounded-none border border-[#C78D4B]/30 bg-[#17110C]/80 backdrop-blur-md animate-fadeIn">
              <span className="text-[10px] uppercase tracking-widest text-[#E1B678] font-bold block">
                Inspecting: {selectedHotspot.subtitle}
              </span>
              <h4 className="text-sm font-display text-[#F6F0E8] mt-0.5 font-bold">
                {selectedHotspot.title}
              </h4>
              <p className="text-xs text-[#BCA891] mt-1">
                {selectedHotspot.desc}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: 3D Bottle with Amber Caustics */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          {/* Real-time 3D Viewport */}
          <div className="w-full h-[460px] sm:h-[560px] lg:h-[640px] relative">
            <Scene3D
              viewAngle={viewAngle}
              interactive={true}
              onHotspotSelect={(h) => setSelectedHotspot(h)}
            />
          </div>

          {/* Architectural Angle Ribbon (No rounded pills) */}
          <div className="relative z-20 -mt-6 flex flex-wrap items-center justify-center gap-2 p-1 bg-[#17110C]/90 border border-[#C78D4B]/30 shadow-2xl">
            {angleOptions.map((opt) => {
              const active = viewAngle === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setViewAngle(opt.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-sans uppercase tracking-widest transition-all ${
                    active
                      ? 'bg-[#C78D4B] text-[#0A0705] font-bold shadow-md'
                      : 'text-[#BCA891] hover:text-[#E1B678] hover:bg-[#261A11]'
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[10px] font-mono tracking-widest text-[#BCA891]/60 mt-3 uppercase flex items-center gap-2">
            <RotateCw className="w-3 h-3 text-[#C78D4B] animate-spin" style={{ animationDuration: '8s' }} />
            Click hotspots on glass bottle to reveal provenance layers
          </span>
        </div>
      </div>
    </section>
  );
};
