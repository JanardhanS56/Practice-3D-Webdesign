import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck, Truck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e5b23d', '#f5cf74', '#759d77', '#ffffff'],
      });
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel-gold border-l border-gold-500/30 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-gold-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="text-lg font-serif font-bold text-botanical-50">
                Your Botanical Cart
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-botanical-900 border border-gold-500/30 text-gold-300 font-semibold">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-botanical-300 hover:text-gold-300 rounded-full hover:bg-botanical-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-botanical-900/90 border-b border-botanical-800 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-botanical-200">
                <Truck className="w-4 h-4 text-gold-400" />
                {shipping === 0
                  ? '🎉 Free Expedited Shipping Unlocked!'
                  : `Add $${(freeShippingThreshold - (subtotal - discountAmount)).toFixed(2)} more for Free Shipping`}
              </span>
              <span className="text-gold-400 font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-botanical-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Content / Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderComplete ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400 text-gold-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-botanical-50">
                  Ayurvedic Elixir Secured!
                </h3>
                <p className="text-xs text-botanical-300 max-w-xs mx-auto leading-relaxed">
                  Thank you for embracing botanical wellness. Your fresh batch order #VR-{Math.floor(100000 + Math.random() * 900000)} is being cold-macerated and packed.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-botanical-950 font-bold text-xs uppercase tracking-wider"
                >
                  Continue Exploring
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-botanical-900 border border-botanical-800 flex items-center justify-center mx-auto text-botanical-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif font-bold text-botanical-200">
                  Your cart is empty
                </h3>
                <p className="text-xs text-botanical-400 max-w-xs mx-auto">
                  Explore our cold-pressed herbal formulations to begin your Ayurvedic hair vitality ritual.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-botanical-950 border border-gold-500/30 text-xs font-semibold tracking-wide transition-all"
                >
                  Explore Dispensary
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVolume}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-botanical-900/70 border border-botanical-800"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover shrink-0 border border-botanical-700 w-16 h-16"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-botanical-100 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVolume)}
                          className="text-botanical-500 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-botanical-400 block mt-0.5">
                        {item.selectedVolume}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded-lg bg-botanical-950 border border-botanical-800 text-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedVolume, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-botanical-300 hover:text-gold-300"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-gold-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedVolume, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-botanical-300 hover:text-gold-300"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-gold-400">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {!orderComplete && items.length > 0 && (
            <div className="p-5 border-t border-gold-500/20 bg-botanical-950/90 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Promo code (e.g. VEDA15)"
                  className="flex-1 px-3 py-2 bg-botanical-900 border border-botanical-800 rounded-xl text-xs text-botanical-100 placeholder-botanical-500 focus:outline-none focus:border-gold-500/50 uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-botanical-900 hover:bg-botanical-800 text-gold-300 border border-gold-500/30 rounded-xl text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <p
                  className={`text-[11px] ${
                    couponFeedback.success ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}

              {couponCode && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                  <span>Applied: <strong>{couponCode}</strong></span>
                  <button onClick={removeCoupon} className="text-botanical-400 hover:text-rose-400 text-[10px]">
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-botanical-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Ayurvedic Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gold-300 pt-2 border-t border-botanical-800">
                  <span>Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-botanical-950 font-bold text-sm tracking-wide shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
              >
                {isCheckingOut ? (
                  <div className="w-5 h-5 rounded-full border-2 border-botanical-950 border-t-transparent animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-botanical-950" />
                    <span>Instant Secure Checkout • ${total.toFixed(2)}</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-center text-botanical-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>256-Bit Encrypted • 60-Day Guarantee • Carbon Neutral</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
