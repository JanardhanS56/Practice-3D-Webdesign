import { Product, BotanicalIngredient, Review } from '../types';

export const BOTANICAL_INGREDIENTS: BotanicalIngredient[] = [
  {
    id: 'bhringraj',
    commonName: 'False Daisy',
    sanskritName: 'Bhringraj (King of Hair)',
    scientificName: 'Eclipta Alba',
    role: 'Root Follicle Activator',
    bioactive: 'Wedelolactone & Ecliptine',
    description: 'Renowned in Charaka Samhita as Keshya (hair revitalizer), Bhringraj stimulates micro-circulation around dormant hair follicles, accelerating the anagen (growth) phase.',
    benefits: ['Awakens dormant follicles', 'Reduces oxidative hair fall by 64%', 'Maintains natural melanin / delays greying'],
    origin: 'Foothills of Western Ghats',
    extraction: 'Cold-pressed virgin maceration (14 days)',
    color: '#2e5b33'
  },
  {
    id: 'amla',
    commonName: 'Indian Gooseberry',
    sanskritName: 'Amalaki',
    scientificName: 'Phyllanthus Emblica',
    role: 'Collagen & Keratin Fortifier',
    bioactive: 'Vitamin C & Hydrolyzable Tannins',
    description: 'Boasting 20x the Vitamin C of oranges, fresh sun-dried wild Amla binds to the hair cortex, reinforcing tensile strength and preventing premature breakage.',
    benefits: ['Reinforces keratin cuticle elasticity', 'Deep environmental radical defense', 'Adds high-refractive natural gloss'],
    origin: 'Madhya Pradesh Wild Reserves',
    extraction: 'Direct cold extraction of wild berries',
    color: '#557a38'
  },
  {
    id: 'rosemary',
    commonName: 'Rosemary Leaf',
    sanskritName: 'Rusmari',
    scientificName: 'Rosmarinus Officinalis',
    role: 'DHT Blocker & Blood Flow Catalyst',
    bioactive: 'Carnosic Acid & Rosmarinic Acid',
    description: 'Clinically benchmarked against minoxidil in peer-reviewed trials, pure steam-distilled Rosemary leaf oil inhibits DHT binding while clearing sebum build-up.',
    benefits: ['Blocks local follicular DHT accumulation', 'Balances oily & flaky scalp sebum', 'Clarifies product build-up without stripping'],
    origin: 'Kashmir Valley Organic Terraces',
    extraction: 'Low-temperature slow steam distillation',
    color: '#345e3f'
  },
  {
    id: 'brahmi',
    commonName: 'Gotu Kola Herb',
    sanskritName: 'Brahmi',
    scientificName: 'Bacopa Monnieri',
    role: 'Scalp Calming & Neural Soother',
    bioactive: 'Bacosides A & B',
    description: 'Known for its cooling Ayurvedic potency (Sheeta Virya), Brahmi cools the cranial meridian, calms aggravated Pitta dosha, and alleviates stress-induced shedding.',
    benefits: ['Calms cortisol-induced stress shedding', 'Soothes inflamed or itchy scalps', 'Deeply hydrates dry follicular sheath'],
    origin: 'Wetlands of Kerala',
    extraction: 'Infused slow sun-cure process',
    color: '#3a6647'
  },
  {
    id: 'hibiscus',
    commonName: 'Shoeblack Flower',
    sanskritName: 'Japa Pushpa',
    scientificName: 'Hibiscus Rosa-Sinensis',
    role: 'Amino Acid & Moisture Replenisher',
    bioactive: 'Natural Alpha Hydroxy Acids & Mucilage',
    description: 'Packed with essential amino acids and herbal mucilage, deep red Hibiscus petals lock in moisture and smoothen rough split ends with a natural conditioning barrier.',
    benefits: ['Locks deep cellular hydration', 'Prevents split-end fraying', 'Imparts silky bounce and elasticity'],
    origin: 'Tamil Nadu Organic Farms',
    extraction: 'Pure petal lipid extraction',
    color: '#8b263e'
  },
  {
    id: 'fenugreek',
    commonName: 'Fenugreek Seed',
    sanskritName: 'Methi Seeds',
    scientificName: 'Trigonella Foenum-Graecum',
    role: 'Scalp Microbiome & Anti-Dandruff Guard',
    bioactive: 'Nicotinic Acid & Diosgenin',
    description: 'Rich in plant-based proteins, potassium, and antifungal saponins that eliminate stubborn Malassezia yeast while nourishing weak roots.',
    benefits: ['Eradicates stubborn dandruff flakes', 'Thickens individual hair shaft diameter', 'Restores balanced scalp moisture barrier'],
    origin: 'Rajasthan Highlands',
    extraction: 'Warm seed press extraction',
    color: '#b08331'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'root-revival-elixir',
    name: 'Root Revival Ayurvedic Elixir',
    subtitle: '100% Cold-Pressed Intensive Growth Formula',
    tagline: 'The Holy Grail of Ancient Hair Density & Thickness',
    price: 48,
    originalPrice: 62,
    rating: 4.96,
    reviewCount: 1420,
    volume: '100 ml / 3.4 fl oz',
    badge: 'Bestseller • 24 Herbs',
    category: 'growth',
    hairType: ['all', 'straight', 'wavy', 'curly', 'coily'],
    description: 'Our award-winning flagship formulation. Infused with 24 hand-picked Ayurvedic botanicals slow-cooked over low flame in virgin sesame and sweet almond oil base according to authentic Taila Paka Vidhi texts.',
    keyBenefits: [
      'Clinically proven to increase hair density by 88% in 60 days',
      'Stops active excessive shedding within 14 days of ritual use',
      'Deeply conditions scalp without leaving a greasy or heavy residue',
      'Pure essential aroma of vetiver, sandalwood, and cardamom'
    ],
    activeIngredients: ['Bhringraj', 'Wild Amla', 'Rosemary Oil', 'Brahmi', 'Nagarmotha', 'Fenugreek'],
    ritualSteps: [
      { step: 1, title: 'Warm & Dispense', instruction: 'Dispense 3-5 pipettes into palms and warm gently by rubbing hands together.' },
      { step: 2, title: 'Scalp Shiro-Abhyanga', instruction: 'Massage firmly into scalp using circular clockwise motions for 5-8 minutes.' },
      { step: 3, title: 'Overnight Rejuvenation', instruction: 'Leave on for a minimum of 2 hours or overnight for deepest cellular absorption.' }
    ],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1608248597359-5b58b43828c0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rosemary-dht-stimulator',
    name: 'Rosemary & Amla Follicle Stimulator',
    subtitle: 'Targeted Crown & Temple Growth Drops',
    tagline: 'Maximum Strength Herbal DHT Inhibitor',
    price: 42,
    originalPrice: 54,
    rating: 4.92,
    reviewCount: 890,
    volume: '50 ml / 1.7 fl oz',
    badge: 'High Potency',
    category: 'growth',
    hairType: ['all', 'straight', 'wavy'],
    description: 'Precision dropper elixir formulated with 5% pure Steam-Distilled Rosemary Oil, Cold-Pressed Indian Gooseberry, and Black Seed Oil to reactivate thinning crown and receding hairline zones.',
    keyBenefits: [
      'Targeted spot treatment for receding edges and thinning crowns',
      'Inhibits 5-alpha reductase DHT synthesis naturally',
      'Fast-absorbing dry oil texture that leaves zero greasy sheen',
      'Invigorates scalp circulation with a refreshing herbal tingle'
    ],
    activeIngredients: ['Rosemary Leaf Oil', 'Kalonji (Black Seed)', 'Wild Amla', 'Cedarwood', 'Jojoba Oil'],
    ritualSteps: [
      { step: 1, title: 'Target Thinning Areas', instruction: 'Apply directly onto crown, temples, or sparse parting lines using precision tip.' },
      { step: 2, title: 'Micro-Tapping', instruction: 'Use fingertips to gently tap and press the oil into follicles for 2 minutes.' },
      { step: 3, title: 'Daily Ritual', instruction: 'Can be used as a leave-in treatment morning or evening before sleep.' }
    ],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'neem-clarifying-scalp-oil',
    name: 'Neem & Tea Tree Clarifying Elixir',
    subtitle: 'Soothes Flakes, Itch & Scalp Psoriasis',
    tagline: 'Reset Your Scalp Microbiome in 7 Days',
    price: 39,
    originalPrice: 48,
    rating: 4.88,
    reviewCount: 640,
    volume: '100 ml / 3.4 fl oz',
    badge: 'Scalp Reset',
    category: 'anti-dandruff',
    hairType: ['all', 'curly', 'wavy', 'straight'],
    description: 'A powerful anti-fungal blend of pure organic cold-pressed Neem, Australian Tea Tree, and Fenugreek extract that purges Malassezia build-up and heals irritated, flaky scalp skin.',
    keyBenefits: [
      '100% flake relief guaranteed after first 3 uses',
      'Stops persistent scalp itching and redness immediately',
      'Purifies pores blocked by heavy styling waxes or dry shampoos',
      'Maintains optimal scalp pH balance (5.5)'
    ],
    activeIngredients: ['Cold-Pressed Neem', 'Melaleuca Tea Tree', 'Methi Seed', 'Camphor Leaf', 'Castor Oil'],
    ritualSteps: [
      { step: 1, title: 'Pre-Wash Application', instruction: 'Part hair into sections and apply generously across the entire scalp.' },
      { step: 2, title: 'Detoxifying Wrap', instruction: 'Cover hair in a warm towel for 30 minutes to open follicular pores.' },
      { step: 3, title: 'Gentle Rinse', instruction: 'Wash with a sulfate-free herbal shampoo.' }
    ],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hibiscus-argan-repair-nectar',
    name: 'Hibiscus & Golden Argan Repair Nectar',
    subtitle: 'Deep Cuticle Seal & Split End Defense',
    tagline: 'Glass-Hair Sheen & Intensive Moisture Lock',
    price: 45,
    originalPrice: 58,
    rating: 4.94,
    reviewCount: 980,
    volume: '100 ml / 3.4 fl oz',
    badge: 'Glass Hair Finish',
    category: 'repair',
    hairType: ['curly', 'coily', 'wavy'],
    description: 'Specially crafted for bleached, color-treated, or heat-damaged tresses. Rich red Hibiscus flower mucilage infused with Moroccan Virgin Argan oil deeply seals frayed split ends and adds liquid gold luster.',
    keyBenefits: [
      'Seals up to 92% of split ends after a single ritual application',
      'Restores elastic bounce to curls, coils, and fragile strands',
      'Provides natural heat shield protection up to 400°F (204°C)',
      'Subtle intoxicating fragrance of royal Jasmine and pink Lotus'
    ],
    activeIngredients: ['Hibiscus Rosa-Sinensis', 'Organic Argan', 'Sweet Almond', 'Jasmine Absolute', 'Moringa Oil'],
    ritualSteps: [
      { step: 1, title: 'Mid-Lengths to Ends', instruction: 'Focus application strictly on damaged mid-shaft and dry brittle ends.' },
      { step: 2, title: 'Comb Through', instruction: 'Use a wide-tooth neem comb to distribute evenly through wet or dry strands.' },
      { step: 3, title: 'Style or Air-Dry', instruction: 'Enjoy radiant, frizz-free botanical gloss all day long.' }
    ],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80'
  }
];

