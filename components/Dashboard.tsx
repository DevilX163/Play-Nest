
import React, { useState } from 'react';
import { ChildProfile, AgeStage } from '../types';
import { STAGE_CONFIG, Icons, MOCK_PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';

interface DashboardProps {
  profiles: ChildProfile[];
  activeChild: ChildProfile | null;
  setActiveChildId: (id: string) => void;
  onAddProfile: (name: string, stage: AgeStage) => void;
  onDeleteProfile: (id: string) => void;
  userPoints: number;
}

const Dashboard: React.FC<DashboardProps> = ({ profiles, activeChild, setActiveChildId, onAddProfile, onDeleteProfile, userPoints }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newStage, setNewStage] = useState<AgeStage>('toddler');
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);

  const config = activeChild ? STAGE_CONFIG[activeChild.stage] : null;
  const relevantProducts = activeChild ? MOCK_PRODUCTS.filter(p => p.stage === activeChild.stage) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAddProfile(newName.trim(), newStage);
      setNewName('');
      setIsAdding(false);
    }
  };

  const confirmDelete = () => {
    if (profileToDelete) {
      onDeleteProfile(profileToDelete);
      setProfileToDelete(null);
    }
  };

  return (
    <div className="py-4 animate-fadeIn">
      {/* Points & Stats Bar */}
      <section className="mb-8 flex gap-4">
        <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-[32px] shadow-xl text-white overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Your Nest Balance</p>
            <div className="flex items-center gap-2">
               <span className="text-3xl font-bold">{userPoints}</span>
               <div className="p-1 bg-white/20 rounded-full">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                 </svg>
               </div>
            </div>
            <p className="text-[9px] mt-2 opacity-70">Earn more by sharing toys or activities</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* Child Selector */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Child Profiles
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {profiles.map(p => {
            const profileConfig = STAGE_CONFIG[p.stage];
            const isActive = activeChild?.id === p.id;
            return (
              <div key={p.id} className="relative flex-none">
                <button
                  onClick={() => setActiveChildId(p.id)}
                  className={`w-28 p-3 rounded-2xl transition-all duration-300 border-2 ${
                    isActive 
                    ? 'border-blue-300 bg-blue-50 shadow-md transform -translate-y-1' 
                    : 'border-transparent bg-gray-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white mx-auto mb-2 flex items-center justify-center text-lg font-bold text-blue-500 shadow-sm">
                    {p.name[0]}
                  </div>
                  <p className={`text-xs font-bold text-center truncate ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {p.name}
                  </p>
                  <p className="text-[9px] text-gray-400 text-center font-medium opacity-80">
                    {profileConfig.range}
                  </p>
                </button>
                {isActive && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileToDelete(p.id);
                    }}
                    className="absolute -top-1 -right-1 bg-red-100 text-red-500 p-1 rounded-full shadow-sm hover:bg-red-200 transition-colors z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
          <button 
            onClick={() => setIsAdding(true)}
            className="flex-none w-24 p-4 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
          >
             <Icons.Plus />
             <p className="text-[10px] font-bold text-gray-400 mt-2">New</p>
          </button>
        </div>
      </section>

      {/* Confirmation Modal for Profile Deletion */}
      {profileToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl p-8 animate-slideIn">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Remove Profile?</h3>
            <p className="text-xs text-center text-gray-500 mb-8 leading-relaxed">
              Are you sure you want to remove <strong>{profiles.find(p => p.id === profileToDelete)?.name}'s</strong> profile? This will permanently delete their developmental data.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-500 text-white rounded-2xl text-xs font-bold shadow-lg hover:bg-red-600 transition-colors"
              >
                Yes, Remove
              </button>
              <button 
                onClick={() => setProfileToDelete(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-2xl text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Showcase Preview */}
      {activeChild && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Creations</h2>
            <Link to="/gallery" className="text-[10px] text-blue-500 font-bold hover:underline">View Gallery</Link>
          </div>
          <div className="bg-indigo-50 rounded-[32px] p-5 border border-indigo-100 flex items-center gap-4">
            <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-indigo-400 shadow-sm border border-indigo-100">
               <Icons.Gallery />
            </div>
            <div>
              <h4 className="text-xs font-bold text-indigo-900">Showcase {activeChild.name}'s talent</h4>
              <p className="text-[10px] text-indigo-600/70 mt-1 leading-relaxed">
                Post artworks, secret recipes, or projects to the local circle.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Inline Form for Adding Child */}
      {isAdding && (
        <section className="mb-8 p-6 rounded-3xl bg-blue-50 border border-blue-100 animate-slideIn">
          <h3 className="text-sm font-bold text-blue-800 mb-4">Add Child Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              autoFocus
              type="text" 
              placeholder="Child's Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-900"
              required
            />
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STAGE_CONFIG) as AgeStage[]).map(stage => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => setNewStage(stage)}
                  className={`flex-1 min-w-[80px] py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${newStage === stage ? 'bg-blue-500 text-white' : 'bg-white text-blue-400 border border-blue-100'}`}
                >
                  <div className="flex flex-col">
                    <span>{STAGE_CONFIG[stage].label}</span>
                    <span className="text-[7px] opacity-70 lowercase">{STAGE_CONFIG[stage].range}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button 
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Create Profile
              </button>
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-3 bg-white text-gray-500 rounded-xl text-xs font-bold border border-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Active Stage Info */}
      {activeChild && config && !isAdding && (
        <section className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.color} mb-1 w-fit`}>
                {config.label} Stage
              </span>
              <span className="text-xs text-gray-400 font-bold ml-1">{config.range}</span>
            </div>
            <div className="text-blue-400">
              <Icons.Shield />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{activeChild.name}'s Growth Focus</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {config.focus}
          </p>
          <div className="space-y-3">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recommended Focus Areas</p>
             <div className="flex flex-wrap gap-2">
                {config.hashtags.map(tag => (
                  <span key={tag} className="text-[10px] bg-white border border-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-medium shadow-sm">
                    #{tag}
                  </span>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Development Shop Section */}
      {activeChild && !isAdding && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Growth Store</h2>
            <button className="text-[10px] text-blue-500 font-bold hover:underline">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {relevantProducts.map(product => (
              <div key={product.id} className="flex-none w-64 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="relative h-32">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-blue-600/90 text-white text-[10px] px-2 py-1 rounded-lg font-bold">
                    ₹{product.price}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-[8px] font-bold text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded-full mb-1 inline-block">
                      {product.benefit}
                    </span>
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{product.name}</h4>
                  </div>
                  <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed flex-1">
                    {product.description}
                  </p>
                  <button className="mt-4 w-full py-2 bg-gray-50 text-blue-600 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors border border-blue-100">
                    <Icons.Cart />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
          <h4 className="text-xs font-bold text-green-700 mb-1">Toys Waiting</h4>
          <p className="text-2xl font-bold text-green-900">2</p>
          <p className="text-[10px] text-green-600 mt-1">Approval needed</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
          <h4 className="text-xs font-bold text-amber-700 mb-1">Upcoming Play</h4>
          <p className="text-2xl font-bold text-amber-900">Sat</p>
          <p className="text-[10px] text-amber-600 mt-1">Art Workshop</p>
        </div>
      </section>

      {/* Safety Message */}
      <div className="mt-10 p-4 bg-gray-50 rounded-xl border border-gray-100 flex gap-4 items-center">
        <div className="text-blue-500 bg-white p-2 rounded-lg shadow-sm">
           <Icons.Shield />
        </div>
        <p className="text-[10px] text-gray-500 italic">
          Safety first: Every exchange and activity requires parent verification. Your child has no public presence.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
