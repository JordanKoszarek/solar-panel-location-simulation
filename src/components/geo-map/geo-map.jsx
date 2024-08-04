import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './geo-map.scss';
import GeoDraggable from 'src/components/geo-draggable/geo-draggable.jsx';
import KnownLocations from 'src/utils/known-locations.js';

const GeoMap = () => {
  const zoomLevel = 20;

  return (
    <div className="geo-map">
      <MapContainer center={KnownLocations.Center} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoDraggable />
      </MapContainer>
    </div>
  );
};

export default GeoMap;
