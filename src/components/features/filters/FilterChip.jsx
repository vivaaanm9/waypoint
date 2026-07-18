import React from 'react';
import { X } from 'lucide-react';
import { useWaypointContext } from '../../../context/WaypointContext';



export const FilterChip = ({ filterKey, label, value }) => {
  const { removeFilter } = useWaypointContext();

  const handleRemove = () => {
    removeFilter(filterKey);
  };

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D9EAFD]/20 border border-[#BCCCDC]/50 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-[#D9EAFD]/40 hover:-translate-y-0.5 hover:shadow-md cursor-default group">
      <span className="text-sm font-medium text-[#9AA6B2]">
        {label}: <span className="text-gray-700">{value.toString()}</span>
      </span>
      <button
        onClick={handleRemove}
        className="text-[#9AA6B2] hover:text-gray-700 focus:outline-none rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X size={14} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
