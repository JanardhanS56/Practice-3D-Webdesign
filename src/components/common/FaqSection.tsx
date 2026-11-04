import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How quickly will I notice a reduction in telogen hair shedding?',
    answer:
      'In our clinical observational panel of 120 participants, 82% observed a dramatic reduction in brush and shower shedding within 14-21 days of regular 3x/week Shiro-Abhyanga rituals. New vellus follicle sprouting (baby hairs) along sparse temple zones typically appears between days 45-60.',
  },
  {
    question: 'Will this herbal elixir leave my hair feeling greasy or heavy?',
    answer:
      'No. Unlike mineral oil or petroleum-based heavy serums, our formula uses cold-pressed virgin sesame and sweet almond oil bases which share an identical lipid profile to human scalp sebum. It absorbs cleanly into the follicle bulb without clogging pores or leaving an oily film when cleansed with a gentle shampoo.',
  },
  {
    question: 'Can I safely use this on color-treated or bleached hair?',
    answer:
      'Yes, absolutely. The bioactive flavonoids and cold-pressed antioxidants in Hibiscus and Amla actually protect colored hair by shielding pigment molecules from UV oxidation and closing roughened cuticle scales caused by chemical processing.',
  },
  {
    question: 'How does Ayurvedic herbal oil compare to pharmaceutical Minoxidil?',
    answer:
      'While synthetic minoxidil dilates blood vessels chemically and frequently causes scalp dryness, alcohol flaking, or rebound shedding upon discontinuation, pure Rosemary and Bhringraj act through natural phyto-compounds (carnosic acid, wedelolactone) that stimulate microcirculation, reduce DHT binding, and nurture long-term scalp microbiome vitality without dependency or harsh chemical side effects.',
  },
  {
    question: 'What is the shelf life and storage recommendation?',
    answer:
      'Because our elixirs are packaged in pharmaceutical-grade UV-protective amber glass and fortified with natural Vitamin E tocopherols, unopened bottles stay potent for 24 months. Once opened, we recommend enjoying your fresh herbal batch within 9 months. Store away from direct sunlight at room temperature.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative bg-[#0A0705] border-t border-[#261A11]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C78D4B] uppercase">
              PHARMACOPOEIA INQUIRIES
            </span>
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F6F0E8]">
            Frequently Documented <span className="text-amber-metallic italic">Inquiries</span>
          </h2>
          <p className="mt-3 text-[#BCA891] text-sm">
            Everything you need to know about traditional 336-hour cold-macerated hair care.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="maison-card border border-[#261A11] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-display font-medium text-lg sm:text-xl text-[#F6F0E8] group-hover:text-[#E1B678] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 border border-[#261A11] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 border-[#C78D4B] text-[#E1B678]' : 'text-[#BCA891]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#BCA891] leading-relaxed border-t border-[#261A11] animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
