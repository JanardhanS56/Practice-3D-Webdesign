import React from 'react';
import { Star, Check } from 'lucide-react';
import { REVIEWS } from '../../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-28 px-4 sm:px-6 lg:px-8 relative bg-[#0A0705] border-t border-[#261A11]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C78D4B] uppercase">
              THE CLINICAL LEDGER
            </span>
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F6F0E8]">
            Over 1,400+ Documented <span className="text-amber-metallic italic">Transformations</span>
          </h2>

          <div className="flex items-center justify-center gap-3 mt-4 text-xs font-mono text-[#BCA891]">
            <span className="text-[#E1B678] font-bold">★ 4.96 / 5.0</span>
            <span>•</span>
            <span className="uppercase tracking-wider">Independent Third-Party Verification</span>
          </div>
        </div>

        {/* Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="maison-card p-6 border border-[#261A11] hover:border-[#C78D4B]/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#261A11] text-[11px] font-mono text-[#BCA891]">
                  <span className="text-[#E1B678]">{'★'.repeat(rev.rating)}</span>
                  <span>{rev.date}</span>
                </div>

                <h3 className="font-display font-medium text-lg text-[#F6F0E8] mb-3 leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-[#BCA891] leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#261A11] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-display text-[#E1B678] font-bold">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[9px] font-mono text-[#C78D4B]">✓</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[#BCA891]/60 block mt-0.5">
                    {rev.hairType}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#BCA891] bg-[#17110C] px-2 py-0.5 border border-[#261A11]">
                  {rev.durationUsed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
