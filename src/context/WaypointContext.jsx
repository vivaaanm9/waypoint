import React, { createContext, useContext, useState } from 'react';

// Define the shape of our state



const defaultFilters = {
  category: null,
  priceLevel: null,
  ratingMin: null,
  openNow: false,
};

const WaypointContext = createContext(undefined);

export const WaypointProvider = ({ children }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState('highest_rated');
  const [activeBusinessId, setActiveBusinessId] = useState(null);
  const [activeView, setActiveView] = useState('explore'); // 'dashboard' or 'explore'
  
  // Live Data State
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);

  const removeFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: key === 'openNow' ? false : null,
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <WaypointContext.Provider
      value={{
        filters,
        setFilters,
        sortBy,
        setSortBy,
        activeBusinessId,
        setActiveBusinessId,
        activeView,
        setActiveView,
        businesses,
        setBusinesses,
        isLoading,
        setIsLoading,
        searchLocation,
        setSearchLocation,
        removeFilter,
        clearFilters,
      }}
    >
      {children}
    </WaypointContext.Provider>
  );
};

export const useWaypointContext = () => {
  const context = useContext(WaypointContext);
  if (context === undefined) {
    throw new Error('useWaypointContext must be used within a WaypointProvider');
  }
  return context;
};
