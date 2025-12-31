
import React, { useState, useEffect, useRef } from 'react';
import { ToyItem, AgeStage, ToyCondition, UsageDuration, UsageIntensity } from '../types';
import { Icons, STAGE_CONFIG } from '../constants';
import { getAIToyRecommendations, assessToyConditionAI } from '../services/gemini';

interface ToyLibraryProps {
  toys: ToyItem[];
  stage: AgeStage;
  onAddToy: (toy: ToyItem) => void;
}

const ToyLibrary: React.FC<ToyLibraryProps> = ({ toys, stage, onAddToy }) => {
  const [filter, setFilter] = useState<AgeStage | 'all'>('all');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isListing, setIsListing] = useState(false);
  
  // Listing Form State
  const [newToyName, setNewToyName] = useState('');
  const [newToyDesc, setNewToyDesc] = useState('');
  const [newDuration, setNewDuration] = useState<UsageDuration>('6-12 months');
  const [newIntensity, setNewIntensity] = useState<UsageIntensity>('Moderate');
  const [assessing, setAssessing] = useState(false);
  const [assessment, setAssessment] = useState<any>(null);
  const [toyImage, setToyImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchAI = async () => {
      setLoadingAI(true);
      const recs = await getAIToyRecommendations(stage, toys.map(t => t.name));
      setRecommendations(recs);
      setLoadingAI(false);
    };
    fetchAI();
  }, [stage, toys]);

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setToyImage(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleAssess = async () => {
    if (!newToyName || !newToyDesc) return;
    setAssessing(true);
    const base64Data = toyImage ? toyImage.split(',')[1] : undefined;
    const result = await assessToyConditionAI(newToyName, newToyDesc, newDuration, newIntensity, base64Data);
    setAssessment(result);
    setAssessing(false);
  };

  const handleFinalizeList = () => {
    if (!assessment) return;
    const toy: ToyItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newToyName,
      description: newToyDesc,
      ownerId: 'me',
      stage: 'toddler', 
      category: 'General',
      imageUrl: toyImage || 'https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=200',
      status: 'available',
      condition: assessment.condition as ToyCondition,
      price: assessment.suggestedPrice,
      exchangeValue: assessment.suggestedCredits,
      usageDuration: newDuration,
      usageIntensity: newIntensity
    };
    onAddToy(toy);
    setIsListing(false);
    setAssessment(null);
    setToyImage(null);
    setNewToyName('');
    setNewToyDesc('');
  };

  const filteredToys = toys.filter(t => filter === 'all' || t.stage === filter);

  return (
    <div className="py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Community Library</h2>
        <button 
          onClick={() => setIsListing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95"
        >
          <Icons.Plus />
          List Toy
        </button>
      </div>

      {/* AI Recommendations */}
      {!loadingAI && recommendations.length > 0 && (
        <div className="mb-8 p-5 bg-amber-50 border border-amber-100 rounded-[24px] shadow-sm animate-slideIn">
          <div className="flex items-center gap-2 mb-3">
             <div className="p-1.5 bg-amber-400 rounded-lg text-white shadow-sm">✨</div>
             <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest">AI Curated Picks</h3>
          </div>
          <div className="space-y-3">
            {recommendations.slice(0, 2).map((rec, idx) => (
              <div key={idx} className="bg-white/70 p-3 rounded-xl border border-amber-200/50">
                <p className="text-xs font-bold text-gray-800">{rec.toyName}</p>
                <p className="text-[10px] text-gray-600 mt-1 leading-relaxed">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {['all', 'infant', 'toddler', 'schooler', 'teen'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s as any)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-bold transition-all ${
              filter === s 
              ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
              : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {s === 'all' ? 'All Toys' : STAGE_CONFIG[s as AgeStage].label}
          </button>
        ))}
      </div>

      {/* Toy Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredToys.map(toy => (
          <div key={toy.id} className="group bg-white rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all animate-fadeIn">
            <div className="relative h-32 bg-gray-50">
              <img src={toy.imageUrl} alt={toy.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 px-2.5 py-1 bg-white/95 rounded-full text-[9px] font-bold text-gray-700 shadow-sm border border-gray-100">
                {toy.condition}
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-xs font-bold text-gray-900 truncate mb-1">{toy.name}</h4>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-blue-600">₹{toy.price}</span>
                <span className="text-[10px] font-bold text-green-600">{toy.exchangeValue} pts</span>
              </div>
              <button className="w-full py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                Request Nest Swap
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Listing Toy */}
      {isListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden animate-slideIn my-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">List a New Toy</h3>
                <button onClick={() => { setIsListing(false); stopCamera(); }} className="text-gray-400 hover:text-gray-600">
                   <Icons.Plus /> 
                </button>
              </div>

              {!assessment ? (
                <div className="space-y-4">
                  {/* Photo/Video Capture Section */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Visual Proof (Photo/Video)</label>
                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200">
                      {isCameraActive ? (
                        <>
                          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                          <button 
                            onClick={capturePhoto}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 bg-white rounded-full shadow-lg text-blue-600"
                          >
                            <Icons.Activity />
                          </button>
                        </>
                      ) : toyImage ? (
                        <div className="relative w-full h-full">
                          <img src={toyImage} className="w-full h-full object-cover" alt="Captured toy" />
                          <button 
                            onClick={startCamera}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full"
                          >
                             <Icons.Plus />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={startCamera}
                          className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400"
                        >
                          <div className="p-3 bg-white rounded-full shadow-sm">
                            <Icons.Gallery />
                          </div>
                          <span className="text-[10px] font-bold">Open Camera for Analysis</span>
                        </button>
                      )}
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Toy Name</label>
                    <input 
                      type="text" 
                      value={newToyName}
                      onChange={(e) => setNewToyName(e.target.value)}
                      placeholder="e.g. Remote Control Car"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Owned For</label>
                      <select 
                        value={newDuration}
                        onChange={(e) => setNewDuration(e.target.value as UsageDuration)}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[11px] text-gray-900"
                      >
                        <option value="< 6 months">Under 6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2+ years">Over 2 years</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Play Intensity</label>
                      <select 
                        value={newIntensity}
                        onChange={(e) => setNewIntensity(e.target.value as UsageIntensity)}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[11px] text-gray-900"
                      >
                        <option value="Light">Light (Showpiece)</option>
                        <option value="Moderate">Moderate (Active)</option>
                        <option value="Heavy">Heavy (Daily use)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea 
                      rows={2}
                      value={newToyDesc}
                      onChange={(e) => setNewToyDesc(e.target.value)}
                      placeholder="e.g. Small dent on bottom, but works well."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm text-gray-900 resize-none"
                    />
                  </div>
                  <button 
                    onClick={handleAssess}
                    disabled={assessing || !newToyName || !toyImage}
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {assessing ? 'AI Assessing Value...' : 'AI Value Assessment'}
                  </button>
                </div>
              ) : (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-bold text-blue-800 uppercase">AI Rating: {assessment.condition}</span>
                       <span className="text-[10px] font-bold text-blue-800">{assessment.bloomScore}/10</span>
                    </div>
                    <p className="text-xs text-blue-700 italic leading-relaxed mb-4">"{assessment.reasoning}"</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-blue-200">
                        <p className="text-[8px] text-gray-400 uppercase font-bold">Market Value</p>
                        <p className="text-sm font-bold text-gray-800">₹{assessment.suggestedPrice}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-blue-200">
                        <p className="text-[8px] text-gray-400 uppercase font-bold">Nest Credits</p>
                        <p className="text-sm font-bold text-gray-800">{assessment.suggestedCredits}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setAssessment(null)}
                      className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50"
                    >
                      Re-Assess
                    </button>
                    <button 
                      onClick={handleFinalizeList}
                      className="flex-1 py-3 bg-green-600 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-green-700"
                    >
                      Finalize Listing
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToyLibrary;
