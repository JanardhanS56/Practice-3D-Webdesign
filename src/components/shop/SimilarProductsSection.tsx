import React from 'react';
import { Sparkles, Plus, Star, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SIMILAR_PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

export const SimilarProductsSection: React.FC = () => {
  const { addToCart, setSelectedProduct } = useCart();

  return (
    <section id="similar-products" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-botanical-900/30 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-800/80 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Synergistic Ayurvedic Pairs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-botanical-50">
              Similar Essentials & <span className="text-gold-gradient">Ritual Companions</span>
            </h2>
            <p className="mt-2 text-botanical-200 text-sm sm:text-base max-w-2xl">
              Amplifying the effects of herbal oil requires proper mechanical micro-stimulation. Pair your hair oil with medicinal neem wood tools and restorative herbal clay wraps.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-botanical-300 bg-botanical-900/80 px-4 py-2 rounded-xl border border-botanical-800 w-fit">
            <HeartHandshake className="w-4 h-4 text-gold-400" />
            <span>3x Absorption when paired with scalp acupressure</span>
          </div>
        </div>

        {/* Similar Products Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIMILAR_PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl border border-gold-500/20 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between p-6 group hover:shadow-xl hover:shadow-black/40"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-botanical-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-botanical-950/80 border border-gold-500/30 text-gold-300 text-[10px] font-bold uppercase tracking-wider">
                    {item.badge}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-gold-400 text-xs mb-2">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">{item.rating}</span>
                  <span className="text-botanical-400">({item.reviewCount} reviews)</span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedProduct(item)}
                  className="font-serif font-bold text-lg text-botanical-100 group-hover:text-gold-300 cursor-pointer transition-colors"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-botanical-300 mt-1 line-clamp-2">
                  {item.description}
                </p>

                {/* Key benefit bullet */}
                <div className="mt-4 flex items-center gap-2 text-xs text-gold-300/90 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span className="line-clamp-1">{item.keyBenefits[0]}</span>
                </div>
              </div>

              {/* Price and Add button */}
              <div className="mt-6 pt-4 border-t border-botanical-800 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gold-400">${item.price}</span>
                  <span className="text-xs text-botanical-400 line-through ml-2">
                    ${item.originalPrice}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="px-4 py-2 rounded-xl bg-gold-500 text-botanical-950 hover:bg-gold-400 font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 active:scale-95 shadow-md shadow-gold-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Ritual Pair</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
