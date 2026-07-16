import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useWaypointContext } from '../../../context/WaypointContext';

const SORT_OPTIONS = [
  { id: 'highest_rated', label: 'Highest Rated' },
  { id: 'most_reviewed', label: 'Most Reviewed' },
  { id: 'nearest', label: 'Nearest' },
];

export const SortDropdown = () => {
  const { sortBy, setSortBy } = useWaypointContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeOption = SORT_OPTIONS.find((opt) => opt.id === sortBy) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/40 border border-[#BCCCDC]/40 rounded-xl backdrop-blur-lg shadow-sm text-[#9AA6B2] hover:bg-[#D9EAFD]/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 focus:outline-none"
      >
        <span className="text-sm font-medium">Sort by: {activeOption.label}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white/80 border border-[#BCCCDC]/30 rounded-xl backdrop-blur-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="py-1">
            {SORT_OPTIONS.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => {
                    setSortBy(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-[#D9EAFD]/40 transition-colors ${
                    sortBy === option.id ? 'text-gray-800 font-semibold' : 'text-[#9AA6B2]'
                  }`}
                >
                  {option.label}
                  {sortBy === option.id && <Check size={16} className="text-[#9AA6B2]" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
