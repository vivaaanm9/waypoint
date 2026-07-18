import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import BusinessPopup from './BusinessPopup';

const createDivIcon = (category, isActive) => {
  const baseColor = isActive ? '#ef4444' : '#9AA6B2';
  const ringColor = isActive ? 'rgba(239, 68, 68, 0.25)' : 'rgba(154, 166, 178, 0.2)';
  const activeScale = isActive ? 'scale(1.2)' : 'scale(1)';

  return L.divIcon({
    html: `
      <div style="transform: ${activeScale}; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="background-color: ${baseColor}; width: 32px; height: 32px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(154,166,178,0.25); border: 2px solid white; outline: 3.5px solid ${ringColor}">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            ${category === 'Cafes' ? '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>' : ''}
            ${category === 'Workspaces' ? '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' : ''}
            ${category === 'Health' ? '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' : ''}
            ${category === 'Tourist' ? '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>' : ''}
          </svg>
        </div>
        <div style="width: 5px; height: 5px; background-color: ${baseColor}; border-radius: 50%; margin-top: 1.5px; border: 1px solid white;"></div>
      </div>
    `,
    className: 'custom-map-business-icon',
    iconSize: [34, 42],
    iconAnchor: [17, 42],
    popupAnchor: [0, -36]
  });
};

export default function BusinessMarker({ business, isActive, onClick }) {
  return (
    <Marker
      position={business.coordinates}
      icon={createDivIcon(business.category, isActive)}
      eventHandlers={{
        click: () => onClick && onClick(business),
      }}
    >
      <BusinessPopup business={business} />
    </Marker>
  );
}
