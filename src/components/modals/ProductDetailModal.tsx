import React, { useState } from 'react';
import { X, Star, Check, Shield, Clock, Award, Plus } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0A0705] border border-[#C78D4B]/40 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-[#17110C] text-[#BCA891] hover:text-[#E1B678] border border-[#261A11] hover:border-[#C78D4B] transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#261A11] bg-[#17110C]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#0A0705]/90 border border-[#C78D4B]/40 text-[#E1B678] text-[9px] font-mono tracking-widest uppercase">
                  {selectedProduct.badge}
                </div>
              )}
            </div>

            <div className="p-4 bg-[#17110C] border border-[#261A11] text-xs text-[#BCA891] space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C78D4B] shrink-0" />
                <span>60-Day Follicle Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C78D4B] shrink-0" />
                <span>Dispatches within 24h in light-protective casing</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C78D4B] shrink-0" />
                <span>Ayurvedic Pharmacopoeia Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="text-[#E1B678]">★ {selectedProduct.rating}</span>
                <span className="text-[#BCA891]/60">({selectedProduct.reviewCount} customer reviews)</span>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-[#C78D4B]">
                  In Stock
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-3xl font-display font-medium text-[#F6F0E8] leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-[#E1B678] mt-1 font-mono uppercase tracking-wider">
                {selectedProduct.tagline}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-display text-[#E1B678]">${adjustedPrice}</span>
                <span className="text-sm text-[#BCA891]/50 line-through">
                  ${adjustedOriginalPrice}
                </span>
              </div>

              {/* Size / Volume */}
              <div className="mt-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCA891] block mb-2">
                  Select Volume:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions.map((opt) => {
                    const active = selectedSize === opt.label;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedSize(opt.label)}
                        className={`p-3 border text-left transition-all ${
                          active
                            ? 'bg-[#17110C] border-[#C78D4B] text-[#E1B678]'
                            : 'bg-[#0A0705] border-[#261A11] text-[#BCA891] hover:border-[#C78D4B]/30'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold block">
                          {opt.label.split(' / ')[0]}
                        </span>
                        <span className="text-[10px] text-[#BCA891]/60 block mt-0.5 truncate">
                          {opt.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Information Tabs */}
              <div className="mt-6">
                <div className="flex border-b border-[#261A11] text-xs font-mono uppercase tracking-wider gap-6">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'benefits'
                        ? 'text-[#E1B678] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C78D4B]'
                        : 'text-[#BCA891]/60 hover:text-[#BCA891]'
                    }`}
                  >
                    Clinical Actions
                  </button>
                  <button
                    onClick={() => setActiveTab('ritual')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'ritual'
                        ? 'text-[#E1B678] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C78D4B]'
                        : 'text-[#BCA891]/60 hover:text-[#BCA891]'
                    }`}
                  >
                    Shiro-Abhyanga
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'ingredients'
                        ? 'text-[#E1B678] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C78D4B]'
                        : 'text-[#BCA891]/60 hover:text-[#BCA891]'
                    }`}
                  >
                    Botanicals
                  </button>
                </div>

                <div className="py-4 text-xs text-[#BCA891] leading-relaxed min-h-[110px]">
                  {activeTab === 'benefits' && (
                    <div className="space-y-2">
                      {selectedProduct.keyBenefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C78D4B] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'ritual' && (
                    <div className="space-y-3">
                      {selectedProduct.ritualSteps.map((step) => (
                        <div key={step.step} className="flex items-start gap-3">
                          <span className="w-5 h-5 bg-[#17110C] text-[#E1B678] border border-[#261A11] font-mono text-[10px] flex items-center justify-center shrink-0">
                            {step.step}
                          </span>
                          <div>
                            <strong className="text-[#F6F0E8]">{step.title}: </strong>
                            <span>{step.instruction}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'ingredients' && (
                    <div>
                      <p className="mb-2 leading-relaxed">{selectedProduct.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedProduct.activeIngredients.map((ing, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-[#17110C] border border-[#261A11] text-[#E1B678] text-[10px] font-mono"
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

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#261A11] flex items-center gap-4">
              <div className="flex items-center bg-[#17110C] border border-[#261A11] text-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#BCA891] hover:text-[#E1B678]"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono font-bold text-[#E1B678]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#BCA891] hover:text-[#E1B678]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-maison-primary flex-1 py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Acquire Formulation • ${(adjustedPrice * quantity).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
