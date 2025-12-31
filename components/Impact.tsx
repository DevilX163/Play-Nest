
import React from 'react';
import { Icons } from '../constants';
import { ImpactStats } from '../types';

const Impact: React.FC = () => {
  const stats: ImpactStats = {
    toysShared: 142,
    wasteReducedKg: 86.5,
    moneySaved: 45000
  };

  return (
    <div className="py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Your Footprint</h2>
          <p className="text-xs text-gray-500">Small actions, real difference</p>
        </div>
        <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
           <Icons.Impact />
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-6 mb-10">
        <div className="relative p-8 rounded-[40px] bg-gradient-to-br from-green-400 to-green-600 text-white shadow-2xl overflow-hidden">
          <div className="relative z-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Total Waste Prevented</p>
            <h3 className="text-6xl font-bold">{stats.wasteReducedKg}<span className="text-xl font-normal ml-2">kg</span></h3>
            <p className="text-xs mt-4 font-medium italic opacity-90">Equivalent to 432 plastic toy trucks</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-green-300 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full blur-3xl opacity-10 -ml-10 -mt-10"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-[32px] bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Toys Shared</p>
            <h4 className="text-2xl font-bold text-gray-800">{stats.toysShared}</h4>
            <div className="w-8 h-1 bg-blue-400 mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="p-6 rounded-[32px] bg-white border border-gray-100 shadow-sm text-center">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Money Saved</p>
            <h4 className="text-2xl font-bold text-gray-800">₹{stats.moneySaved}</h4>
            <div className="w-8 h-1 bg-amber-400 mx-auto mt-2 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Sustainable Growth */}
      <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100">
        <h3 className="text-sm font-bold text-blue-800 mb-4">Milestones Reached</h3>
        <div className="space-y-4">
          {[
            { label: 'Earth Guardian', desc: 'Prevented 50kg of plastic waste', completed: true },
            { label: 'Community Hub', desc: 'Shared toys with 10 different families', completed: true },
            { label: 'Workshop Host', desc: 'Host your first local nature activity', completed: false },
          ].map((milestone, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${milestone.completed ? 'bg-green-500 text-white' : 'bg-white border border-blue-200 text-blue-200'}`}>
                {milestone.completed ? '✓' : i + 1}
              </div>
              <div>
                <h4 className={`text-xs font-bold ${milestone.completed ? 'text-blue-900' : 'text-blue-400'}`}>{milestone.label}</h4>
                <p className="text-[10px] text-blue-600/70">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 p-6 text-center">
        <p className="text-[10px] text-gray-400 leading-relaxed italic">
          "The best toy is one that is used, then passed on to someone who needs it next."
        </p>
      </div>
    </div>
  );
};

export default Impact;
