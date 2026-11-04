import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, Check } from 'lucide-react';
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
    { id: 'growth', label: 'Hair Density & Growth' },
    { id: 'repair', label: 'Damage & Split End Repair' },
    { id: 'anti-dandruff', label: 'Clarifying & Anti-Dandruff' },
  ];

  const hairTypes: { id: HairTypeFilter; label: string }[] = [
    { id: 'all', label: 'All Hair Textures' },
    { id: 'straight', label: 'Type 1 Straight' },
    { id: 'wavy', label: 'Type 2 Wavy' },
    { id: 'curly', label: 'Type 3 Curly' },
    { id: 'coily', label: 'Type 4 Coily' },
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
    <section id="shop" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-900 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Curated Ayurvedic Dispensary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-botanical-50 leading-tight">
            Targeted Hair Elixirs for{' '}
            <span className="text-gold-gradient">Every Scalp Need</span>
          </h2>
          <p className="mt-4 text-botanical-200 text-base sm:text-lg">
            Formulated in accordance with ancient Charaka Samhita pharmacopoeia.
            Filtered by bioactive action and individual hair porosities.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-gold-500/15">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-gold-500 text-botanical-950 shadow-md shadow-gold-500/20'
                      : 'bg-botanical-900/60 text-botanical-300 hover:text-gold-300 hover:bg-botanical-900 border border-botanical-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sub Filters: Hair Type & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Hair Type Dropdown */}
            <div className="relative">
              <select
                value={selectedHairType}
                onChange={(e) => setSelectedHairType(e.target.value as HairTypeFilter)}
                className="appearance-none bg-botanical-900/90 text-botanical-200 border border-gold-500/20 hover:border-gold-500/40 rounded-xl px-4 py-2 pr-9 text-xs font-semibold tracking-wide focus:outline-none cursor-pointer"
              >
                {hairTypes.map((t) => (
                  <option key={t.id} value={t.id} className="bg-botanical-950 text-botanical-200">
                    {t.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-botanical-900/90 text-botanical-200 border border-gold-500/20 hover:border-gold-500/40 rounded-xl px-4 py-2 pr-9 text-xs font-semibold tracking-wide focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-botanical-950 text-botanical-200">Sort: Featured</option>
                <option value="rating" className="bg-botanical-950 text-botanical-200">Sort: Highest Rated</option>
                <option value="price-asc" className="bg-botanical-950 text-botanical-200">Price: Low to High</option>
                <option value="price-desc" className="bg-botanical-950 text-botanical-200">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Trust Badges Strip under Shop */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass-panel border border-gold-500/15 text-center text-xs text-botanical-300">
          <div className="flex flex-col items-center gap-1">
            <span className="text-gold-400 font-bold text-sm">✓ 100% Cold-Pressed</span>
            <span>No thermal degradation of herb actives</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-botanical-800">
            <span className="text-gold-400 font-bold text-sm">✓ 60-Day Guarantee</span>
            <span>Visible growth or full refund</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-botanical-800">
            <span className="text-gold-400 font-bold text-sm">✓ Recyclable Amber Glass</span>
            <span>Shields precious lipids from UV damage</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-botanical-800">
            <span className="text-gold-400 font-bold text-sm">✓ Ethically Wildcrafted</span>
            <span>Fair-trade sourced from Kerala & Ghats</span>
          </div>
        </div>
      </div>
    </section>
  );
};
