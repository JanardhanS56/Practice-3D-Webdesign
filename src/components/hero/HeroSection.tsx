import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, RotateCw, Eye, Droplet, Leaf, ShoppingBag } from 'lucide-react';
import { Scene3D } from '../3d/Scene3D';
import { ViewAngle } from '../../types';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/mockData';

export const HeroSection: React.FC = () => {
  const [viewAngle, setViewAngle] = useState<ViewAngle>('showcase');
  const { addToCart, setSelectedProduct } = useCart();
  const flagshipProduct = PRODUCTS[0];

  const angleOptions: { id: ViewAngle; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'showcase', label: '360° Orbit', icon: <RotateCw className="w-3.5 h-3.5" />, desc: 'Full bottle rotation' },
    { id: 'label', label: 'Ayur Seal', icon: <Eye className="w-3.5 h-3.5" />, desc: 'Authenticity & herbs' },
    { id: 'dropper', label: 'Gold Dropper', icon: <Droplet className="w-3.5 h-3.5" />, desc: 'Precision pipette' },
    { id: 'ingredients', label: 'Suspended Herbs', icon: <Leaf className="w-3.5 h-3.5" />, desc: 'Macerated botanicals' },
  ];

  return (
    <section id="hero" className="relative w-full min-h-[90vh] lg:min-h-screen pt-4 pb-16 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-botanical-700/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-gold-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Hero Narrative & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-botanical-900/90 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase w-fit shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Ayurvedic Taila Paka Vidhi • 100% Pure Botanical</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-botanical-50 leading-[1.12] tracking-tight">
            Ancient Herbs.{' '}
            <span className="text-gold-gradient block mt-1">
              Clinically Proven Hair Vitality.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-botanical-200/90 max-w-xl font-normal leading-relaxed">
            Slow-cooked over 14 days in copper vessels with 24 revered botanicals.
            Awakens dormant follicles, curbs premature shedding by 64%, and locks in radiant glass-hair luster.
          </p>

          {/* Key Product Badges */}
          <div className="grid grid-cols-3 gap-3 pt-1 border-y border-gold-500/15 py-4 max-w-lg">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">88%</span>
              <span className="text-[11px] text-botanical-300 uppercase tracking-wider mt-0.5">Hair Density Gain</span>
            </div>
            <div className="flex flex-col border-x border-gold-500/15 px-3">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">24</span>
              <span className="text-[11px] text-botanical-300 uppercase tracking-wider mt-0.5">Ayurvedic Herbs</span>
            </div>
            <div className="flex flex-col pl-3">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">0%</span>
              <span className="text-[11px] text-botanical-300 uppercase tracking-wider mt-0.5">Silicones & Toxins</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => addToCart(flagshipProduct)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-botanical-950 font-bold text-base tracking-wide shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 transition-all flex items-center justify-center gap-3 group active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-botanical-950" />
              <span>Acquire Root Revival • ${flagshipProduct.price}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setSelectedProduct(flagshipProduct)}
              className="px-6 py-4 rounded-xl glass-panel hover:glass-panel-gold text-botanical-200 hover:text-gold-300 font-semibold text-sm tracking-wide border border-gold-500/20 hover:border-gold-500/50 transition-all flex items-center justify-center gap-2"
            >
              <span>Inspect Formulation</span>
            </button>
          </div>

          {/* Social Proof Snippet */}
          <div className="flex items-center gap-4 text-xs text-botanical-300 pt-2">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
              ].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Customer avatar"
                  className="w-7 h-7 rounded-full border-2 border-botanical-950 object-cover"
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gold-400 font-bold">★ 4.96</span>
              <span>from 1,400+ scalp transformations</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Canvas & Floating Inspector */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          {/* Floating Feature Tag Top Right */}
          <div className="absolute top-2 right-2 sm:right-6 glass-panel-gold px-3.5 py-2 rounded-xl text-xs text-gold-300 border border-gold-400/30 shadow-lg hidden sm:flex items-center gap-2 z-20 animate-bounce duration-1000">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Real-Time 3D Shader • Drag to Rotate</span>
          </div>

          {/* Floating Feature Tag Bottom Left */}
          <div className="absolute bottom-16 left-2 sm:left-4 glass-panel px-3.5 py-2 rounded-xl text-xs text-botanical-200 border border-botanical-700 shadow-lg hidden sm:flex items-center gap-2 z-20">
            <Award className="w-4 h-4 text-gold-400" />
            <span>Suspended Amla & Bhringraj</span>
          </div>

          {/* The 3D Scene Viewport */}
          <div className="w-full h-[450px] sm:h-[540px] lg:h-[620px] relative">
            <Scene3D viewAngle={viewAngle} interactive={true} />
          </div>

          {/* 3D Angle Selector Pill Ribbon */}
          <div className="relative z-20 -mt-6 sm:-mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-panel-gold border border-gold-500/30 shadow-xl max-w-full">
            {angleOptions.map((opt) => {
              const active = viewAngle === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setViewAngle(opt.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-gold-500 text-botanical-950 shadow-md shadow-gold-500/30'
                      : 'text-botanical-200 hover:text-gold-300 hover:bg-botanical-900/60'
                  }`}
                  title={opt.desc}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-botanical-400 mt-2 tracking-wider flex items-center gap-1">
            <RotateCw className="w-3 h-3 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
            Click and drag 3D bottle to inspect glass clarity & gold shimmer
          </span>
        </div>
      </div>
    </section>
  );
};
