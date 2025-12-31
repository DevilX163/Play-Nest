
import React, { useState, useEffect } from 'react';
import { ChildProfile, Activity } from '../types';
import { Icons, STAGE_CONFIG } from '../constants';
import { getAIActivitySuggestions } from '../services/gemini';

interface ActivitiesProps {
  child: ChildProfile;
}

interface DetailedWorkshop extends Activity {
  instructor: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  parentGuide: string;
}

const Activities: React.FC<ActivitiesProps> = ({ child }) => {
  const [aiActivities, setAiActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [joiningId, setJoiningId] = useState<string | null>(null);

  // Mock detailed local workshops
  const localWorkshops: DetailedWorkshop[] = [
    {
      id: 'w1',
      title: 'Little Artists Mud Kitchen',
      description: 'A messy, tactile exploration for early years. Children will use natural ingredients like mud, petals, and sand to "cook" up imaginative dishes.',
      category: 'art',
      minAge: 1,
      maxAge: 4,
      duration: '90 mins',
      instructor: 'Elara Moon',
      location: 'Greenwood Community Garden',
      maxParticipants: 8,
      currentParticipants: 5,
      parentGuide: 'Bring a change of clothes and a small towel. Aprons provided.'
    },
    {
      id: 'w2',
      title: 'Young Coders: Logic Puzzles',
      description: 'Unplugged coding principles taught through physical movement and teamwork games. Great for building computational thinking without screens.',
      category: 'stem',
      minAge: 6,
      maxAge: 10,
      duration: '60 mins',
      instructor: 'David Chen',
      location: 'Central Library Hall',
      maxParticipants: 12,
      currentParticipants: 8,
      parentGuide: 'Parent attendance optional for ages 8+. No devices needed.'
    },
    {
      id: 'w3',
      title: 'Nature Storytelling Circle',
      description: 'An interactive walk through the local woods where the environment dictates the plot. We build tiny shelters for woodland "sprites".',
      category: 'storytelling',
      minAge: 4,
      maxAge: 12,
      duration: '2 hours',
      instructor: 'Sarah "Oak" Jenkins',
      location: 'Willow Creek Trailhead',
      maxParticipants: 15,
      currentParticipants: 11,
      parentGuide: 'Comfortable walking shoes and a refillable water bottle are required.'
    }
  ];

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const res = await getAIActivitySuggestions(child.stage, child.interests);
      if (res && Array.isArray(res)) {
        setAiActivities(res.map((a: any, i: number) => ({
          id: `ai-${i}`,
          ...a,
          isAI: true
        })));
      }
      setLoading(false);
    };
    fetchActivities();
  }, [child]);

  const handleJoin = (id: string) => {
    setJoiningId(id);
    // Simulating parent approval request
    setTimeout(() => {
      setJoiningId(null);
      alert("A participation request has been sent to your Community Circle for approval. You will be notified once the space is confirmed.");
    }, 1200);
  };

  return (
    <div className="py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Workshops to Join</h2>
          <p className="text-xs text-gray-500">Local, offline growth for {child.name}</p>
        </div>
        <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
           <Icons.Activity />
        </div>
      </div>

      {/* Local Community Workshops */}
      <div className="space-y-6 mb-10">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nearby Circles</h3>
        {localWorkshops
          .filter(w => (child.stage === 'infant' && w.minAge <= 2) || 
                      (child.stage === 'toddler' && w.minAge <= 5) ||
                      (child.stage === 'schooler' && w.minAge <= 10) ||
                      (child.stage === 'teen' && w.maxAge >= 11))
          .map((workshop) => (
            <div key={workshop.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-bold uppercase tracking-widest">
                    {workshop.category}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 font-medium">📍 {workshop.location}</span>
                    <span className="text-[10px] text-gray-400 font-medium">⏱ {workshop.duration}</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-gray-800 mb-2">{workshop.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{workshop.description}</p>
                
                <div className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-400">Instructor</span>
                    <span className="text-gray-700 font-bold">{workshop.instructor}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-400">Group Size</span>
                    <span className="text-gray-700 font-bold">{workshop.currentParticipants}/{workshop.maxParticipants} spaces taken</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200/50">
                    <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">Parent Guide</p>
                    <p className="text-[10px] text-gray-600 italic leading-snug">{workshop.parentGuide}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleJoin(workshop.id)}
                  disabled={joiningId === workshop.id}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    joiningId === workshop.id ? 'bg-green-100 text-green-600' : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                  }`}
                >
                  {joiningId === workshop.id ? (
                    <>
                      <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                      Requesting Access...
                    </>
                  ) : 'Join this Workshop Circle'}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* AI Suggested At-Home Activities */}
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">AI Suggested Home Play</h3>
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          aiActivities.map((activity) => (
            <div key={activity.id} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group border-l-4 border-l-blue-200">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[8px] font-bold text-gray-500 uppercase">
                  {activity.category}
                </span>
                <span className="text-[10px] font-medium text-gray-400">🏠 Home Activity</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-blue-500 transition-colors">
                {activity.title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-center text-[10px] text-gray-400 flex items-center justify-center gap-2">
        <Icons.Shield />
        <span>Only verified community instructors can host workshops.</span>
      </div>
    </div>
  );
};

export default Activities;
