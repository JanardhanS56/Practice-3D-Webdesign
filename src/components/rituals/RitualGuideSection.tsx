import React from 'react';
import { Sparkles, Flame, Moon, Sparkle, Heart } from 'lucide-react';

export const RitualGuideSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Warm & Activate',
      icon: <Flame className="w-5 h-5 text-gold-400" />,
      tagline: 'Unlock Heat-Activated Volatiles',
      description:
        'Warm 1-2 tablespoons of oil in a small ceramic bowl placed in warm water for 2 minutes. Gentle heat lowers oil viscosity, allowing bioactive phytochemicals to penetrate deep into follicular matrices.',
      proTip: 'Never microwave herbal oil directly; excessive heat destroys delicate vitamin structures.',
    },
    {
      step: '02',
      title: 'Shiro-Abhyanga Massage',
      icon: <Sparkle className="w-5 h-5 text-gold-400" />,
      tagline: 'Stimulate Cranial Marma Points',
      description:
        'Part hair into 4 quadrants. Using pads of fingertips or a wooden neem comb, massage in gentle, rhythmic circular motions for 7-10 minutes. Stimulates micro-capillary flow and calms the central nervous system.',
      proTip: 'Focus gentle pressure on Adhipati marma (crown center) to release mental tension.',
    },
    {
      step: '03',
      title: 'Overnight Rejuvenation',
      icon: <Moon className="w-5 h-5 text-gold-400" />,
      tagline: 'Deep Cellular Follicle Repair',
      description:
        'Wrap hair in a warm silk turban or protect your pillow with a soft towel. Allow the 24 herbs to work undisturbed for a minimum of 2 hours, or ideally overnight, before cleansing with a botanical sulfate-free wash.',
      proTip: 'Consistent practice 2-3 times per week delivers visible density within 60 days.',
    },
  ];

  return (
    <section id="rituals" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-botanical-950 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-900 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Sacred Ayurvedic Routine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-botanical-50">
            The 3-Step <span className="text-gold-gradient">Shiro-Abhyanga Ritual</span>
          </h2>
          <p className="mt-3 text-botanical-200 text-sm sm:text-base">
            In Ayurvedic medicine, hair oiling is not simply cosmetic—it is an intimate self-care ritual that grounds erratic Vata energy and nourishes cranial marma points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="glass-panel-gold rounded-3xl p-8 border border-gold-500/25 relative flex flex-col justify-between hover:border-gold-400/50 transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-serif font-bold text-gold-400/80 group-hover:text-gold-300 transition-colors">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-botanical-900/90 border border-gold-500/30 flex items-center justify-center">
                    {s.icon}
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-botanical-100 mb-1">
                  {s.title}
                </h3>
                <span className="text-xs uppercase font-semibold tracking-wider text-gold-400 block mb-4">
                  {s.tagline}
                </span>

                <p className="text-xs sm:text-sm text-botanical-300 leading-relaxed mb-6">
                  {s.description}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-botanical-900/90 border border-botanical-800 text-xs text-botanical-300">
                <span className="text-gold-400 font-bold block mb-0.5">Ayurvedic Insight:</span>
                <span>{s.proTip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
