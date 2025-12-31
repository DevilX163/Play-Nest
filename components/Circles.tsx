
import React, { useState } from 'react';
import { Circle } from '../types';
import { Icons } from '../constants';

const INITIAL_CIRCLES: Circle[] = [
  { id: 'c1', name: 'South Delhi Eco-Parents', neighborhood: 'Greater Kailash', memberCount: 42, privacy: 'neighborhood-verified', description: 'Focused on sustainable play and wooden toys.' },
  { id: 'c2', name: 'Indiranagar Bookworms', neighborhood: 'Indiranagar, BLR', memberCount: 128, privacy: 'invite-only', description: 'Local book and puzzle exchange circle.' }
];

const Circles: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>(INITIAL_CIRCLES);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [privacy, setPrivacy] = useState<'invite-only' | 'neighborhood-verified'>('neighborhood-verified');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newCircle: Circle = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      neighborhood,
      memberCount: 1,
      privacy,
      description: 'New community circle for sharing.'
    };
    setCircles([newCircle, ...circles]);
    setIsCreating(false);
    setName('');
    setNeighborhood('');
  };

  return (
    <div className="py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Your Circles</h2>
          <p className="text-xs text-gray-500">Safe, verified local communities</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          <Icons.Plus />
        </button>
      </div>

      <div className="space-y-4">
        {circles.map(circle => (
          <div key={circle.id} className="p-5 bg-white border border-gray-100 rounded-[32px] shadow-sm animate-slideIn">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                  <Icons.Community />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{circle.name}</h3>
                  <p className="text-[10px] text-gray-400 font-medium">📍 {circle.neighborhood}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${circle.privacy === 'invite-only' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                {circle.privacy.replace('-', ' ')}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed my-3">{circle.description}</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
              <span className="text-[10px] font-bold text-gray-400">{circle.memberCount} members active</span>
              <button className="text-[10px] font-bold text-blue-600 hover:underline">Manage Circle</button>
            </div>
          </div>
        ))}
      </div>

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl p-6 animate-slideIn">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Start a New Circle</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Circle Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bandra Play Group"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Neighborhood</label>
                <input 
                  type="text" 
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. Pali Hill, Mumbai"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Privacy Level</label>
                <select 
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as any)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-900 focus:outline-none"
                >
                  <option value="neighborhood-verified">Verified Neighbors Only</option>
                  <option value="invite-only">Invite-Only (Private)</option>
                </select>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-[10px] text-blue-700 italic">
                Only parents with verified addresses in this area will be able to join your neighborhood circle.
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg">Create Circle</button>
                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-3 border border-gray-100 rounded-xl text-xs font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Circles;
