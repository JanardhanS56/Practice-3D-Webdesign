import React from 'react';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useCart();

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group rounded-3xl glass-panel border border-gold-500/20 hover:border-gold-400/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/50">
      {/* Product Image Area */}
      <div className="relative w-full aspect-square overflow-hidden bg-botanical-900/60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-botanical-950/85 border border-gold-500/40 text-gold-300 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>{product.badge}</span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gold-500 text-botanical-950 font-bold text-xs shadow-md">
            Save {discountPercent}%
          </div>
        )}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => setSelectedProduct(product)}
            className="p-3 rounded-full bg-botanical-950/90 text-gold-300 border border-gold-500/40 hover:bg-gold-500 hover:text-botanical-950 transition-all transform translate-y-4 group-hover:translate-y-0"
            title="Inspect Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => addToCart(product)}
            className="p-3 rounded-full bg-gold-500 text-botanical-950 hover:bg-gold-400 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg"
            title="Quick Add to Cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center text-gold-400">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-xs font-bold text-gold-300">{product.rating}</span>
            <span className="text-xs text-botanical-400">({product.reviewCount})</span>
            <span className="text-xs text-botanical-500 ml-auto">{product.volume}</span>
          </div>

          {/* Title & Subtitle */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-lg font-serif font-bold text-botanical-100 group-hover:text-gold-300 cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-xs text-botanical-300 mt-1 line-clamp-1">{product.subtitle}</p>

          {/* Active Ingredients Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.activeIngredients.slice(0, 3).map((herb, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-botanical-900 border border-botanical-800 text-[10px] text-botanical-300"
              >
                {herb}
              </span>
            ))}
            {product.activeIngredients.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] text-gold-400">
                +{product.activeIngredients.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-botanical-800 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gold-400">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-botanical-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 rounded-xl bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-botanical-950 border border-gold-500/30 font-semibold text-xs transition-all flex items-center gap-1.5 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
