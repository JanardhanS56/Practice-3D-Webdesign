import React from 'react';
import { Plus, Star, ShieldCheck } from 'lucide-react';
import { SIMILAR_PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

export const SimilarProductsSection: React.FC = () => {
  const { addToCart, setSelectedProduct } = useCart();

  return (
    <section id="similar-products" className="py-28 px-4 sm:px-6 lg:px-8 relative bg-[#0A0705] border-t border-[#261A11]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#C78D4B]" />
              <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C78D4B] uppercase">
                COMPLEMENTARY ARTIFACTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F6F0E8]">
              Similar Essentials & <span className="text-amber-metallic italic">Ritual Companions</span>
            </h2>
            <p className="mt-3 text-[#BCA891] text-sm sm:text-base max-w-2xl">
              Amplifying the trans-follicular delivery of botanical oil requires mechanical micro-stimulation. Pair your elixir with medicinal neem wood tools and restorative clay wraps.
            </p>
          </div>

          <div className="text-xs text-[#BCA891] bg-[#17110C] px-5 py-3 border border-[#261A11] font-mono">
            ★ 3x Cutaneous Absorption when paired with cranial acupressure
          </div>
        </div>

        {/* Similar Products Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIMILAR_PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="maison-card border border-[#261A11] hover:border-[#C78D4B]/40 flex flex-col justify-between p-8 group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video overflow-hidden mb-6 bg-[#17110C] border border-[#261A11]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[15%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A0705]/90 border border-[#C78D4B]/30 text-[#E1B678] text-[9px] font-mono tracking-widest uppercase">
                    {item.badge}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-[#E1B678] text-xs mb-2 font-mono">
                  <span>★ {item.rating}</span>
                  <span className="text-[#BCA891]/50">({item.reviewCount} reviews)</span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedProduct(item)}
                  className="font-display font-medium text-2xl text-[#F6F0E8] group-hover:text-[#E1B678] cursor-pointer transition-colors leading-snug"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-[#BCA891] mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Key benefit */}
                <div className="mt-4 flex items-center gap-2 text-xs text-[#E1B678] font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C78D4B] shrink-0" />
                  <span className="line-clamp-1">{item.keyBenefits[0]}</span>
                </div>
              </div>

              {/* Price and Add button */}
              <div className="mt-8 pt-5 border-t border-[#261A11] flex items-center justify-between">
                <div>
                  <span className="text-xl font-display text-[#E1B678]">${item.price}</span>
                  <span className="text-xs text-[#BCA891]/50 line-through ml-2">
                    ${item.originalPrice}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="btn-maison-outline text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-[#C78D4B]" />
                  <span>Acquire Pair</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
