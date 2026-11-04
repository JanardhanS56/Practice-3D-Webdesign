import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { IngredientsSection } from './components/ingredients/IngredientsSection';
import { ShopSection } from './components/shop/ShopSection';
import { SimilarProductsSection } from './components/shop/SimilarProductsSection';
import { HairQuizSection } from './components/quiz/HairQuizSection';
import { RitualGuideSection } from './components/rituals/RitualGuideSection';
import { ReviewsSection } from './components/reviews/ReviewsSection';
import { FaqSection } from './components/common/FaqSection';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { SearchModal } from './components/common/SearchModal';

const MainContent: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-botanical-950 text-botanical-50 flex flex-col relative selection:bg-gold-500 selection:text-botanical-950">
      {/* Sticky Header Navigation */}
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* Global Interactive Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Showcase with 3D Bottle */}
        <HeroSection />

        {/* 2. Sacred Ayurvedic Botanicals Explorer */}
        <IngredientsSection />

        {/* 3. The Dispensary / Shop Collection */}
        <ShopSection />

        {/* 4. Similar Products & Ritual Companions */}
        <SimilarProductsSection />

        {/* 5. Interactive Hair Diagnostic & Ritual Finder Quiz */}
        <HairQuizSection />

        {/* 6. Sacred Shiro-Abhyanga 3-Step Guide */}
        <RitualGuideSection />

        {/* 7. Clinical Proof & Verified Customer Reviews */}
        <ReviewsSection />

        {/* 8. Frequently Asked Questions Accordion */}
        <FaqSection />
      </main>

      {/* Botanical Footer */}
      <Footer />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* Product Deep-Dive Quick-View Modal */}
      <ProductDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
