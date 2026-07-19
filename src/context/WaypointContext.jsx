import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultFilters = {
  category: null,
  priceLevel: null,
  ratingMin: null,
  openNow: false,
  wifi: false,
  parking: false,
  wheelchair: false,
  ac: false,
  verified: false
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
  const [userCoords, setUserCoords] = useState(null);

  // Geolocate user on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setUserCoords(coords);
          setSearchLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "Your Location"
          });
        },
        (error) => {
          console.warn("Geolocation denied, using default New York.");
          const fallback = [40.7580, -73.9855];
          setUserCoords(fallback);
          setSearchLocation({
            lat: fallback[0],
            lng: fallback[1],
            name: "New York"
          });
        }
      );
    } else {
      const fallback = [40.7580, -73.9855];
      setUserCoords(fallback);
      setSearchLocation({
        lat: fallback[0],
        lng: fallback[1],
        name: "New York"
      });
    }
  }, []);

  const removeFilter = (key) => {
    const booleans = ['openNow', 'wifi', 'parking', 'wheelchair', 'ac', 'verified'];
    setFilters((prev) => ({
      ...prev,
      [key]: booleans.includes(key) ? false : null,
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
        userCoords,
        setUserCoords
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
