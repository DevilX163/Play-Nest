
import React, { useState } from 'react';
import { Icons } from '../constants';

const Community: React.FC = () => {
  const [requestSent, setRequestSent] = useState<string | null>(null);
  const [isInviting, setIsInviting] = useState(false);

  const families = [
    { id: 'f1', name: 'The Millers', distance: '0.4 mi', shared: 12, trustScore: 'High' },
    { id: 'f2', name: 'Sarah & Ben', distance: '0.8 mi', shared: 8, trustScore: 'High' },
    { id: 'f3', name: 'Leo\'s Crew', distance: '1.5 mi', shared: 24, trustScore: 'Verified' },
  ];

  const handleAction = (id: string) => {
    setRequestSent(id);
    setTimeout(() => setRequestSent(null), 3000);
  };

  const handleInvite = () => {
    setIsInviting(true);
    setTimeout(() => {
      setIsInviting(false);
      setRequestSent('invite');
      setTimeout(() => setRequestSent(null), 3000);
    }, 1500);
  };

  return (
    <div className="py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Local Circles</h2>
          <p className="text-xs text-gray-500">Connecting through trust, not scale</p>
        </div>
        <div className="p-2 bg-green-50 rounded-xl text-green-600">
           <Icons.Community />
        </div>
      </div>

      {/* Safety Banner */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
        <div className="shrink-0 text-blue-500 mt-1">
          <Icons.Shield />
        </div>
        <div>
          <h4 className="text-xs font-bold text-blue-800">Verified Parents Only</h4>
          <p className="text-[10px] text-blue-600 leading-relaxed mt-0.5">
            Every family in your circle has been verified through our community trust system. 
            No public interactions are allowed.
          </p>
        </div>
      </div>

      {/* Success Feedback */}
      {requestSent && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded-xl text-center text-xs font-bold animate-bounce shadow-lg">
          {requestSent === 'invite' ? 'Invitation link sent successfully!' : 'Request to join circle sent! Waiting for parent approval.'}
        </div>
      )}

      {/* Nearby Families */}
      <div className="space-y-4">
        {families.map((family) => (
          <div key={family.id} className="flex flex-col gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-300">
                  <Icons.Community />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">{family.name}</h4>
                  <p className="text-[9px] text-gray-400">{family.distance} away • {family.shared} toys shared</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-[8px] font-bold uppercase">
                {family.trustScore}
              </span>
            </div>
            <button 
              onClick={() => handleAction(family.id)}
              disabled={requestSent === family.id}
              className={`w-full py-2 rounded-lg text-[10px] font-bold transition-all ${
                requestSent === family.id ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-blue-600 border border-blue-100 hover:bg-blue-50'
              }`}
            >
              {requestSent === family.id ? 'Request Pending' : 'Join Circle'}
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={handleInvite}
        disabled={isInviting}
        className="w-full mt-10 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-xs font-bold text-gray-400 hover:border-blue-200 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
      >
         {isInviting ? (
           <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
         ) : <Icons.Plus />}
         {isInviting ? 'Generating Link...' : 'Invite a Trusted Neighbor'}
      </button>

      <div className="mt-8 p-6 rounded-3xl bg-gray-50 border border-gray-100">
        <h4 className="text-sm font-bold text-gray-800 mb-2">Safe Socialize</h4>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Create small groups for school projects, playdates, or shared childcare. 
          Bloom & Borrow ensures that only parents handle communication and logistics.
        </p>
      </div>
    </div>
  );
};

export default Community;
