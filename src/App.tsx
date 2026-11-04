import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { ScrollStage3D } from './components/3d/ScrollStage3D';
import { MonolithicHero } from './components/hero/MonolithicHero';
import { MacerationScrubber } from './components/maceration/MacerationScrubber';
import { HerbariumLedger } from './components/ingredients/HerbariumLedger';
import { ArchivalDispensary } from './components/shop/ArchivalDispensary';
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
  const [macerationHours, setMacerationHours] = useState(336);

  return (
    <div className="min-h-screen bg-[#0A0705] text-[#F6F0E8] flex flex-col relative selection:bg-[#C78D4B] selection:text-[#0A0705]">
      {/* 1. Velvet Ceremonial Curtain Entry Loader */}
      <CurtainLoader onComplete={() => {}} />

      {/* 2. Magnetic Blend Custom Cursor */}
      <CustomCursor />

      {/* 3. Global Sticky Navbar */}
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* 4. Luxury Search Modal */}
      <LuxurySearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* 5. Scroll-Pinned 3D Stage (Interpolates bottle across Acts I to IV) */}
      <ScrollStage3D macerationHours={macerationHours} />

      {/* Main Chapter Journey */}
      <main className="flex-1 relative z-20">
        {/* Act I: The Monolithic Hero */}
        <MonolithicHero />

        {/* Act II: The 336-Hour Copper Cauldron Maceration Timeline (Signature Moment) */}
        <MacerationScrubber
          hours={macerationHours}
          onHoursChange={(h) => setMacerationHours(h)}
        />

        {/* Act III: The Sacred Herbarium Specimen Dossier (No Card Cemetery) */}
        <HerbariumLedger />

        {/* Act IV: The Curated Dispensary Archive & Catalog */}
        <ArchivalDispensary />

        {/* Act V: Complementary Artifacts & Ritual Companions */}
        <SimilarProductsSection />

        {/* Act VI: Ayurvedic Scalp Longevity Diagnostic Consultation */}
        <HairQuizSection />

        {/* Act VII: The Classical Shiro-Abhyanga Ceremony */}
        <RitualGuideSection />

        {/* Act VIII: The Clinical Ledger of Documented Transformations */}
        <ReviewsSection />

        {/* Act IX: Pharmacopoeia Inquiries Accordion */}
        <FaqSection />
      </main>

      {/* Monolithic Maison Footer */}
      <Footer />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* Product Monograph Modal */}
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
