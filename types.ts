
export type AgeStage = 'infant' | 'toddler' | 'schooler' | 'teen';
export type ToyCondition = 'Excellent' | 'Good' | 'Fair';
export type ShowcaseType = 'artwork' | 'recipe' | 'blog' | 'project';
export type UsageDuration = '< 6 months' | '6-12 months' | '1-2 years' | '2+ years';
export type UsageIntensity = 'Light' | 'Moderate' | 'Heavy';

export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  stage: AgeStage;
  interests: string[];
}

export interface ShowcaseItem {
  id: string;
  childId: string;
  childName: string;
  type: ShowcaseType;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  timestamp: string;
}

export interface Circle {
  id: string;
  name: string;
  neighborhood: string;
  memberCount: number;
  privacy: 'invite-only' | 'neighborhood-verified';
  description: string;
}

export interface ToyItem {
  id: string;
  name: string;
  ownerId: string;
  stage: AgeStage;
  category: string;
  description: string;
  imageUrl: string;
  status: 'available' | 'requested' | 'borrowed';
  condition: ToyCondition;
  price?: number; 
  exchangeValue?: number;
  usageDuration?: UsageDuration;
  usageIntensity?: UsageIntensity;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stage: AgeStage;
  description: string;
  imageUrl: string;
  benefit: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'art' | 'movement' | 'stem' | 'storytelling' | 'teamwork';
  minAge: number;
  maxAge: number;
  duration: string;
  isAI?: boolean;
}

export interface ImpactStats {
  toysShared: number;
  wasteReducedKg: number;
  moneySaved: number;
}
