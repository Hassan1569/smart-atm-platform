import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { buildMarkerIcon } from '../../utils/mapHelpers.js';
import AtmMarkerPopup from './AtmMarkerPopup.jsx';

/** Fits the map view to the current markers. */
function FitBounds({ atms }) {
  const map = useMap();
  useEffect(() => {
    if (!atms.length) return;
    const bounds = L.latLngBounds(atms.map((a) => [a.lat, a.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
  }, [atms, map]);
  return null;
}

export default function AtmMapView({ atms, selectedId, onSelect }) {
  const markers = useMemo(
    () => atms.filter((a) => Number.isFinite(a.lat) && Number.isFinite(a.lng)),
    [atms]
  );

  return (
    <div className="h-[600px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
      <MapContainer
        center={[30.3753, 69.3451]} // Pakistan
        zoom={6}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds atms={markers} />

        {markers.map((atm) => (
          <Marker
            key={atm.id}
            position={[atm.lat, atm.lng]}
            icon={buildMarkerIcon(atm.status, atm.id === selectedId)}
            eventHandlers={{
              click: () => onSelect?.(atm.id),
            }}
          >
            <Popup>
              <AtmMarkerPopup atm={atm} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}