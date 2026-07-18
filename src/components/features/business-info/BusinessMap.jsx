import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useWaypointContext } from '../../../context/WaypointContext';

// Fix Leaflet's default icon path issues with bundlers
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker for selected state (Red)
const SelectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to dynamically adjust map bounds
const MapBounds = ({ businesses }) => {
  const map = useMap();
  useEffect(() => {
    if (businesses.length === 0) return;
    const bounds = L.latLngBounds(businesses.map(b => [b.lat, b.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [businesses, map]);
  return null;
};

export const BusinessMap = ({ businesses }) => {
  const { activeBusinessId, setActiveBusinessId, searchLocation } = useWaypointContext();
  
  // Use the search location or fallback to NYC
  const center = searchLocation ? [searchLocation.lat, searchLocation.lng] : [40.7128, -74.0060];

  return (
    <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-[#BCCCDC]/40 shadow-sm relative z-0">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {businesses.map((business) => (
          <Marker 
            key={business.id}
            position={[business.lat, business.lng]}
            icon={activeBusinessId === business.id ? SelectedIcon : DefaultIcon}
            eventHandlers={{
              click: () => setActiveBusinessId(business.id)
            }}
          >
            <Popup className="rounded-xl">
              <div className="text-center font-sans">
                <img 
                  src={business.imageUrl} 
                  alt={business.name} 
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <h3 className="font-bold text-gray-800 m-0">{business.name}</h3>
                <p className="text-xs text-gray-500 m-0 mt-1">{business.category}</p>
                <div className="mt-2 text-blue-600 font-semibold cursor-pointer" onClick={() => setActiveBusinessId(business.id)}>
                  View Details &rarr;
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapBounds businesses={businesses} />
      </MapContainer>
    </div>
  );
};
