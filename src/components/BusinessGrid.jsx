import React from 'react';
import BusinessCard from './BusinessCard';

const getDistanceMeters = (c1, c2) => {
  if (!c1 || !c2) return null;
  const R = 6371e3;
  const lat1 = c1[0] * Math.PI / 180;
  const lat2 = c2[0] * Math.PI / 180;
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLng = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default function BusinessGrid({
  places = [],
  selectedPlace,
  onSelect,
  onViewDetails,
  onExportSingle,
  userCoords
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4.5">
      {places.map((place) => {
        const isSelected = selectedPlace && selectedPlace.id === place.id;
        
        let distanceText = '';
        if (userCoords && place.coordinates) {
          const dist = getDistanceMeters(userCoords, place.coordinates);
          distanceText = dist >= 1000 
            ? `${(dist / 1000).toFixed(1)} km away` 
            : `${Math.round(dist)} m away`;
        }

        return (
          <BusinessCard
            key={place.id}
            business={place}
            viewMode="grid"
            isSelected={isSelected}
            onSelect={onSelect}
            onViewDetails={onViewDetails}
            onExportSingle={onExportSingle}
            distanceText={distanceText}
          />
        );
      })}
    </div>
  );
}
