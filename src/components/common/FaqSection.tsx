import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How quickly will I notice a reduction in hair shedding?',
    answer:
      'In our clinical observational panel of 120 participants, 82% observed a dramatic reduction in brush and shower shedding within 14-21 days of regular 3x/week Shiro-Abhyanga rituals. New vellus follicle sprouting (baby hairs) along sparse temple zones typically appears between days 45-60.',
  },
  {
    question: 'Will this herbal oil leave my hair feeling greasy or heavy?',
    answer:
      'No. Unlike mineral oil or petroleum-based heavy serums, our formula uses cold-pressed virgin sesame and sweet almond oil bases which share an identical lipid profile to human scalp sebum. It absorbs cleanly into the follicle bulb without clogging pores or leaving an oily film when rinsed with a gentle shampoo.',
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-botanical-950 border-t border-gold-500/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-900 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
            <span>Ayurvedic Clarifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-botanical-50">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="mt-2 text-botanical-300 text-sm">
            Everything you need to know about traditional cold-macerated hair care.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="glass-panel rounded-2xl border border-gold-500/20 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-botanical-100 group-hover:text-gold-300 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-botanical-900 border border-gold-500/30 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-gold-500/20 text-gold-300' : 'text-botanical-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-botanical-300 leading-relaxed border-t border-botanical-850 animate-fadeIn">
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