export const SIMILAR_PRODUCTS: Product[] = [
  {
    id: 'neem-wood-wide-comb',
    name: 'Handcrafted Neem Wood Detangling Comb',
    subtitle: 'Static-Free Scalp Acupressure Tool',
    tagline: 'Distributes Natural Oils Evenly While Massaging',
    price: 18,
    originalPrice: 24,
    rating: 4.95,
    reviewCount: 420,
    volume: 'Single Artisan Tool',
    badge: 'Ritual Companion',
    category: 'scalp-care',
    hairType: ['all', 'straight', 'wavy', 'curly', 'coily'],
    description: 'Carved from 100% seasoned medicinal Neem wood. Seamless wide teeth prevent mechanical snagging and emit gentle natural medicinal phytoncides onto your scalp with every stroke.',
    keyBenefits: [
      'Eliminates static charge and prevents breakage',
      'Natural antibacterial properties prevent dandruff transfer',
      'Stimulates micro-circulation during oil rituals'
    ],
    activeIngredients: ['100% Seasoned Neem Heartwood'],
    ritualSteps: [
      { step: 1, title: 'Post-Oil Detangle', instruction: 'Gently comb from ends up toward roots after applying herbal hair oil.' }
    ],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ayurvedic-scalp-gua-sha',
    name: 'Natural Jade Scalp Gua Sha Comb',
    subtitle: 'Lymphatic Drainage & Meridian Massage',
    tagline: 'Deep Cranial Tension Release & Follicle Awakening',
    price: 26,
    originalPrice: 34,
    rating: 4.91,
    reviewCount: 310,
    volume: 'Premium Natural Jade',
    badge: 'Acupressure',
    category: 'scalp-care',
    hairType: ['all'],
    description: 'Custom sculpted from genuine raw green jade. Designed with contoured acupressure teeth that glide across cranial meridian zones to reduce stress and boost nutrient delivery to roots.',
    keyBenefits: [
      'Enhances oil penetration depth by 300%',
      'Releases deep headache and jaw tension',
      'Cools inflamed scalp tissues instantly'
    ],
    activeIngredients: ['100% Natural Xiuyan Jade'],
    ritualSteps: [
      { step: 1, title: 'Crown Stroke', instruction: 'Glide the combed edge from forehead hairline back to nape with medium pressure.' }
    ],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'brahmi-amla-hair-mask',
    name: 'Brahmi & Wild Clay Conditioning Mask',
    subtitle: 'Weekly Intensive Scalp & Follicle Detox',
    tagline: 'Purifies Toxins While Flooding Cortex With Amino Acids',
    price: 36,
    originalPrice: 46,
    rating: 4.89,
    reviewCount: 512,
    volume: '200 g / 7.0 oz',
    badge: 'Weekly Ritual',
    category: 'repair',
    hairType: ['all', 'damaged', 'curly'],
    description: 'An ancient Lepa (herbal paste) blend combining Multani Mitti clay, sun-dried Brahmi, Methi, and Hibiscus leaves to absorb pollution and rebuild brittle hair shafts.',
    keyBenefits: [
      'Draws out hard water mineral deposits',
      'Replenishes hydrolyzed herbal proteins',
      'Leaves hair bouncy, lightweight, and deeply renewed'
    ],
    activeIngredients: ['Brahmi', 'Wild Bentonite Clay', 'Raw Honey', 'Coconut Milk'],
    ritualSteps: [
      { step: 1, title: 'Apply to Wet Hair', instruction: 'Spread from scalp through tips and leave on for 15-20 minutes before rinsing.' }
    ],
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ananya S.',
    rating: 5,
    date: '2 weeks ago',
    title: 'My hair loss completely stopped within 20 days!',
    content: 'I had severe postpartum shedding that was terrifying me every time I showered. After 3 weeks of the Root Revival Elixir and warming it before massaging, baby hairs started sprouting along my temples. The herbal scent is so calming and luxurious.',
    verified: true,
    hairType: 'Wavy, fine density',
    durationUsed: 'Used for 2 months'
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    rating: 5,
    date: '1 month ago',
    title: 'Far superior to Minoxidil without the alcohol burn',
    content: 'I was hesitant because a lot of oils just sit on top of hair and feel greasy. This absorbs right into the scalp! My crown looks significantly denser and the texture of my hair feels like silk. The 3D bottle on this site is also gorgeous.',
    verified: true,
    hairType: 'Straight, color-treated',
    durationUsed: 'Used for 3 months'
  },
  {
    id: 'rev-3',
    author: 'Marcus K.',
    rating: 5,
    date: '3 weeks ago',
    title: 'Neem Clarifying oil cleared my stubborn dandruff in 3 washes',
    content: 'Nothing worked on my persistent dry scalp flakes until I tried the Neem & Tea Tree blend. It stopped the itching within 10 minutes of putting it on. Absolutely phenomenal product quality.',
    verified: true,
    hairType: 'Short, coarse curls',
    durationUsed: 'Used for 1 month'
  },
  {
    id: 'rev-4',
    author: 'Priya Patel',
    rating: 5,
    date: 'Yesterday',
    title: 'Authentic Ayurvedic Taila Paka Vidhi formula at its finest',
    content: 'My grandmother used to make herbal oil in copper cauldrons with fresh bhringraj from the garden. VedaRoots smells and feels EXACTLY like authentic traditional herbal preparation. The shine it gives is unreal.',
    verified: true,
    hairType: 'Thick, curly coily',
    durationUsed: 'Used for 6 months'
  }
];
