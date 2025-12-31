
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Icons, COLORS } from './constants';
import Dashboard from './components/Dashboard';
import ToyLibrary from './components/ToyLibrary';
import Activities from './components/Activities';
import Community from './components/Community';
import Impact from './components/Impact';
import Onboarding from './components/Onboarding';
import Gallery from './components/Gallery';
import Circles from './components/Circles';
import { ChildProfile, ToyItem, AgeStage } from './types';

const INITIAL_PROFILES: ChildProfile[] = [];

const INITIAL_TOYS: ToyItem[] = [
  { id: 't1', name: 'Wooden Train Set', ownerId: 'p1', stage: 'toddler', category: 'Creative', description: 'Complete 40-piece set, few minor scratches.', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=200', status: 'available', condition: 'Good', price: 1200, exchangeValue: 100 },
  { id: 't2', name: 'Microscope Kit', ownerId: 'p2', stage: 'schooler', category: 'STEM', description: 'Brand new, never used. 400x magnification.', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=200', status: 'available', condition: 'Excellent', price: 2500, exchangeValue: 250 },
  { id: 't3', name: 'Soft Sensory Cube', ownerId: 'p3', stage: 'infant', category: 'Sensory', description: 'Very soft, slightly faded colors but clean.', imageUrl: 'https://images.unsplash.com/photo-1544126592-807daa2b569b?auto=format&fit=crop&q=80&w=200', status: 'available', condition: 'Fair', price: 400, exchangeValue: 50 },
  { id: 't4', name: 'Programmable Drone', ownerId: 'p4', stage: 'teen', category: 'STEM', description: 'Advanced drone with block coding support. Excellent condition.', imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=200', status: 'available', condition: 'Excellent', price: 5500, exchangeValue: 500 },
];

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; active: boolean }> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex flex-col items-center justify-center py-2 px-1 transition-all duration-300 ${active ? 'text-blue-500 scale-105' : 'text-gray-400 hover:text-blue-400'}`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </Link>
);

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<ChildProfile[]>(INITIAL_PROFILES);
  const [toys, setToys] = useState<ToyItem[]>(INITIAL_TOYS);
  const [userPoints, setUserPoints] = useState(450); // Initial mock points
  const [activeChildId, setActiveChildId] = useState<string | null>(null);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    if (!activeChildId && profiles.length > 0) {
      setActiveChildId(profiles[0].id);
      setHasOnboarded(true);
    }
  }, [profiles, activeChildId]);

  const activeChild = profiles.find(p => p.id === activeChildId) || null;

  const handleAddProfile = (name: string, stage: AgeStage) => {
    const newProfile: ChildProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      birthDate: new Date().toISOString().split('T')[0],
      stage,
      interests: ['discovery']
    };
    setProfiles([...profiles, newProfile]);
    setActiveChildId(newProfile.id);
  };

  const handleDeleteProfile = (id: string) => {
    const updated = profiles.filter(p => p.id !== id);
    setProfiles(updated);
    if (activeChildId === id) {
      setActiveChildId(updated.length > 0 ? updated[0].id : null);
    }
    if (updated.length === 0) setHasOnboarded(false);
  };

  const handleOnboardingComplete = (name: string, stage: AgeStage) => {
    handleAddProfile(name, stage);
    setHasOnboarded(true);
  };

  const handleAddToy = (toy: ToyItem) => {
    setToys([toy, ...toys]);
    // Rewarding user with points for listing a toy
    setUserPoints(prev => prev + 25);
  };

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
        <header className="px-6 pt-6 pb-4 glass sticky top-0 z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Play Nest</h1>
            <p className="text-xs text-gray-500 font-medium">Safe • Sustainable • Local</p>
          </div>
          <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
            <Icons.Settings />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-24 px-6 no-scrollbar">
          <Routes>
            <Route path="/" element={<Dashboard profiles={profiles} activeChild={activeChild} setActiveChildId={setActiveChildId} onAddProfile={handleAddProfile} onDeleteProfile={handleDeleteProfile} userPoints={userPoints} />} />
            <Route path="/toys" element={activeChild ? <ToyLibrary toys={toys} stage={activeChild.stage} onAddToy={handleAddToy} /> : <Navigate to="/" />} />
            <Route path="/activities" element={activeChild ? <Activities child={activeChild} /> : <Navigate to="/" />} />
            <Route path="/gallery" element={<Gallery activeChild={activeChild} />} />
            <Route path="/community" element={<Community />} />
            <Route path="/circles" element={<Circles />} />
            <Route path="/impact" element={<Impact />} />
          </Routes>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass border-t border-gray-100 px-2 py-1 flex justify-around items-end z-20">
          <Navigation hasChild={!!activeChild} />
        </nav>
      </div>
    </HashRouter>
  );
};

const Navigation = ({ hasChild }: { hasChild: boolean }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <NavItem to="/" icon={<Icons.Home />} label="Home" active={path === '/'} />
      <NavItem to={hasChild ? "/toys" : "/"} icon={<Icons.Toy />} label="Library" active={path === '/toys'} />
      <NavItem to={hasChild ? "/activities" : "/"} icon={<Icons.Activity />} label="Play" active={path === '/activities'} />
      <NavItem to="/circles" icon={<Icons.Community />} label="Circles" active={path === '/circles'} />
      <NavItem to="/gallery" icon={<Icons.Gallery />} label="Gallery" active={path === '/gallery'} />
      <NavItem to="/impact" icon={<Icons.Impact />} label="Impact" active={path === '/impact'} />
    </>
  );
};

export default App;
