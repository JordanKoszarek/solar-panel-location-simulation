import React, { useMemo, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import useLocation from 'src/stores/use-location.js';
import useWeather from 'src/stores/use-weather.js';
import GeoMapUtils from 'src/utils/geo-map-utils.js';

const customIcon = new L.Icon({
  iconUrl: 'https://jkpowertransfer.z5.web.core.windows.net/map-icon.png',
  iconSize: [44, 55],
  iconAnchor: [22, 55],
  popupAnchor: [0, -27.5],
});

const GeoDraggable = () => {
  const setLocation = useLocation((state) => state.setLocation);
  const location = useLocation((state) => state.location);
  const updateWeather = useWeather((state) => state.updateWeather);

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          const latLng = GeoMapUtils.normalizeLatLng(newPosition.lat, newPosition.lng);
          setLocation(latLng);
          try {
            await updateWeather(latLng);
          } catch (error) {
            console.error(`Failed to update the weather: ${error}`);
          }
        }
      },
    }),
    [],
  );

  if (!location) {
    console.warn('Location is not set');
    return null;
  }

  return (
    <Marker draggable={true} eventHandlers={eventHandlers} position={location} ref={markerRef} icon={customIcon}>
      <Popup>
        Location of the solar panel <br />
        Lat: {location[0].toFixed(4)} Lng: {location[1].toFixed(4)}
      </Popup>
    </Marker>
  );
};

export default GeoDraggable;
