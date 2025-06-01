import React, { useState, useCallback } from 'react';
import { Search, MapPin, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [showRecent, setShowRecent] = useState(false);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    
    onSearch(query.trim());
    
    // Add to recent searches
    const newRecentSearches = [
      query,
      ...recentSearches.filter(item => item !== query)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    setShowRecent(false);
  }, [query, recentSearches, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRecentSearch = (item: string) => {
    setQuery(item);
    onSearch(item);
    setShowRecent(false);
  };

  const clearSearch = () => {
    setQuery('');
  };

  const handleFocus = () => {
    if (recentSearches.length > 0) {
      setShowRecent(true);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="Search city or location..."
          className="w-full px-10 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute right-14 text-gray-400 hover:text-gray-200"
          >
            <X size={18} />
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="absolute right-3 bg-white/20 p-1.5 rounded-full text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MapPin size={18} />
        </button>
      </div>

      {/* Recent searches dropdown */}
      {showRecent && recentSearches.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-xl z-10"
          onMouseLeave={() => setShowRecent(false)}
        >
          <div className="px-3 py-2 text-xs text-gray-300 border-b border-white/10">
            Recent Searches
          </div>
          <ul>
            {recentSearches.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleRecentSearch(item)}
                  className="flex items-center w-full px-3 py-2 text-white hover:bg-white/10 transition-colors text-left"
                >
                  <Search size={16} className="mr-2 text-gray-400" />
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;