import React from 'react';
import { Star, Eye, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useCart();

  return (
    <div className="group maison-card border border-[#261A11] hover:border-[#C78D4B]/50 flex flex-col justify-between overflow-hidden relative">
      {/* Product Image Stage */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#17110C]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
          loading="lazy"
        />

        {/* Archival Provenance Seal */}
        {product.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#0A0705]/90 border border-[#C78D4B]/40 text-[#E1B678] text-[10px] font-mono tracking-widest uppercase">
            {product.badge}
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-[#0A0705]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => setSelectedProduct(product)}
            className="p-3 bg-[#17110C] text-[#E1B678] border border-[#C78D4B]/40 hover:bg-[#C78D4B] hover:text-[#0A0705] transition-all"
            title="Inspect Pharmacopoeia"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => addToCart(product)}
            className="btn-maison-primary py-3 px-5 text-xs flex items-center gap-2"
            title="Acquire Formulation"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Acquire</span>
          </button>
        </div>
      </div>

      {/* Editorial Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#0A0705]/95 border-t border-[#261A11]">
        <div>
          {/* Rating & Volume */}
          <div className="flex items-center justify-between text-xs text-[#BCA891] mb-2 font-mono">
            <span className="flex items-center gap-1 text-[#E1B678]">
              ★ {product.rating}
              <span className="text-[#BCA891]/60">({product.reviewCount})</span>
            </span>
            <span className="text-[11px] tracking-wider uppercase">{product.volume}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-xl font-display font-medium text-[#F6F0E8] group-hover:text-[#E1B678] cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#BCA891] mt-1 line-clamp-1">{product.subtitle}</p>

          {/* Actives Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.activeIngredients.slice(0, 3).map((herb, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-[#17110C] border border-[#261A11] text-[10px] text-[#BCA891] font-mono"
              >
                {herb}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Acquisition */}
        <div className="pt-4 border-t border-[#261A11] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display text-[#E1B678]">${product.price}</span>
            <span className="text-xs text-[#BCA891]/50 line-through">
              ${product.originalPrice}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="text-xs font-sans uppercase tracking-widest text-[#C78D4B] hover:text-[#E1B678] transition-colors flex items-center gap-1.5 py-1"
          >
            <span>Acquire</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
