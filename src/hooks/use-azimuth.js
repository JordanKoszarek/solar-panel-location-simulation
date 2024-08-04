import useLocation from 'src/stores/use-location.js';
import { useEffect, useState } from 'react';
import SimulationCalculations from 'src/utils/simulation-calculations.js';
import useWeather from 'src/stores/use-weather.js';
import DateTimeUtils from 'src/utils/date-time-utils.js';
import GeoMapUtils from 'src/utils/geo-map-utils.js';

const useAzimuth = () => {
  const location = useLocation((state) => state.location);
  const weather = useWeather((state) => state.weather);
  const [azimuth, setAzimuth] = useState(null);

  useEffect(() => {
    if (!location || !weather) {
      setAzimuth(null);
      return;
    }

    const azimuth = SimulationCalculations.calculateCurrentAzimuth(
      location[0],
      location[1],
      DateTimeUtils.getAdjustedDate(weather.timezone),
    );

    if (!Number.isNaN(azimuth)) {
      setAzimuth(azimuth);
    } else {
      setAzimuth(null);
    }
  }, [location]);

  return { azimuth, isValid: azimuth != null, direction: GeoMapUtils.getStringFacingDirection(azimuth) };
};

export default useAzimuth;
