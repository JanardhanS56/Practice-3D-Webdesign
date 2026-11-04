import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, BOTANICAL_INGREDIENTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { setSelectedProduct, addToCart } = useCart();

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.activeIngredients.some((i) => i.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredHerbs = BOTANICAL_INGREDIENTS.filter(
    (h) =>
      h.commonName.toLowerCase().includes(query.toLowerCase()) ||
      h.sanskritName.toLowerCase().includes(query.toLowerCase()) ||
      h.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel-gold rounded-2xl shadow-2xl p-6 border border-gold-500/30 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-botanical-300 hover:text-gold-300 rounded-full hover:bg-botanical-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Input */}
        <div className="relative flex items-center mb-6">
          <Search className="w-5 h-5 text-gold-400 absolute left-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search herbal oils, ingredients (e.g. Bhringraj, Rosemary), or scalp concern..."
            className="w-full pl-12 pr-4 py-3.5 bg-botanical-900/90 border border-gold-500/30 rounded-xl text-botanical-50 placeholder-botanical-400 focus:outline-none focus:border-gold-400 text-sm"
            autoFocus
          />
        </div>

        {/* Quick Tag Recommendations */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="text-botanical-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Popular:
          </span>
          {['Bhringraj', 'Hair Fall', 'Rosemary Oil', 'Neem Scalp Detox', 'Split Ends'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-botanical-900 border border-gold-500/20 text-gold-300 hover:border-gold-400 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[380px] overflow-y-auto space-y-4 pr-1">
          {/* Products Result */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-gold-400 mb-2">
              Ayurvedic Elixirs ({filteredProducts.length})
            </h4>
            <div className="space-y-2">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-botanical-900/70 border border-botanical-800 hover:border-gold-500/40 transition-colors group cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(p);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover border border-botanical-700"
                    />
                    <div>
                      <h5 className="text-sm font-semibold text-botanical-100 group-hover:text-gold-300 transition-colors">
                        {p.name}
                      </h5>
                      <span className="text-xs text-botanical-400">${p.price} • {p.volume}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs font-semibold bg-gold-500 hover:bg-gold-400 text-botanical-950 rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Botanical Herbs Result */}
          {filteredHerbs.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs uppercase font-bold tracking-widest text-gold-400 mb-2">
                Active Botanical Herbs ({filteredHerbs.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredHerbs.map((h) => (
                  <a
                    key={h.id}
                    href="#ingredients"
                    onClick={onClose}
                    className="p-3 rounded-xl bg-botanical-900/50 border border-botanical-800 hover:border-gold-500/30 transition-colors block"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-gold-300">{h.sanskritName}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-botanical-400" />
                    </div>
                    <p className="text-[11px] text-botanical-300 mt-1 line-clamp-1">{h.role}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && filteredHerbs.length === 0 && (
            <div className="text-center py-8 text-botanical-400 text-sm">
              No matching herbal formulations found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
