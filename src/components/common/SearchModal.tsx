import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, BOTANICAL_INGREDIENTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC = () => {
  return null; // Will export below
};

export const LuxurySearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0A0705] border border-[#C78D4B]/40 shadow-2xl p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#BCA891] hover:text-[#E1B678] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Input */}
        <div className="relative flex items-center mb-6 border-b border-[#261A11] pb-3">
          <Search className="w-4 h-4 text-[#C78D4B] absolute left-1" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pharmacopoeia (e.g. Bhringraj, Rosemary, Hair Fall)..."
            className="w-full pl-8 pr-4 py-2 bg-transparent text-sm font-mono text-[#F6F0E8] placeholder-[#BCA891]/40 focus:outline-none"
            autoFocus
          />
        </div>

        {/* Quick Tag Recommendations */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-[11px] font-mono text-[#BCA891]">
          <span className="text-[#C78D4B]">Active Queries:</span>
          {['Bhringraj', 'Telogen Effluvium', 'Rosemary Oil', 'Neem Scalp Detox'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-[#17110C] border border-[#261A11] hover:border-[#C78D4B]/40 hover:text-[#E1B678] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[360px] overflow-y-auto space-y-4 pr-1">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E1B678] mb-3 block">
              Ayurvedic Elixirs ({filteredProducts.length})
            </span>
            <div className="space-y-2">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3.5 bg-[#17110C] border border-[#261A11] hover:border-[#C78D4B]/40 transition-colors group cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(p);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover border border-[#261A11]"
                    />
                    <div>
                      <h5 className="text-sm font-display text-[#F6F0E8] group-hover:text-[#E1B678] transition-colors">
                        {p.name}
                      </h5>
                      <span className="text-[11px] font-mono text-[#BCA891]">${p.price} • {p.volume}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                      onClose();
                    }}
                    className="btn-maison-outline py-1 px-3 text-[10px] uppercase font-mono"
                  >
                    Acquire
                  </button>
                </div>
              ))}
            </div>
          </div>

          {filteredHerbs.length > 0 && (
            <div className="pt-4 border-t border-[#261A11]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E1B678] mb-3 block">
                Active Botanical Monographs ({filteredHerbs.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredHerbs.map((h) => (
                  <a
                    key={h.id}
                    href="#ingredients"
                    onClick={onClose}
                    className="p-3 bg-[#17110C] border border-[#261A11] hover:border-[#C78D4B]/40 transition-colors block"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-display text-[#E1B678] font-bold">{h.sanskritName}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#BCA891]" />
                    </div>
                    <p className="text-[10px] text-[#BCA891] mt-1 line-clamp-1">{h.role}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
