import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useWaypointContext } from '../../../context/WaypointContext';
import { RefreshCw, Car, Footprints, Bike, MapPin } from 'lucide-react';

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

// User location marker (Blue)
const UserIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getHaversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Component to dynamically adjust map bounds
const MapBounds = ({ businesses, userCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (businesses.length === 0) return;
    const coords = businesses.map(b => [b.lat, b.lng]);
    if (userCoords) coords.push(userCoords);
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [businesses, userCoords, map]);
  return null;
};

// Component to listen to map movements
const MapMoveListener = ({ onCenterChange }) => {
  const map = useMap();
  useEffect(() => {
    const handleMove = () => {
      const center = map.getCenter();
      onCenterChange([center.lat, center.lng]);
    };
    map.on('moveend', handleMove);
    return () => {
      map.off('moveend', handleMove);
    };
  }, [map, onCenterChange]);
  return null;
};

// Component to center map on new search coordinates
const MapRecenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

export const BusinessMap = ({ businesses, onSearchArea }) => {
  const { activeBusinessId, setActiveBusinessId, searchLocation, userCoords } = useWaypointContext();
  const [mapCenter, setMapCenter] = useState(null);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [routeMode, setRouteMode] = useState('driving'); // 'driving' | 'walking' | 'cycling'
  
  const initialCenter = searchLocation ? [searchLocation.lat, searchLocation.lng] : [40.7128, -74.0060];

  const handleCenterChange = (coords) => {
    setMapCenter(coords);
    setShowSearchBtn(true);
  };

  const handleSearchClick = () => {
    if (mapCenter && onSearchArea) {
      onSearchArea(mapCenter[0], mapCenter[1]);
      setShowSearchBtn(false);
    }
  };

  // Find selected business coordinates to draw route
  const activeBusiness = businesses.find(b => b.id === activeBusinessId);
  const hasRoute = userCoords && activeBusiness;

  let distanceKm = 0;
  let travelTimeMin = 0;
  if (hasRoute) {
    // Haversine straight-line multiplied by average road curvature factor (1.28)
    distanceKm = getHaversineDistance(userCoords[0], userCoords[1], activeBusiness.lat, activeBusiness.lng) * 1.28;
    
    // Speed: Driving (35 km/h), Cycling (15 km/h), Walking (5 km/h)
    const speed = routeMode === 'driving' ? 35 : routeMode === 'cycling' ? 15 : 5;
    travelTimeMin = Math.round((distanceKm / speed) * 60);
  }

  return (
    <div className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-[#BCCCDC]/40 shadow-sm relative z-0">
      {/* Floating "Search this area" Button */}
      {showSearchBtn && onSearchArea && (
        <button 
          onClick={handleSearchClick}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 bg-blue-600 text-white rounded-full font-semibold text-xs shadow-lg hover:bg-blue-700 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <RefreshCw size={14} className="animate-spin-slow" />
          Search this area
        </button>
      )}

      {/* Navigation HUD Panel */}
      {hasRoute && (
        <div className="absolute bottom-4 left-4 z-[1000] p-4 bg-white border border-[#BCCCDC]/40 rounded-2xl shadow-xl max-w-xs w-full backdrop-blur-md">
          <h4 className="font-bold text-gray-800 text-xs flex items-center gap-1 mb-2.5">
            <MapPin size={14} className="text-blue-500" />
            Directions HUD Panel
          </h4>
          
          <div className="flex gap-2 mb-3 bg-slate-100 p-1 rounded-xl">
            {[
              { mode: 'driving', icon: <Car size={14} /> },
              { mode: 'cycling', icon: <Bike size={14} /> },
              { mode: 'walking', icon: <Footprints size={14} /> }
            ].map(item => (
              <button
                key={item.mode}
                onClick={() => setRouteMode(item.mode)}
                className={`flex-1 py-1.5 flex justify-center rounded-lg transition-all cursor-pointer ${
                  routeMode === item.mode ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.icon}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-[#9AA6B2] font-semibold text-[10px] uppercase">Est. Distance</p>
              <p className="font-bold text-gray-800 text-sm mt-0.5">{distanceKm.toFixed(1)} km</p>
            </div>
            <div className="text-right">
              <p className="text-[#9AA6B2] font-semibold text-[10px] uppercase">Est. Time</p>
              <p className="font-bold text-blue-600 text-sm mt-0.5">~{travelTimeMin} mins</p>
            </div>
          </div>
        </div>
      )}

      <MapContainer 
        center={initialCenter} 
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
                <h3 className="font-bold text-gray-800 m-0 text-sm">{business.name}</h3>
                <p className="text-[10px] text-gray-500 m-0 mt-1">{business.category}</p>
                <div className="flex flex-col gap-1.5 mt-2.5">
                  <div className="text-blue-600 font-semibold text-xs cursor-pointer hover:underline" onClick={() => setActiveBusinessId(business.id)}>
                    View Details
                  </div>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${business.lat},${business.lng}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 font-semibold text-xs hover:underline flex items-center justify-center gap-1"
                  >
                    Get Directions &rarr;
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User GPS location marker */}
        {userCoords && (
          <Marker position={userCoords} icon={UserIcon}>
            <Popup>
              <div className="text-center font-sans font-semibold text-xs text-gray-800">
                You are here
              </div>
            </Popup>
          </Marker>
        )}

        {/* Dash array Polyline for directions routing */}
        {hasRoute && (
          <Polyline
            positions={[userCoords, [activeBusiness.lat, activeBusiness.lng]]}
            color="#3B82F6"
            dashArray="8, 12"
            weight={4}
          />
        )}

        <MapBounds businesses={businesses} userCoords={userCoords} />
        <MapMoveListener onCenterChange={handleCenterChange} />
        <MapRecenter center={searchLocation ? [searchLocation.lat, searchLocation.lng] : null} />
      </MapContainer>
    </div>
  );
};
