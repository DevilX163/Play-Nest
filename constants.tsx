
import React from 'react';
import { Product } from './types';

export const COLORS = {
  primary: '#7FB3D5',
  secondary: '#A2D9CE',
  accent: '#F9E79F',
  text: '#1a202c',
  muted: '#7F8C8D',
  bg: '#F4F7F6',
  white: '#FFFFFF',
};

export const STAGE_CONFIG = {
  infant: {
    label: 'Infant',
    range: '6–24 Months',
    focus: 'Focus on sensory discovery and fundamental movement. During this stage, children explore the world through touch, taste, and sound. Play focuses on core strength, hand-eye coordination, and responding to environmental stimuli.',
    hashtags: ['SensoryPlay', 'Milestones', 'FloorTime', 'FirstSteps', 'TactileLearning', 'ParentBonding'],
    color: 'bg-blue-100 text-blue-700',
  },
  toddler: {
    label: 'Toddler',
    range: '2–5 Years',
    focus: 'A period of explosive creativity and imaginative role-play. Toddlers begin to build complex worlds, develop fine motor control through art, and start understanding gentle social boundaries and sharing within small circles.',
    hashtags: ['ImaginativePlay', 'LittleArtists', 'SocialSkills', 'FineMotor', 'StoryTime', 'PreschoolPrep'],
    color: 'bg-green-100 text-green-700',
  },
  schooler: {
    label: 'Schooler',
    range: '6–10 Years',
    focus: 'Developing scientific inquiry and collaborative problem-solving. Play becomes more structured, involving STEM concepts, complex strategy games, and teamwork that builds resilience and logical reasoning.',
    hashtags: ['STEMExploration', 'Teamwork', 'LogicPuzzles', 'NatureDiscovery', 'CuriosityFirst', 'BuildingResilience'],
    color: 'bg-yellow-100 text-yellow-700',
  },
  teen: {
    label: 'Teen',
    range: '11–14 Years',
    focus: 'Emphasis on specialized skill-building, confidence, and community leadership. Teens transition into complex projects, digital citizenship, and mentoring younger peers, while developing a strong sense of personal identity.',
    hashtags: ['FutureLeaders', 'SkillMastery', 'DigitalLiteracy', 'EcoAwareness', 'CreativeCoding', 'SocialResponsibility'],
    color: 'bg-purple-100 text-purple-700',
  },
};

export const MOCK_PRODUCTS: Product[] = [
  // Infant
  { id: 'p1', name: 'Montessori Object Permanence Box', price: 1499, stage: 'infant', benefit: 'Fine motor skills', description: 'Classic wooden toy to help infants understand that objects still exist even when hidden.', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=200' },
  { id: 'p2', name: 'Organic Cotton Sensory Rings', price: 850, stage: 'infant', benefit: 'Tactile exploration', description: 'Soft, safe, and chewable rings with varied textures for developing gums.', imageUrl: 'https://images.unsplash.com/photo-1544126592-807daa2b569b?auto=format&fit=crop&q=80&w=200' },
  // Toddler
  { id: 'p3', name: 'Magnetic Discovery Tiles', price: 3500, stage: 'toddler', benefit: 'Spatial reasoning', description: 'Translucent 3D magnetic building blocks that encourage imaginative engineering.', imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=200' },
  { id: 'p4', name: 'Natural Birch Balance Board', price: 5900, stage: 'toddler', benefit: 'Balance & core', description: 'A minimalist open-ended toy that transforms into a bridge, slide, or rocker.', imageUrl: 'https://images.unsplash.com/photo-1608447714925-599deeb5a682?auto=format&fit=crop&q=80&w=200' },
  // Schooler
  { id: 'p5', name: 'Hydro-Powered Robot Kit', price: 2400, stage: 'schooler', benefit: 'Sustainable STEM', description: 'Learn about clean energy by building a robot powered strictly by water pressure.', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=200' },
  { id: 'p6', name: 'Cooperative Strategy Game', price: 1999, stage: 'schooler', benefit: 'Teamwork skills', description: 'A board game where players must work together to solve mysteries before time runs out.', imageUrl: 'https://images.unsplash.com/photo-1610812383745-090998495e9b?auto=format&fit=crop&q=80&w=200' },
  // Teen
  { id: 'p7', name: 'Circuit Scribe Electronics Kit', price: 4299, stage: 'teen', benefit: 'Design & Tech', description: 'Draw real working circuits with conductive ink pens and magnetic modules.', imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=200' },
  { id: 'p8', name: 'Eco-Friendly Terrarium Lab', price: 2850, stage: 'teen', benefit: 'Biology & Patience', description: 'A self-sustaining ecosystem kit to learn about the water cycle and botany.', imageUrl: 'https://images.unsplash.com/photo-1445510861639-5651173bc5d5?auto=format&fit=crop&q=80&w=200' },
];

export const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Toy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
  Activity: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Community: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Impact: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Gallery: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Cart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
};
