import React from 'react';
import { Flame, Sparkle, Moon } from 'lucide-react';

export const RitualGuideSection: React.FC = () => {
  const steps = [
    {
      step: 'I',
      title: 'Warm & Activate',
      icon: <Flame className="w-5 h-5 text-[#C78D4B]" />,
      tagline: 'Unlock Heat-Activated Volatiles',
      description:
        'Warm 1-2 tablespoons in a ceramic vessel rested in warm water for 2 minutes. Subtle thermal elevation lowers lipid viscosity, facilitating trans-follicular absorption of bioactive compounds.',
      insight: 'Never microwave herbal lipid matrices directly; high heat cracks volatile terpenes.',
    },
    {
      step: 'II',
      title: 'Shiro-Abhyanga Massage',
      icon: <Sparkle className="w-5 h-5 text-[#C78D4B]" />,
      tagline: 'Cranial Marma Point Acupressure',
      description:
        'Section tresses into 4 quadrants. Using fingertip pads or seasoned neem wood, apply rhythmic clockwise circular strokes for 8-10 minutes to ignite cranial micro-capillary flow.',
      insight: 'Apply conscious firm pressure on the Adhipati marma point (crown apex) to discharge cranial cortisol.',
    },
    {
      step: 'III',
      title: 'Overnight Rejuvenation',
      icon: <Moon className="w-5 h-5 text-[#C78D4B]" />,
      tagline: 'Deep Cuticle Restoration',
      description:
        'Encase hair in a pure mulberry silk bonnet or wrap in a warm linen towel. Allow the 24 herbs to macerate undisturbed overnight before cleansing with a botanical sulfate-free wash.',
      insight: 'Consistent bi-weekly practice delivers measurable 88% follicle thickness in 60 days.',
    },
  ];

  return (
    <section id="rituals" className="py-28 px-4 sm:px-6 lg:px-8 relative bg-[#0A0705] border-t border-[#261A11]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C78D4B] uppercase">
              THE SACRED CEREMONY
            </span>
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F6F0E8]">
            The Classical <span className="text-amber-metallic italic">Shiro-Abhyanga Ceremony</span>
          </h2>
          <p className="mt-3 text-[#BCA891] text-sm sm:text-base leading-relaxed">
            In Ayurvedic medicine, hair oiling is not a superficial vanity—it is a grounded ceremonial meditation that pacifies agitated Vata energy and fortifies cranial nerve endings.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="maison-card p-8 border border-[#261A11] hover:border-[#C78D4B]/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#261A11]">
                  <span className="text-3xl font-display text-[#E1B678] font-bold">
                    {s.step}
                  </span>
                  <div className="p-2.5 bg-[#17110C] border border-[#261A11]">
                    {s.icon}
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C78D4B] block mb-2">
                  {s.tagline}
                </span>

                <h3 className="text-2xl font-display font-medium text-[#F6F0E8] mb-4">
                  {s.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#BCA891] leading-relaxed mb-8">
                  {s.description}
                </p>
              </div>

              <div className="p-4 bg-[#0A0705] border border-[#261A11] text-xs text-[#BCA891]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E1B678] block mb-1">
                  Maison Classical Note:
                </span>
                <p className="leading-relaxed">{s.insight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
