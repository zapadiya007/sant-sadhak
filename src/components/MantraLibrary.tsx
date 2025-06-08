import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  Heart, 
  BookOpen, 
  Volume2,
  Star,
  Filter
} from 'lucide-react';

const MantraLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const mantras = [
    {
      id: '1',
      name: 'Om Namah Shivaya',
      sanskrit: 'ॐ नमः शिवाय',
      translation: 'I bow to Shiva (the benevolent one)',
      category: 'shiva',
      benefits: 'Inner peace, spiritual awakening, removal of negativity',
      pronunciation: 'Om Nah-mah Shee-vah-ya',
      repetitions: 108,
      description: 'One of the most powerful mantras dedicated to Lord Shiva, representing the five elements.',
    },
    {
      id: '2',
      name: 'Gayatri Mantra',
      sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
      translation: 'We meditate on the glory of the Creator who illuminates our intellect',
      category: 'wisdom',
      benefits: 'Wisdom, clarity of thought, spiritual illumination',
      pronunciation: 'Om Bhur Bhuva Svaha, Tat Savitur Varenyam...',
      repetitions: 108,
      description: 'Universal prayer for wisdom and enlightenment, considered the mother of all mantras.',
    },
    {
      id: '3',
      name: 'Mahamrityunjaya Mantra',
      sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्',
      translation: 'We worship the three-eyed Lord Shiva who nourishes and nurtures all beings',
      category: 'healing',
      benefits: 'Health, healing, longevity, protection from danger',
      pronunciation: 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam...',
      repetitions: 108,
      description: 'Powerful healing mantra for physical and spiritual well-being.',
    },
    {
      id: '4',
      name: 'Hare Krishna Maha Mantra',
      sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे हरे राम हरे राम राम राम हरे हरे',
      translation: 'O Krishna, O Rama, please engage me in Your service',
      category: 'krishna',
      benefits: 'Devotion, joy, spiritual purification, divine love',
      pronunciation: 'Ha-re Krishna Ha-re Krishna, Krishna Krishna Ha-re Ha-re...',
      repetitions: 108,
      description: 'The great chant for deliverance, bringing one closer to Krishna consciousness.',
    },
    {
      id: '5',
      name: 'Om Gam Ganapataye Namaha',
      sanskrit: 'ॐ गं गणपतये नमः',
      translation: 'I bow to Lord Ganesha, remover of obstacles',
      category: 'ganesha',
      benefits: 'Obstacle removal, new beginnings, success, wisdom',
      pronunciation: 'Om Gam Ga-na-pa-ta-ye Na-ma-ha',
      repetitions: 108,
      description: 'Invocation to Lord Ganesha for removing obstacles and blessing new ventures.',
    },
    {
      id: '6',
      name: 'So Hum',
      sanskrit: 'सो ऽहम्',
      translation: 'I am That (universal consciousness)',
      category: 'meditation',
      benefits: 'Self-realization, meditation, unity consciousness',
      pronunciation: 'So (inhale) Hum (exhale)',
      repetitions: 'Natural breath',
      description: 'Simple yet profound mantra for meditation and self-inquiry.',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Mantras', count: mantras.length },
    { id: 'shiva', name: 'Lord Shiva', count: mantras.filter(m => m.category === 'shiva').length },
    { id: 'krishna', name: 'Lord Krishna', count: mantras.filter(m => m.category === 'krishna').length },
    { id: 'ganesha', name: 'Lord Ganesha', count: mantras.filter(m => m.category === 'ganesha').length },
    { id: 'wisdom', name: 'Wisdom', count: mantras.filter(m => m.category === 'wisdom').length },
    { id: 'healing', name: 'Healing', count: mantras.filter(m => m.category === 'healing').length },
    { id: 'meditation', name: 'Meditation', count: mantras.filter(m => m.category === 'meditation').length },
  ];

  const filteredMantras = mantras.filter(mantra => {
    const matchesSearch = mantra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mantra.translation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mantra.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (mantraId: string) => {
    setFavorites(prev => 
      prev.includes(mantraId) 
        ? prev.filter(id => id !== mantraId)
        : [...prev, mantraId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Sacred Mantras</h2>
        <p className="text-white/80">Collection of powerful mantras for spiritual practice</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search mantras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-white/60" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id} className="bg-gray-800">
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mantras Grid */}
      <div className="grid gap-6">
        {filteredMantras.map((mantra) => (
          <div key={mantra.id} className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{mantra.name}</h3>
                  <button
                    onClick={() => toggleFavorite(mantra.id)}
                    className={`p-1 rounded-full transition-colors ${
                      favorites.includes(mantra.id)
                        ? 'text-red-400 hover:text-red-300'
                        : 'text-white/40 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(mantra.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <p className="text-white/80 mb-1">{mantra.translation}</p>
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span>Repetitions: {mantra.repetitions}</span>
                  <span className="capitalize">{mantra.category}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sanskrit Text */}
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-white text-lg font-sanskrit text-center mb-2">
                {mantra.sanskrit}
              </p>
              <p className="text-white/70 text-sm text-center italic">
                {mantra.pronunciation}
              </p>
            </div>

            {/* Description and Benefits */}
            <div className="space-y-3">
              <div>
                <h4 className="text-white font-medium mb-1 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Description</span>
                </h4>
                <p className="text-white/80 text-sm">{mantra.description}</p>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-1 flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Benefits</span>
                </h4>
                <p className="text-white/80 text-sm">{mantra.benefits}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4">
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white hover:scale-105 transform transition-all duration-200">
                <Play className="w-4 h-4" />
                <span>Start Chanting</span>
              </button>
              <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMantras.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-white/60" />
          </div>
          <p className="text-white/60">No mantras found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default MantraLibrary;