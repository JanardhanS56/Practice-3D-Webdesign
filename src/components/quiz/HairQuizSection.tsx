import React, { useState } from 'react';
import { Check, RotateCcw, Plus } from 'lucide-react';
import { PRODUCTS, SIMILAR_PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    targetProductId: string;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your primary scalp condition right now?',
    subtitle: 'Your scalp is the biological terrain for healthy follicular longevity.',
    options: [
      {
        label: 'Excessive Shedding & Telogen Loss',
        description: 'Noticeable hair in the brush, sparse parting or crown density loss.',
        targetProductId: 'root-revival-elixir',
      },
      {
        label: 'Receding Temples & Slow Regrowth',
        description: 'Sparse hairline edges that require targeted natural DHT blockade.',
        targetProductId: 'rosemary-dht-stimulator',
      },
      {
        label: 'Microbial Flakes & Scalp Pruritus',
        description: 'Persistent white/yellow dandruff flakes and chronic itchy inflammation.',
        targetProductId: 'neem-clarifying-scalp-oil',
      },
      {
        label: 'Brittle Cuticles & Heat Damage',
        description: 'Frayed split ends, chemical bleaching stress, lack of silk mirror-shine.',
        targetProductId: 'hibiscus-argan-repair-nectar',
      },
    ],
  },
  {
    id: 2,
    question: 'How would you classify your natural hair strand diameter?',
    subtitle: 'Different textures absorb and retain botanical lipid weights differently.',
    options: [
      { label: 'Fine & Easily Weighed Down', description: 'Requires dry-oil fast-penetrating lipid molecules.', targetProductId: 'rosemary-dht-stimulator' },
      { label: 'Medium & Naturally Wavy', description: 'Responds best to virgin cold-pressed golden sesame & bhringraj.', targetProductId: 'root-revival-elixir' },
      { label: 'Thick, Coarse, or Curly / Coily', description: 'Craves intensive moisture sealing and rich fatty acids.', targetProductId: 'hibiscus-argan-repair-nectar' },
      { label: 'Sensitive & Reacts to Chemicals', description: 'Requires soothing antifungal and cooling neem botanicals.', targetProductId: 'neem-clarifying-scalp-oil' },
    ],
  },
  {
    id: 3,
    question: 'How often do you cleanse your hair?',
    subtitle: 'Calibrates your optimal pre-shampoo oil soak cadence.',
    options: [
      { label: 'Daily or Every 2 Days', description: 'Rapid 30-minute pre-shampoo treatments.', targetProductId: 'rosemary-dht-stimulator' },
      { label: '2-3 Times Weekly', description: 'Optimal cadence for overnight Shiro-Abhyanga rituals.', targetProductId: 'root-revival-elixir' },
      { label: 'Once Weekly (Deep Wash)', description: 'Maximum hydration recovery and weekly herbal masking.', targetProductId: 'hibiscus-argan-repair-nectar' },
    ],
  },
];

