import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';
import SearchSuggestions from './SearchSuggestions';

export default function SearchBar({ searchTerm, setSearchTerm, setActiveTab }) {
  const [val, setVal] = useState(searchTerm || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  // Sync value when search term updates globally
  useEffect(() => {
    setVal(searchTerm || '');
  }, [searchTerm]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (val.trim()) {
      setSearchTerm(val.trim());
      if (setActiveTab) setActiveTab('Search Map');
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (name) => {
    setVal(name);
    setSearchTerm(name);
    if (setActiveTab) setActiveTab('Search Map');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <form 
        onSubmit={handleSubmit}
        className="w-full bg-white border border-brand-border/60 rounded-full p-1.5 flex items-center shadow-md focus-within:border-brand-steel focus-within:shadow-lg transition-all duration-300"
      >
        <div className="pl-3.5 text-slate-400">
          <Search className="w-4.5 h-4.5" />
        </div>
        <input
          type="text"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search cafes, workspaces, wellness hubs..."
          className="flex-grow pl-3 pr-4 py-2 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
        />
        {val && (
          <button 
            type="button"
            onClick={() => { setVal(''); setSearchTerm(''); }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 mr-2 hover:bg-slate-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button 
          type="submit"
          className="w-9 h-9 rounded-full bg-brand-steel hover:bg-[#8A95A1] flex items-center justify-center text-white shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Autocomplete Suggestions Popup - Embed SearchSuggestions Component (#5) */}
      {showSuggestions && (
        <SearchSuggestions 
          query={val} 
          onSelect={handleSelectSuggestion} 
        />
      )}
    </div>
  );
}
