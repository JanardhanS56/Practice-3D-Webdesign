import React from 'react';
import { Star, CheckCircle, Sparkles, MessageSquare, Quote } from 'lucide-react';
import { REVIEWS } from '../../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-botanical-900/30 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-900 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Real Clinical Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-botanical-50">
            Over 1,400+ Verified <span className="text-gold-gradient">Scalp Transformations</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex text-gold-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-base font-bold text-gold-300">4.96 out of 5.0</span>
            <span className="text-xs text-botanical-400">• Independent Third-Party Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-3xl p-6 border border-gold-500/20 hover:border-gold-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-gold-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-botanical-400">{rev.date}</span>
                </div>

                <h3 className="font-serif font-bold text-sm text-botanical-100 mb-2 leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-botanical-300 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-botanical-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gold-300">{rev.author}</span>
                    {rev.verified && (
                      <span title="Verified Buyer">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-botanical-400 block mt-0.5">
                    {rev.hairType}
                  </span>
                </div>
                <span className="text-[10px] text-gold-400/80 bg-botanical-900/80 px-2 py-0.5 rounded-md border border-gold-500/20">
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
