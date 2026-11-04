export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  volume: string;
  badge?: string;
  category: 'growth' | 'repair' | 'anti-dandruff' | 'scalp-care';
  hairType: ('all' | 'straight' | 'wavy' | 'curly' | 'coily' | 'damaged')[];
  description: string;
  keyBenefits: string[];
  activeIngredients: string[];
  ritualSteps: { step: number; title: string; instruction: string }[];
  inStock: boolean;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume: string;
}

export interface BotanicalIngredient {
  id: string;
  commonName: string;
  sanskritName: string;
  scientificName: string;
  role: string;
  bioactive: string;
  description: string;
  benefits: string[];
  origin: string;
  extraction: string;
  color: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  hairType: string;
  durationUsed: string;
}

export type ViewAngle = 'showcase' | 'label' | 'dropper' | 'ingredients';
