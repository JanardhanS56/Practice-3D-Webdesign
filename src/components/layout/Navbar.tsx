import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Compass, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  onSearchOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchOpen }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '3D Experience', href: '#hero' },
    { label: 'Sacred Botanicals', href: '#ingredients' },
    { label: 'The Dispensary', href: '#shop' },
    { label: 'Ritual Companions', href: '#similar-products' },
    { label: 'Scalp Oracle', href: '#quiz' },
    { label: 'Ceremony', href: '#rituals' },
    { label: 'Ledger', href: '#reviews' },
  ];

  return (
    <>
      {/* Top Provenance Ribbon */}
      <div className="bg-[#17110C] border-b border-[#261A11] text-[10px] py-2 px-4 text-center font-mono tracking-[0.2em] text-[#BCA891] uppercase flex items-center justify-center gap-3">
        <span>Taila Paka Vidhi • 336-Hour Cold Copper Maceration</span>
        <span className="hidden md:inline text-[#C78D4B]">• Courtesy Code <strong>VEDA15</strong> for 15% Courtesy</span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0705]/90 backdrop-blur-md py-3 border-b border-[#261A11]'
            : 'bg-[#0A0705]/50 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-[#C78D4B]/50 bg-[#17110C] flex items-center justify-center transition-colors group-hover:border-[#E1B678]">
              <span className="text-xs font-serif text-[#E1B678] font-bold">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-display tracking-[0.08em] text-[#F6F0E8] font-medium leading-none">
                VEDAROOTS
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#BCA891] uppercase mt-1">
                MAISON DE BOTANIQUE
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-sans tracking-[0.12em] uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#BCA891] hover:text-[#E1B678] transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={onSearchOpen}
              className="p-2 text-[#BCA891] hover:text-[#E1B678] transition-colors"
              aria-label="Search herbs & elixirs"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-1.5 border border-[#C78D4B]/30 bg-[#17110C] hover:border-[#C78D4B] text-[#E1B678] transition-all group"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono tracking-widest hidden sm:inline">CART</span>
              <span className="w-4 h-4 bg-[#C78D4B] text-[#0A0705] font-mono font-bold text-[10px] flex items-center justify-center">
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#BCA891] hover:text-[#E1B678] lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0705] border-b border-[#261A11] px-4 pt-4 pb-6 animate-fadeIn">
            <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-2 text-[#BCA891] hover:text-[#E1B678] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
