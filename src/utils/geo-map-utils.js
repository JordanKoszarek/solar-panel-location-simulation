const GeoMapUtils = {
  normalizeLatLng: (lat, lng) => {
    lat = Math.max(-90, Math.min(90, lat));
    lng = ((((lng + 180) % 360) + 360) % 360) - 180;
    return [lat, lng];
  },
  getStringFacingDirection: (azimuth) => {
    if (azimuth === undefined || azimuth === null) {
      return 'Unknown';
    }

    azimuth = azimuth % 360;
    if (azimuth < 0) azimuth += 360;

    if (azimuth >= 337.5 || azimuth < 22.5) return 'North';
    if (azimuth >= 22.5 && azimuth < 67.5) return 'Northeast';
    if (azimuth >= 67.5 && azimuth < 112.5) return 'East';
    if (azimuth >= 112.5 && azimuth < 157.5) return 'Southeast';
    if (azimuth >= 157.5 && azimuth < 202.5) return 'South';
    if (azimuth >= 202.5 && azimuth < 247.5) return 'Southwest';
    if (azimuth >= 247.5 && azimuth < 292.5) return 'West';
    if (azimuth >= 292.5 && azimuth < 337.5) return 'Northwest';

    return 'Unknown';
  },
};

export default GeoMapUtils;
