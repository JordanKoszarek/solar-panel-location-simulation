import React, { useMemo } from 'react';
import LoadingSpinner from 'src/components/loading-spinner/loading-spinner.jsx';
import './simulator-controls.scss';
import useLocation from 'src/stores/use-location';
import useSolarPanel from 'src/stores/use-solar-panel.js';
import useWeather from 'src/stores/use-weather.js';
import DateTimeUtils from 'src/utils/date-time-utils.js';
import useAzimuth from 'src/hooks/use-azimuth.js';

const SimulatorControls = () => {
  const location = useLocation((state) => state.location);
  const weather = useWeather((state) => state.weather);
  const isLoading = useWeather((state) => state.loading);
  const setPanelConfig = useSolarPanel((state) => state.setPanelConfig);
  const setPumpConfig = useSolarPanel((state) => state.setPumpConfig);
  const panelConfig = useSolarPanel((state) => state.panelConfig);
  const pumpConfig = useSolarPanel((state) => state.pumpConfig);
  const { azimuth, isValid, direction } = useAzimuth();
  const date = DateTimeUtils.getDateAndTimeNow(weather?.timezone);

  const handleChange = useMemo(() => {
    return (e) => {
      const { name, value } = e.target;
      const [section, field] = name.split('.');

      if (section === 'panel') {
        setPanelConfig({ [field]: value });
      } else if (section === 'pump') {
        setPumpConfig({ [field]: value });
      }
    };
  }, [setPanelConfig, setPumpConfig]);

  return (
    <div className="simulator-controls-container">
      <h2 className="simulator-controls-header">Solar Panel Information</h2>
      <section>
        <h3 className="simulator-controls-sub-header">Date and Time</h3>
        <p>{date}</p>
      </section>
      <section>
        <h3 className="simulator-controls-sub-header">Solar Panel Location</h3>
        <p>City: {weather?.name}</p>
        <p>
          Latitude: {location[0]}, Longitude: {location[1]}
        </p>
      </section>
      <section>
        <h3 className="simulator-controls-sub-header">Weather and Climate</h3>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <p>Clouds: {weather?.weather[0]?.description}</p>
            <p>Temperature: {weather?.main?.temp}°C</p>
            <p>Cloud Coverage: {weather?.clouds.all}%</p>
          </>
        )}
      </section>
      {isValid === true && (
        <section>
          <h3 className="simulator-controls-sub-header">Calculated Azimuth</h3>
          <p>Azimuth: {azimuth}</p>
          <p>Location From Panel: {direction}</p>
        </section>
      )}
      <h2 className="simulator-controls-header">Solar Panel Configuration</h2>
      <section className="input-grid">
        <div className="input-group">
          <h4 className="simulator-controls-input-header">Area (m²)</h4>
          <span>Area of the solar panel in square meters</span>
          <input
            type="number"
            name="panel.area"
            value={panelConfig.area}
            onChange={handleChange}
            placeholder="Enter panel area"
          />
        </div>
        <div className="input-group">
          <h4 className="simulator-controls-input-header">Panel Tilt (Degrees)</h4>
          <span>
            The angle between the surface and the horizontal ground (0) means normal of the panel is facing to the sky.
            (90) means the panel is vertical.
          </span>
          <input
            type="number"
            name="panel.tilt"
            value={panelConfig.tilt}
            onChange={handleChange}
            placeholder="Enter panel tilt"
          />
        </div>
        <div className="input-group">
          <h4 className="simulator-controls-input-header">Panel Efficiency (%)</h4>
          <span>Percentage of sunlight that gets converted into energy</span>
          <input
            type="number"
            name="panel.efficiency"
            value={panelConfig.efficiency}
            onChange={handleChange}
            placeholder="Enter panel efficiency"
          />
        </div>
        <div className="input-group">
          <h4 className="simulator-controls-input-header">Panel Azimuth (Degrees)</h4>
          <span>The angle at which a solar panel faces, measured in degrees clockwise from north</span>
          <input
            type="number"
            name="panel.panelAzimuth"
            value={panelConfig.panelAzimuth}
            onChange={handleChange}
            placeholder="Enter distance to storage"
          />
        </div>
        <div className="input-group">
          <h4 className="simulator-controls-input-header">Distance from power storage (m)</h4>
          <span>Distance from the panel to power storage in meters</span>
          <input
            type="number"
            name="panel.distanceToStorage"
            value={panelConfig.distanceToStorage}
            onChange={handleChange}
            placeholder="Enter distance to storage"
          />
        </div>
      </section>
      <h2 className="simulator-controls-header">Pump Configuration</h2>
      <section className="input-grid">
        <div className="input-group">
          <h4 className="simulator-controls-input-header">Pump Power (Watts)</h4>
          <span>Power required to run the pump in Watts. It is assumed that the pump is always running</span>
          <input
            type="number"
            name="pump.power"
            value={pumpConfig.power}
            onChange={handleChange}
            placeholder="Enter pump power"
          />
        </div>
        <div className="input-group">
          <h4 className="simulator-controls-input-header">Pump Efficiency (%)</h4>
          <span>Percentage of input power the pump converts to moving water (higher is more efficient)</span>
          <input
            type="number"
            name="pump.efficiency"
            value={pumpConfig.efficiency}
            onChange={handleChange}
            placeholder="Enter pump efficiency"
          />
        </div>
      </section>
    </div>
  );
};

export default SimulatorControls;
