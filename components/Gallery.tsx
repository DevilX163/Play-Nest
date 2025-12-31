
import React, { useState } from 'react';
import { ShowcaseItem, ShowcaseType, ChildProfile } from '../types';
import { Icons } from '../constants';

interface GalleryProps {
  activeChild: ChildProfile | null;
}

const INITIAL_ITEMS: ShowcaseItem[] = [
  {
    id: 's1',
    childId: 'c1',
    childName: 'Aria',
    type: 'artwork',
    title: 'Autumn Forest',
    content: 'Painting made with fallen leaves and watercolors.',
    imageUrl: 'https://images.unsplash.com/photo-1541689221361-ad95003aa0d5?auto=format&fit=crop&q=80&w=400',
    likes: 12,
    timestamp: '2 hours ago'
  },
  {
    id: 's2',
    childId: 'c2',
    childName: 'Reyan',
    type: 'recipe',
    title: 'Mango Lassi Ice-Pops',
    content: 'Blend mangoes, curd, and honey. Freeze for 4 hours! Best summer treat.',
    imageUrl: 'https://images.unsplash.com/photo-1536511110594-7e0829f96f70?auto=format&fit=crop&q=80&w=400',
    likes: 8,
    timestamp: '5 hours ago'
  },
  {
    id: 's3',
    childId: 'c3',
    childName: 'Ishan',
    type: 'blog',
    title: 'My Bird Watching Log',
    content: 'Today I saw a Kingfisher near the pond. It had beautiful bright blue feathers. I waited for 20 minutes to see it catch a fish!',
    likes: 15,
    timestamp: 'Yesterday'
  },
  {
    id: 's4',
    childId: 'c4',
    childName: 'Kiara',
    type: 'project',
    title: 'Eco-Robot V1',
    content: 'Made from old cardboard boxes and plastic bottle caps. He can hold my pencils!',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400',
    likes: 24,
    timestamp: '2 days ago'
  }
];

const Gallery: React.FC<GalleryProps> = ({ activeChild }) => {
  const [items, setItems] = useState<ShowcaseItem[]>(INITIAL_ITEMS);
  const [filter, setFilter] = useState<ShowcaseType | 'all'>('all');
  const [isAdding, setIsAdding] = useState(false);

  // New Item Form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<ShowcaseType>('artwork');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChild) return;

    const newItem: ShowcaseItem = {
      id: Math.random().toString(36).substr(2, 9),
      childId: activeChild.id,
      childName: activeChild.name,
      type: newType,
      title: newTitle,
      content: newContent,
      likes: 0,
      timestamp: 'Just now'
    };

    setItems([newItem, ...items]);
    setIsAdding(false);
    setNewTitle('');
    setNewContent('');
    alert("Sent for Parent Approval! Your creation will appear soon.");
  };

  const filteredItems = items.filter(i => filter === 'all' || i.type === filter);

  return (
    <div className="py-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Nest Gallery</h2>
          <p className="text-xs text-gray-500">Celebrating little creators</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          <Icons.Plus />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {['all', 'artwork', 'recipe', 'blog', 'project'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t as any)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-bold transition-all ${
              filter === t 
              ? 'bg-gray-900 text-white shadow-md' 
              : 'bg-white text-gray-500 border border-gray-100'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="space-y-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden animate-slideIn">
            {item.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                  {item.type}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">{item.timestamp}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.content}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-500">
                    {item.childName[0]}
                  </div>
                  <span className="text-xs font-bold text-gray-700">by {item.childName}</span>
                </div>
                <div className="flex items-center gap-1.5 text-pink-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold">{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl p-6 animate-slideIn">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Showcase Your Work</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="flex gap-2">
                {(['artwork', 'recipe', 'blog', 'project'] as ShowcaseType[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNewType(t)}
                    className={`flex-1 py-2 rounded-xl text-[9px] font-bold uppercase ${newType === t ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <input 
                autoFocus
                type="text" 
                placeholder="Title (e.g. My LEGO Castle)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm"
                required
              />
              <textarea 
                rows={4}
                placeholder="Describe your creation or share your recipe/story..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm resize-none"
                required
              />
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 mb-2">
                <p className="text-[10px] text-blue-700 italic">
                  Parents: This will be reviewed by you before appearing in the local community circle.
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Share to Circle
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-3 border border-gray-100 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
