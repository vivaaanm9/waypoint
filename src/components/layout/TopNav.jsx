import React from 'react';
import { LayoutDashboard, Compass, MapPin } from 'lucide-react';
import { useWaypointContext } from '../../context/WaypointContext';

export const TopNav = () => {
  const { activeView, setActiveView, setActiveBusinessId } = useWaypointContext();

  const handleNavigation = (view) => {
    setActiveView(view);
    setActiveBusinessId(null); // Clear active business when navigating away
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/60 border-b border-[#BCCCDC]/40 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation('dashboard')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <MapPin size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Waypoint
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavigation('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeView === 'dashboard'
                ? 'bg-blue-600/10 text-blue-600 shadow-sm'
                : 'text-gray-600 hover:bg-black/5 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          
          <button
            onClick={() => handleNavigation('explore')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeView === 'explore'
                ? 'bg-blue-600/10 text-blue-600 shadow-sm'
                : 'text-gray-600 hover:bg-black/5 hover:text-gray-900'
            }`}
          >
            <Compass size={16} />
            Explore
          </button>
        </div>

        {/* User Profile / Settings stub */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 border border-white shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
          <span className="text-xs font-bold text-gray-600">P</span>
        </div>
      </div>
    </nav>
  );
};
