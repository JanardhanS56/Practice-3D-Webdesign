import React, { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { ProductCard } from './ProductCard';

type CategoryFilter = 'all' | 'growth' | 'repair' | 'anti-dandruff';
type HairTypeFilter = 'all' | 'straight' | 'wavy' | 'curly' | 'coily';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ShopSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedHairType, setSelectedHairType] = useState<HairTypeFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Formulations' },
    { id: 'growth', label: 'Hair Density & Follicle Vitality' },
    { id: 'repair', label: 'Lipid Repair & Split End Seal' },
    { id: 'anti-dandruff', label: 'Clarifying & Microbiome Reset' },
  ];

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesHairType =
        selectedHairType === 'all' || p.hairType.includes(selectedHairType);
      return matchesCategory && matchesHairType;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [selectedCategory, selectedHairType, sortBy]);

  return (
    <section id="shop" className="py-28 px-4 sm:px-6 lg:px-8 relative bg-[#0A0705] border-t border-[#261A11]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C78D4B] uppercase">
              THE DISPENSARY ARCHIVE
            </span>
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F6F0E8] leading-tight">
            Targeted Elixirs for{' '}
            <span className="text-amber-metallic italic">Every Cuticle Porosity</span>
          </h2>
          <p className="mt-4 text-[#BCA891] text-sm sm:text-base leading-relaxed">
            Formulated in strict adherence to ancient Charaka Samhita texts. Hand-numbered batches in recyclable light-shielding amber glass.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[#261A11]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 text-xs font-sans uppercase tracking-[0.1em] transition-all border ${
                    active
                      ? 'bg-[#C78D4B] text-[#0A0705] border-[#E1B678] font-bold'
                      : 'bg-[#17110C] text-[#BCA891] border-[#261A11] hover:border-[#C78D4B]/40 hover:text-[#F6F0E8]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#17110C] text-[#BCA891] border border-[#261A11] hover:border-[#C78D4B]/40 px-4 py-2 pr-9 text-xs font-mono uppercase tracking-wider focus:outline-none cursor-pointer"
              >
                <option value="featured">Order: Curated</option>
                <option value="rating">Order: Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#C78D4B]">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Provenance Strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-[#17110C] border border-[#261A11] text-center text-xs text-[#BCA891]">
          <div className="space-y-1">
            <span className="text-[#E1B678] font-display text-base block font-bold">100% Cold-Pressed</span>
            <span className="text-[11px]">Zero thermal degradation of actives</span>
          </div>
          <div className="space-y-1 border-l border-[#261A11]">
            <span className="text-[#E1B678] font-display text-base block font-bold">60-Day Guarantee</span>
            <span className="text-[11px]">Visible root vitality or refund</span>
          </div>
          <div className="space-y-1 border-l border-[#261A11]">
            <span className="text-[#E1B678] font-display text-base block font-bold">Dark Amber Glass</span>
            <span className="text-[11px]">Blocks photo-oxidative degradation</span>
          </div>
          <div className="space-y-1 border-l border-[#261A11]">
            <span className="text-[#E1B678] font-display text-base block font-bold">Wildcrafted Kerala</span>
            <span className="text-[11px]">Sustainably harvested cooperatives</span>
          </div>
        </div>
      </div>
    </section>
  );
};