export const HairQuizSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const { addToCart } = useCart();

  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentStep] = optionIndex;
    setSelectedAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(QUIZ_QUESTIONS.length);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
  };

  const primaryChoice = selectedAnswers[0] ?? 0;
  const targetId = QUIZ_QUESTIONS[0].options[primaryChoice]?.targetProductId || 'root-revival-elixir';
  const recommendedProduct: Product =
    PRODUCTS.find((p) => p.id === targetId) || PRODUCTS[0];
  const companionTool: Product = SIMILAR_PRODUCTS[0];

  const bundlePrice = recommendedProduct.price + companionTool.price;
  const discountedBundle = Math.round(bundlePrice * 0.85);

  const handleAddBundle = () => {
    addToCart(recommendedProduct);
    addToCart(companionTool);
  };

  return (
    <section id="quiz" className="py-28 px-4 sm:px-6 lg:px-8 relative bg-[#0A0705] border-t border-[#261A11]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
            <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C78D4B] uppercase">
              AYURVEDIC DIAGNOSTIC CONSULTATION
            </span>
            <span className="w-8 h-[1px] bg-[#C78D4B]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F6F0E8]">
            Your Custom Scalp <span className="text-amber-metallic italic">Longevity Protocol</span>
          </h2>
          <p className="mt-3 text-[#BCA891] text-sm sm:text-base">
            Answer 3 clinical questions to determine your primary doshic imbalance and receive a personalized formula prescription.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="maison-card p-8 sm:p-12 border border-[#C78D4B]/30 relative">
          {currentStep < QUIZ_QUESTIONS.length ? (
            <div>
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-[#BCA891] font-mono mb-3">
                <span className="uppercase">Query {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-[2px] bg-[#261A11] mb-10">
                <div
                  className="h-full bg-[#C78D4B] transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F6F0E8]">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h3>
                <p className="text-xs sm:text-sm text-[#BCA891] mt-2">
                  {QUIZ_QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="p-6 bg-[#17110C] hover:bg-[#261A11]/60 border border-[#261A11] hover:border-[#C78D4B]/50 transition-all text-left group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-medium text-lg text-[#F6F0E8] group-hover:text-[#E1B678] transition-colors">
                          {opt.label}
                        </span>
                        <div className="w-4 h-4 border border-[#261A11] group-hover:border-[#C78D4B] flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#C78D4B] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <p className="text-xs text-[#BCA891] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <div className="mt-8 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs font-mono text-[#BCA891] hover:text-[#E1B678] uppercase tracking-wider"
                  >
                    ← Previous Query
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between pb-6 border-b border-[#261A11] mb-8">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C78D4B] font-bold block">
                    Diagnostic Analysis Complete
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F6F0E8] mt-1">
                    Your Prescribed Botanical Regimen
                  </h3>
                </div>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 text-xs text-[#BCA891] hover:text-[#E1B678] font-mono uppercase"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recalibrate</span>
                </button>
              </div>

              {/* Prescribed Pair */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="p-6 bg-[#17110C] border border-[#C78D4B]/30 flex gap-4">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="w-20 h-20 object-cover shrink-0 border border-[#261A11]"
                  />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#E1B678]">
                      Primary Prescribed Elixir
                    </span>
                    <h4 className="text-base font-display font-medium text-[#F6F0E8] mt-0.5">
                      {recommendedProduct.name}
                    </h4>
                    <p className="text-xs text-[#BCA891] mt-1 line-clamp-2">
                      {recommendedProduct.subtitle}
                    </p>
                    <span className="text-xs font-display text-[#E1B678] mt-2 block font-bold">
                      ${recommendedProduct.price} • {recommendedProduct.volume}
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-[#17110C] border border-[#C78D4B]/30 flex gap-4">
                  <img
                    src={companionTool.image}
                    alt={companionTool.name}
                    className="w-20 h-20 object-cover shrink-0 border border-[#261A11]"
                  />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#E1B678]">
                      Prescribed Acupressure Artifact
                    </span>
                    <h4 className="text-base font-display font-medium text-[#F6F0E8] mt-0.5">
                      {companionTool.name}
                    </h4>
                    <p className="text-xs text-[#BCA891] mt-1 line-clamp-2">
                      Medicinal seasoned neem heartwood for micro-meridian stimulation.
                    </p>
                    <span className="text-xs font-display text-[#E1B678] mt-2 block font-bold">
                      ${companionTool.price} • Artisan Wood
                    </span>
                  </div>
                </div>
              </div>

              {/* Prescribed Action */}
              <div className="mt-8 p-6 bg-[#17110C] border border-[#C78D4B]/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#E1B678] block">
                    Oracle Completion: 15% Synergistic Courtesy
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-display text-[#E1B678]">${discountedBundle}</span>
                    <span className="text-sm text-[#BCA891]/50 line-through">${bundlePrice}</span>
                    <span className="text-xs text-[#C78D4B] font-mono font-medium">+ Expedited Delivery</span>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="btn-maison-primary text-xs flex items-center justify-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Acquire Prescribed Pair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
