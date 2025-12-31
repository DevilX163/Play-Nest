
import React, { useState } from 'react';
import { Icons, STAGE_CONFIG } from '../constants';
import { AgeStage } from '../types';

interface OnboardingProps {
  onComplete: (childName: string, stage: AgeStage) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'signup' | 'child'>('welcome');
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [selectedStage, setSelectedStage] = useState<AgeStage>('toddler');

  const handleNext = () => {
    if (step === 'welcome') setStep('signup');
    else if (step === 'signup') setStep('child');
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (childName.trim()) {
      onComplete(childName.trim(), selectedStage);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-8 animate-fadeIn">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {step === 'welcome' && (
          <div className="space-y-8 text-center animate-slideIn">
            <div className="w-24 h-24 bg-blue-50 rounded-[32px] mx-auto flex items-center justify-center text-blue-500 shadow-sm border border-blue-100">
              <Icons.Home />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Play<br/><span className="text-blue-600">Nest</span></h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                A calm, safe community for parents to share toys, find local workshops, and reduce waste.
              </p>
            </div>
            <button 
              onClick={handleNext}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl hover:bg-gray-800 transition-all active:scale-95"
            >
              Get Started
            </button>
            <p className="text-[10px] text-gray-400">By continuing, you agree to our parent-first safety guidelines.</p>
          </div>
        )}

        {step === 'signup' && (
          <div className="space-y-6 animate-slideIn">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Parent Profile</h2>
              <p className="text-xs text-gray-500">Only verified parents can interact in our circles.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Your Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Alex Miller"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-900 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="parent@email.com"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-900 transition-all"
                />
              </div>
            </div>
            <button 
              onClick={handleNext}
              disabled={!parentName}
              className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${parentName ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              Verify Identity
            </button>
          </div>
        )}

        {step === 'child' && (
          <div className="space-y-6 animate-slideIn">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Add Your First Child</h2>
              <p className="text-xs text-gray-500">We use this to curate developmental toys and workshops.</p>
            </div>
            <form onSubmit={handleFinish} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Child's Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Charlie"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-900 transition-all"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Developmental Stage</label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(STAGE_CONFIG) as AgeStage[]).map(stage => {
                    const active = selectedStage === stage;
                    return (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => setSelectedStage(stage)}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col text-left ${active ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-gray-100 bg-white'}`}
                      >
                        <span className={`text-[10px] font-bold uppercase mb-1 ${active ? 'text-blue-600' : 'text-gray-400'}`}>
                          {STAGE_CONFIG[stage].label}
                        </span>
                        <span className={`text-[9px] ${active ? 'text-blue-500' : 'text-gray-400'}`}>
                          {STAGE_CONFIG[stage].range}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button 
                type="submit"
                disabled={!childName}
                className={`w-full py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95 ${childName ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                Create Nest & Start Playing
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full transition-all ${step === 'welcome' ? 'w-4 bg-blue-600' : 'bg-gray-200'}`} />
        <div className={`w-1.5 h-1.5 rounded-full transition-all ${step === 'signup' ? 'w-4 bg-blue-600' : 'bg-gray-200'}`} />
        <div className={`w-1.5 h-1.5 rounded-full transition-all ${step === 'child' ? 'w-4 bg-blue-600' : 'bg-gray-200'}`} />
      </div>
    </div>
  );
};

export default Onboarding;