import React, { useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  useMap, 
  useMapEvents, 
  Polyline, 
  Circle, 
  Marker, 
  Popup 
} from 'react-leaflet';
import L from 'leaflet';

// Internal controller to handle map pans/zooms
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, {
        duration: 1.2,
        easeLinearity: 0.2
      });
    }
  }, [center, zoom, map]);
  return null;
}

// Map Click Events Listener Component
function MapClickEvents({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick([e.latlng.lat, e.latlng.lng]);
      }
    }
  });
  return null;
}

// Google Maps styled pulsing blue user location circle
const userPulseIcon = L.divIcon({
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-8 h-8 bg-[#3b82f6]/30 rounded-full animate-ping"></div>
      <div class="w-4 h-4 bg-[#3b82f6] rounded-full border-2 border-white shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
    </div>
  `,
  className: 'user-pulse-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

export default function InteractiveMap({ 
  center, 
  zoom, 
  themeUrl, 
  themeAttribution,
  isGeofenceEnabled, 
  userCoords, 
  geofenceRadius, 
  showRoute, 
  routeCoords, 
  selectedPlace, 
  onMapClick,
  children 
}) {
  return (
    <div className="w-full h-full relative rounded-2.5xl overflow-hidden border border-brand-border/40 shadow-sm z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url={themeUrl}
          attribution={themeAttribution}
        />

        <MapController center={center} zoom={zoom} />
        
        {/* Listen to map clicks to select starting coordinates */}
        <MapClickEvents onMapClick={onMapClick} />

        {/* Geofence boundary overlays */}
        {isGeofenceEnabled && userCoords && (
          <Circle 
            center={userCoords}
            radius={geofenceRadius}
            pathOptions={{
              color: '#9AA6B2',
              fillColor: '#D9EAFD',
              fillOpacity: 0.15,
              weight: 2,
              dashArray: '5, 8'
            }}
          />
        )}

        {/* User starting location marker */}
        {userCoords && (
          <Marker position={userCoords} icon={userPulseIcon}>
            <Popup>
              <div className="p-1.5 text-center select-none">
                <p className="font-extrabold text-xs text-slate-800 m-0">Start Position</p>
                <p className="text-[9px] text-slate-400 mt-1 m-0">
                  {userCoords[0].toFixed(4)}, {userCoords[1].toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route polyline overlay */}
        {showRoute && routeCoords && routeCoords.length > 0 && (
          <Polyline 
            positions={routeCoords}
            color="#9AA6B2"
            weight={4.5}
            opacity={0.85}
            dashArray="5, 8"
          />
        )}

        {/* Children map markers */}
        {children}
      </MapContainer>
    </div>
  );
}
