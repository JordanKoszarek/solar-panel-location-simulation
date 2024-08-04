import DateTimeUtils from 'src/utils/date-time-utils.js';

const SimulationCalculations = {
  /**
   * Solar Position Theorem
   *
   * This gives us the angle of the sun from the latitude and longitude.
   *
   * https://en.wikipedia.org/wiki/Azimuth
   *
   * **DISCLAIMER**: I had to look all of this up, the algorithm is not perfect and a lot of the math is simplified,
   * but it seems better than manually putting in the estimated azimuth like my original implementation.
   *
   * The function calculates a simplified solar azimuth angle based on the latitude, longitude and current/passed in date.
   *
   * Calculate the day of the year:
   * We determine how many days have passed since the start of the year.
   *
   * Declination Angle (δ): (Approximation of earth's tilt)
   * δ = .409 * sin(2 * PI * (284 + n) / 365)
   * This represents the angle between the sun's rays and the Earth's equatorial plane.
   *
   * Solar time:
   * We calculate the true solar time, which differs from clock time due to the Earth's elliptical orbit and axial tilt.
   *
   * Hour Angle:
   * This is the angular displacement of the sun from the local meridian due to the Earth's rotation.
   *
   * Solar Zenith Angle:
   * The angle between the sun and the zenith (point directly overhead).
   *
   * Solar Azimuth Angle:
   * The final calculation gives us the horizontal angle of the sun's position relative to true north.
   */

  calculateCurrentAzimuth: (latitude, longitude, date = new Date()) => {
    const RADIANS_TO_DEGREES = 180 / Math.PI;
    const DEGREES_TO_RADIANS = Math.PI / 180;
    const MINUTES_IN_HOUR = 60;
    const SECONDS_IN_HOUR = 3600;
    const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
    const DAYS_IN_YEAR = 365;
    const EARTH_AXIS_TILT = 0.409;
    const DAYS_OFFSET = 284;
    const SOLAR_NOON_BASE = 12;
    const LONGITUDE_HOUR_OFFSET = 15;
    const TIMEZONE_ADJUSTMENT = 0.06667;

    const lat = latitude * DEGREES_TO_RADIANS;

    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * MINUTES_IN_HOUR * 1000;
    const dayOfYear = Math.floor(diff / MILLISECONDS_IN_DAY);

    const declinationAngle = EARTH_AXIS_TILT * Math.sin((2 * Math.PI * (DAYS_OFFSET + dayOfYear)) / DAYS_IN_YEAR);

    // Calculate true solar time
    const solarNoon =
      SOLAR_NOON_BASE +
      TIMEZONE_ADJUSTMENT * (date.getTimezoneOffset() / MINUTES_IN_HOUR - longitude / LONGITUDE_HOUR_OFFSET);
    const trueTime = date.getHours() + date.getMinutes() / MINUTES_IN_HOUR + date.getSeconds() / SECONDS_IN_HOUR;
    const hourAngle = (trueTime - solarNoon) * LONGITUDE_HOUR_OFFSET * DEGREES_TO_RADIANS;

    // Calculate solar zenith angle
    const cosZenith =
      Math.sin(lat) * Math.sin(declinationAngle) + Math.cos(lat) * Math.cos(declinationAngle) * Math.cos(hourAngle);
    const zenith = Math.acos(cosZenith);

    // Calculate solar azimuth angle
    let azimuth = Math.acos(
      (Math.sin(declinationAngle) * Math.cos(lat) - Math.cos(declinationAngle) * Math.sin(lat) * Math.cos(hourAngle)) /
        Math.sin(zenith),
    );

    if (hourAngle > 0) {
      azimuth = 2 * Math.PI - azimuth;
    }

    return azimuth * RADIANS_TO_DEGREES;
  },

  /**
   * Calculates the total power generation per hour, the net generation and the pump consumption.
   *
   * **WARNING**
   * Lots of this math is simplified and based on assumptions.
   */
  calculatePowerTransfer: (panelConfig, weatherData, location, pumpConfig) => {
    const SOLAR_CONSTANT = 1361; // W/m^2 at top of atmosphere
    const HOUR = 3600; // seconds in an hour

    const { area, tilt, efficiency, panelAzimuth } = panelConfig;
    const {
      clouds,
      main: { temp },
    } = weatherData;
    const [latitude, longitude] = location;
    const { power: pumpPower, efficiency: pumpEfficiency } = pumpConfig;

    const sunAzimuth = SimulationCalculations.calculateCurrentAzimuth(
      latitude,
      longitude,
      DateTimeUtils.getAdjustedDate(weatherData.timezone),
    );

    const clearSkyTransmission = 0.75;
    const cloudCoverage = clouds.all / 100;
    const atmosphericTransmission = clearSkyTransmission * (1 - 0.75 * cloudCoverage);

    const solarIntensity = SOLAR_CONSTANT * atmosphericTransmission;

    const tiltRad = (tilt * Math.PI) / 180;
    const azimuthDiff = ((sunAzimuth - panelAzimuth) * Math.PI) / 180;
    const orientationFactor = Math.max(
      0,
      Math.cos(tiltRad) * Math.cos(azimuthDiff) + Math.sin(tiltRad) * Math.sin(azimuthDiff),
    );

    // 0.5% efficiency loss per degree C above 25°C
    // This is a simplification of what actually happens
    const temperatureEffect = 1 - Math.max(0, (temp - 25) * 0.005);

    const latitudeEffect = Math.cos(((90 - latitude) * Math.PI) / 180);
    const powerGeneration =
      solarIntensity * area * (efficiency / 100) * orientationFactor * temperatureEffect * latitudeEffect;
    const powerTransferPerHour = (powerGeneration * HOUR) / 3600;

    const pumpConsumption = ((pumpPower / pumpEfficiency) * HOUR) / 3600;
    const netPowerTransfer = powerTransferPerHour - pumpConsumption;

    return {
      totalGeneration: powerTransferPerHour,
      pumpConsumption: pumpConsumption,
      netTransfer: netPowerTransfer,
    };
  },
};

export default SimulationCalculations;
