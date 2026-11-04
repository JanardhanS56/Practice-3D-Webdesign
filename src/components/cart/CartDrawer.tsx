import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Truck, Check, Plus } from 'lucide-react';
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
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C78D4B', '#E1B678', '#F6F0E8', '#261A11'],
      });
      clearCart();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0705] border-l border-[#C78D4B]/30 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-[#261A11] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-display font-medium text-[#F6F0E8]">
                Botanical Cart
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#17110C] border border-[#261A11] text-[#E1B678]">
                {items.reduce((s, i) => s + i.quantity, 0)} ITEMS
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#BCA891] hover:text-[#E1B678] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-[#17110C] border-b border-[#261A11] text-xs">
            <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-[#BCA891]">
                <Truck className="w-3.5 h-3.5 text-[#C78D4B]" />
                {shipping === 0
                  ? 'Complimentary Delivery Unlocked'
                  : `Add $${(freeShippingThreshold - (subtotal - discountAmount)).toFixed(2)} for Complimentary Delivery`}
              </span>
              <span className="text-[#E1B678]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1 bg-[#0A0705]">
              <div
                className="h-full bg-[#C78D4B] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 border border-[#C78D4B] text-[#E1B678] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#F6F0E8]">
                  Order Confirmed
                </h3>
                <p className="text-xs text-[#BCA891] max-w-xs mx-auto leading-relaxed">
                  Your fresh batch order #VR-{Math.floor(100000 + Math.random() * 900000)} has entered the 336-hour copper maceration schedule.
                </p>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="btn-maison-outline text-xs tracking-widest uppercase mt-4"
                >
                  Return to Dispensary
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <span className="text-xs font-mono tracking-widest text-[#BCA891]/50 uppercase block">
                  Your botanical cart is empty
                </span>
                <p className="text-xs text-[#BCA891] max-w-xs mx-auto">
                  Select your bespoke cold-pressed hair oil to initiate your restorative ritual.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-maison-outline text-xs tracking-widest uppercase"
                >
                  Explore Dispensary
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVolume}`}
                  className="flex gap-4 p-4 bg-[#17110C] border border-[#261A11]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover shrink-0 border border-[#261A11]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-display text-[#F6F0E8] line-clamp-1 font-bold">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVolume)}
                          className="text-[#BCA891]/50 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] font-mono text-[#BCA891] block mt-0.5">
                        {item.selectedVolume}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-[#0A0705] border border-[#261A11] text-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedVolume, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#BCA891] hover:text-[#E1B678]"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-[#E1B678]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedVolume, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#BCA891] hover:text-[#E1B678]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-display text-[#E1B678] font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {!orderComplete && items.length > 0 && (
            <div className="p-6 border-t border-[#261A11] bg-[#17110C] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Code (e.g. VEDA15)"
                  className="flex-1 px-3 py-2 bg-[#0A0705] border border-[#261A11] text-xs text-[#F6F0E8] placeholder-[#BCA891]/40 focus:outline-none focus:border-[#C78D4B] uppercase font-mono"
                />
                <button
                  type="submit"
                  className="btn-maison-outline px-4 py-2 text-xs tracking-wider uppercase font-mono"
                >
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <p className={`text-[10px] font-mono ${couponFeedback.success ? 'text-[#E1B678]' : 'text-rose-400'}`}>
                  {couponFeedback.message}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#BCA891] font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#E1B678]">
                    <span>Courtesy Reduction</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-display font-medium text-[#E1B678] pt-2 border-t border-[#261A11]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Instant Checkout Button */}
              <button
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="btn-maison-primary w-full py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <div className="w-4 h-4 border-2 border-[#0A0705] border-t-transparent animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Proceed to Acquisition • ${total.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
