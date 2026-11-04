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
import { LuxurySearchModal } from './components/common/SearchModal';
import { CustomCursor } from './components/common/CustomCursor';
import { CurtainLoader } from './components/common/CurtainLoader';

const MainContent: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#F6F0E8] flex flex-col relative selection:bg-[#C78D4B] selection:text-[#0A0705]">
      {/* 1. Velvet Ceremonial Curtain Entry Loader */}
      <CurtainLoader onComplete={() => setLoaderComplete(true)} />

      {/* 2. Magnetic Blend Custom Cursor */}
      <CustomCursor />

      {/* 3. Sticky Navbar Header */}
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* 4. Architectural Search Modal */}
      <LuxurySearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Exhibition Sections */}
      <main className="flex-1">
        {/* Hero with Amber Caustic WebGL Shader & 3D Hotspot Bottle */}
        <HeroSection />

        {/* The 24 Sacred Botanicals Pharmacopoeia */}
        <IngredientsSection />

        {/* The Dispensary Archive & Catalog */}
        <ShopSection />

        {/* Complementary Artifacts & Ritual Companions */}
        <SimilarProductsSection />

        {/* Ayurvedic Scalp Longevity Diagnostic Consultation */}
        <HairQuizSection />

        {/* The Classical Shiro-Abhyanga Ceremony */}
        <RitualGuideSection />

        {/* The Clinical Ledger of 1,400+ Documented Transformations */}
        <ReviewsSection />

        {/* Frequently Documented Inquiries */}
        <FaqSection />
      </main>

      {/* Monolithic Maison Footer */}
      <Footer />

      {/* Botanical Cart Drawer */}
      <CartDrawer />

      {/* Product Pharmacopoeia Quick-View Modal */}
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
