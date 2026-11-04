import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, Leaf, ShieldCheck, Heart } from 'lucide-react';
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
    { label: 'Ayurvedic Botanicals', href: '#ingredients' },
    { label: 'Shop Elixirs', href: '#shop' },
    { label: 'Similar Essentials', href: '#similar-products' },
    { label: 'Hair Diagnostic', href: '#quiz' },
    { label: 'Hair Ritual', href: '#rituals' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-botanical-900 via-botanical-800 to-botanical-900 border-b border-gold-500/20 text-xs py-2 px-4 text-center tracking-wider text-gold-300 font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        <span>Complimentary Handcrafted Neem Wood Comb on all orders above $50</span>
        <span className="hidden md:inline text-gold-500/60">• Use code <strong>VEDA15</strong> for 15% off</span>
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-lg shadow-black/40 py-3 border-b border-gold-500/20'
            : 'bg-botanical-950/70 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-gold-400/40 bg-botanical-900 flex items-center justify-center shadow-inner group-hover:border-gold-400 transition-colors">
              <Leaf className="w-5 h-5 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif tracking-widest text-gold-gradient font-bold leading-none">
                VEDAROOTS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-botanical-300 uppercase font-medium mt-0.5">
                Ayurvedic Alchemy
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-botanical-200 hover:text-gold-300 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-400 hover:after:w-full after:transition-all after:duration-300"
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
              className="p-2 text-botanical-200 hover:text-gold-300 rounded-full hover:bg-botanical-900 transition-colors"
              aria-label="Search herbs & elixirs"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-botanical-900/80 hover:bg-botanical-800 text-gold-300 transition-all hover:border-gold-400 group"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wider hidden sm:inline">CART</span>
              <span className="w-5 h-5 rounded-full bg-gold-500 text-botanical-950 font-bold text-xs flex items-center justify-center">
                {totalItems}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-botanical-200 hover:text-gold-300 lg:hidden rounded-lg hover:bg-botanical-900"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-b border-gold-500/20 px-4 pt-3 pb-6 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base text-botanical-100 hover:text-gold-300 hover:bg-botanical-900/60 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-botanical-800 flex justify-between items-center text-xs text-botanical-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-400" /> 100% Ayurvedic Certified
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400" /> Cruelty-Free
                </span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
