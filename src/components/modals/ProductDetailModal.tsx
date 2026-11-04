import React, { useState } from 'react';
import { X, Star, ShoppingBag, CheckCircle2, Sparkles, Shield, Clock, Heart, Award } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('100 ml / 3.4 fl oz');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ritual' | 'ingredients'>('benefits');

  if (!selectedProduct) return null;

  const sizeOptions = [
    { label: '50 ml / 1.7 fl oz', multiplier: 0.65, subtitle: 'Trial & Travel' },
    { label: '100 ml / 3.4 fl oz', multiplier: 1.0, subtitle: 'Full 60-Day Ritual' },
    { label: '200 ml / 6.8 fl oz', multiplier: 1.75, subtitle: 'Value Double Size' },
  ];

  const currentOption = sizeOptions.find((s) => s.label === selectedSize) || sizeOptions[1];
  const adjustedPrice = Math.round(selectedProduct.price * currentOption.multiplier);
  const adjustedOriginalPrice = Math.round(selectedProduct.originalPrice * currentOption.multiplier);

  const handleAddToCart = () => {
    addToCart(
      {
        ...selectedProduct,
        price: adjustedPrice,
        originalPrice: adjustedOriginalPrice,
        volume: selectedSize,
      },
      selectedSize,
      quantity
    );
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel-gold rounded-3xl border border-gold-500/30 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-botanical-900/90 text-botanical-300 hover:text-gold-300 border border-gold-500/30 hover:border-gold-400 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Image and badges */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold-500/25 bg-botanical-900/80">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-botanical-950/85 border border-gold-500/40 text-gold-300 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>{selectedProduct.badge}</span>
                </div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="p-4 rounded-xl bg-botanical-900/60 border border-botanical-800 text-xs text-botanical-300 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold-400 shrink-0" />
                <span>60-Day Follicle Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Ships within 24h in eco-insulated packaging</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-400 shrink-0" />
                <span>100% Ayurvedic Pharmacopoeia Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Configuration */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-gold-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gold-300">{selectedProduct.rating}</span>
                <span className="text-xs text-botanical-400">
                  ({selectedProduct.reviewCount} customer reviews)
                </span>
                <span className="ml-auto text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/50 font-semibold">
                  In Stock
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-botanical-50 leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xs sm:text-sm text-gold-300 mt-1 font-medium">
                {selectedProduct.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-bold text-gold-400">${adjustedPrice}</span>
                <span className="text-sm text-botanical-400 line-through">
                  ${adjustedOriginalPrice}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  Save ${adjustedOriginalPrice - adjustedPrice}
                </span>
              </div>

              {/* Size / Volume Selector */}
              <div className="mt-5">
                <span className="text-xs uppercase font-bold tracking-wider text-botanical-300 block mb-2">
                  Select Bottle Size:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {sizeOptions.map((opt) => {
                    const active = selectedSize === opt.label;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedSize(opt.label)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          active
                            ? 'bg-botanical-800 border-gold-400 shadow-md shadow-gold-500/10'
                            : 'bg-botanical-900/60 border-botanical-800 hover:border-gold-500/30'
                        }`}
                      >
                        <span className={`text-xs font-bold block ${active ? 'text-gold-300' : 'text-botanical-200'}`}>
                          {opt.label.split(' / ')[0]}
                        </span>
                        <span className="text-[10px] text-botanical-400 block mt-0.5 truncate">
                          {opt.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Information Tabs */}
              <div className="mt-6">
                <div className="flex border-b border-botanical-800 text-xs font-semibold gap-6">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'benefits'
                        ? 'text-gold-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-400'
                        : 'text-botanical-400 hover:text-botanical-200'
                    }`}
                  >
                    Clinical Benefits
                  </button>
                  <button
                    onClick={() => setActiveTab('ritual')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'ritual'
                        ? 'text-gold-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-400'
                        : 'text-botanical-400 hover:text-botanical-200'
                    }`}
                  >
                    Ayurvedic 3-Step Ritual
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'ingredients'
                        ? 'text-gold-300 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold-400'
                        : 'text-botanical-400 hover:text-botanical-200'
                    }`}
                  >
                    Active Botanicals
                  </button>
                </div>

                <div className="py-4 text-xs text-botanical-200 leading-relaxed min-h-[110px]">
                  {activeTab === 'benefits' && (
                    <div className="space-y-2">
                      {selectedProduct.keyBenefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'ritual' && (
                    <div className="space-y-3">
                      {selectedProduct.ritualSteps.map((step) => (
                        <div key={step.step} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center shrink-0 border border-gold-500/30">
                            {step.step}
                          </span>
                          <div>
                            <strong className="text-botanical-100">{step.title}: </strong>
                            <span className="text-botanical-300">{step.instruction}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'ingredients' && (
                    <div>
                      <p className="mb-2 text-botanical-300">{selectedProduct.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedProduct.activeIngredients.map((ing, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-botanical-900 border border-gold-500/30 text-gold-300 text-[11px] font-medium"
                          >
                            🌿 {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-botanical-800 flex items-center gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center rounded-xl bg-botanical-900 border border-gold-500/30 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-botanical-200 hover:text-gold-300 hover:bg-botanical-800"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-gold-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-botanical-200 hover:text-gold-300 hover:bg-botanical-800"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-botanical-950 font-bold text-sm tracking-wide shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-botanical-950" />
                <span>Add to Cart • ${(adjustedPrice * quantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
