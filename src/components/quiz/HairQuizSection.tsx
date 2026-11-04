import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag, ShieldCheck, HeartHandshake } from 'lucide-react';
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
    subtitle: 'Your scalp is the biological soil for healthy follicular root cycles.',
    options: [
      {
        label: 'Excessive Shedding & Thinning',
        description: 'Noticeable hair in the shower drain, sparse parting or crown.',
        targetProductId: 'root-revival-elixir',
      },
      {
        label: 'Receding Temples & Slow Regrowth',
        description: 'Sparse hairline edges that need targeted DHT blockade.',
        targetProductId: 'rosemary-dht-stimulator',
      },
      {
        label: 'Flakes, Dandruff & Scalp Itch',
        description: 'Persistent white/yellow flakes and fungal micro-inflammation.',
        targetProductId: 'neem-clarifying-scalp-oil',
      },
      {
        label: 'Brittle Split Ends & Heat Damage',
        description: 'Frayed cuticles, bleaching damage, lack of natural shine.',
        targetProductId: 'hibiscus-argan-repair-nectar',
      },
    ],
  },
  {
    id: 2,
    question: 'How would you describe your natural hair texture?',
    subtitle: 'Different textures absorb and retain botanical lipid weights differently.',
    options: [
      { label: 'Fine & Easily Weighed Down', description: 'Requires fast-absorbing lightweight lipid molecules.', targetProductId: 'rosemary-dht-stimulator' },
      { label: 'Medium & Naturally Wavy', description: 'Responds best to cold-pressed golden sesame & bhringraj.', targetProductId: 'root-revival-elixir' },
      { label: 'Thick, Coarse, or Curly / Coily', description: 'Craves intensive moisture sealing and rich fatty acids.', targetProductId: 'hibiscus-argan-repair-nectar' },
      { label: 'Sensitive & Reacts Easily', description: 'Requires soothing antifungal and cooling neem botanicals.', targetProductId: 'neem-clarifying-scalp-oil' },
    ],
  },
  {
    id: 3,
    question: 'How often do you typically wash your hair?',
    subtitle: 'Helps us calibrate your optimal pre-wash oil soak duration.',
    options: [
      { label: 'Every 1-2 Days (Frequent)', description: 'Fast-action 30-minute pre-shampoo treatments.', targetProductId: 'rosemary-dht-stimulator' },
      { label: '2-3 Times a Week', description: 'Ideal cadence for overnight Shiro-Abhyanga rituals.', targetProductId: 'root-revival-elixir' },
      { label: 'Once a Week (Deep Wash)', description: 'Maximum hydration recovery and weekly herbal masking.', targetProductId: 'hibiscus-argan-repair-nectar' },
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
      setCurrentStep(QUIZ_QUESTIONS.length); // Results step
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
  };

  // Determine prescribed product based on primary question answers
  const primaryChoice = selectedAnswers[0] ?? 0;
  const targetId = QUIZ_QUESTIONS[0].options[primaryChoice]?.targetProductId || 'root-revival-elixir';
  const recommendedProduct: Product =
    PRODUCTS.find((p) => p.id === targetId) || PRODUCTS[0];
  const companionTool: Product = SIMILAR_PRODUCTS[0]; // Neem Wood Comb

  const bundlePrice = recommendedProduct.price + companionTool.price;
  const discountedBundle = Math.round(bundlePrice * 0.85); // 15% discount for quiz completion

  const handleAddBundle = () => {
    addToCart(recommendedProduct);
    addToCart(companionTool);
  };

  return (
    <section id="quiz" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-botanical-950 border-t border-gold-500/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-900 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Ayurvedic Dosha Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-botanical-50">
            Discover Your Personalized <span className="text-gold-gradient">Hair Elixir Ritual</span>
          </h2>
          <p className="mt-2 text-botanical-300 text-sm sm:text-base">
            Take 60 seconds to answer 3 targeted questions and unlock your custom botanical prescription.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-2xl relative">
          {currentStep < QUIZ_QUESTIONS.length ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs text-gold-300 font-semibold mb-3">
                <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-botanical-900 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-botanical-50">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h3>
                <p className="text-xs sm:text-sm text-botanical-300 mt-1">
                  {QUIZ_QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="p-5 rounded-2xl bg-botanical-900/80 hover:bg-botanical-850 border border-botanical-800 hover:border-gold-500/50 transition-all text-left group active:scale-98 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif font-bold text-base text-botanical-100 group-hover:text-gold-300 transition-colors">
                          {opt.label}
                        </span>
                        <div className="w-5 h-5 rounded-full border border-botanical-600 group-hover:border-gold-400 flex items-center justify-center">
                          <Check className="w-3 h-3 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <p className="text-xs text-botanical-300 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Back button if past step 0 */}
              {currentStep > 0 && (
                <div className="mt-6 flex justify-start">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs text-botanical-400 hover:text-gold-300 transition-colors"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between pb-6 border-b border-gold-500/20 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">
                    Ayurvedic Consultation Complete
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-botanical-50 mt-1">
                    Your Tailored Scalp Longevity Protocol
                  </h3>
                </div>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 text-xs text-botanical-400 hover:text-gold-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>

              {/* Prescribed Bundle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="p-5 rounded-2xl bg-botanical-900/90 border border-gold-500/30 flex gap-4">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-botanical-700"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                      Primary Prescribed Elixir
                    </span>
                    <h4 className="text-sm font-serif font-bold text-botanical-100 mt-0.5">
                      {recommendedProduct.name}
                    </h4>
                    <p className="text-xs text-botanical-300 mt-1 line-clamp-2">
                      {recommendedProduct.subtitle}
                    </p>
                    <span className="text-xs font-bold text-gold-300 mt-2 block">
                      ${recommendedProduct.price} • {recommendedProduct.volume}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-botanical-900/90 border border-gold-500/30 flex gap-4">
                  <img
                    src={companionTool.image}
                    alt={companionTool.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-botanical-700"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                      Companion Scalp Tool
                    </span>
                    <h4 className="text-sm font-serif font-bold text-botanical-100 mt-0.5">
                      {companionTool.name}
                    </h4>
                    <p className="text-xs text-botanical-300 mt-1 line-clamp-2">
                      Ensures deep meridian circulation and static-free detangling.
                    </p>
                    <span className="text-xs font-bold text-gold-300 mt-2 block">
                      ${companionTool.price} • Handcrafted Wood
                    </span>
                  </div>
                </div>
              </div>

              {/* Bundle Action */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-botanical-900 via-botanical-850 to-botanical-900 border border-gold-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                      Quiz Completion Bonus: 15% Off Bundle
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-gold-300">${discountedBundle}</span>
                    <span className="text-sm text-botanical-400 line-through">${bundlePrice}</span>
                    <span className="text-xs text-emerald-400 font-semibold">+ Free Shipping</span>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-botanical-950 font-bold text-sm tracking-wide shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-botanical-950" />
                  <span>Claim Ritual Bundle & Add to Cart</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
