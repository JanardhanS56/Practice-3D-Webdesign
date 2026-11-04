import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedVolume?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedVolume: string) => void;
  updateQuantity: (productId: string, selectedVolume: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  couponCode: string;
  discountPercentage: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vedaroots_cart_items';
const FREE_SHIPPING_THRESHOLD = 50;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product: Product, selectedVolume?: string, quantity = 1) => {
    const volume = selectedVolume || product.volume;
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedVolume === volume
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedVolume: volume, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedVolume: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedVolume === selectedVolume))
    );
  };

  const updateQuantity = (productId: string, selectedVolume: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVolume);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id === productId && i.selectedVolume === selectedVolume) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VEDA15' || clean === 'HERBAL15') {
      setCouponCode(clean);
      setDiscountPercentage(15);
      return { success: true, message: '15% Ayurvedic discount applied!' };
    }
    if (clean === 'GROWTH20') {
      setCouponCode(clean);
      setDiscountPercentage(20);
      return { success: true, message: '20% Botanical special unlocked!' };
    }
    return { success: false, message: 'Invalid code. Try VEDA15 for 15% off.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercentage(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  const afterDiscount = subtotal - discountAmount;
  const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 5.99;
  const total = Math.max(0, afterDiscount + shipping);

  const freeShippingProgress = Math.min(
    100,
    Math.round((afterDiscount / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        couponCode,
        discountPercentage,
        applyCoupon,
        removeCoupon,
        totalItems,
        subtotal,
        discountAmount,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
