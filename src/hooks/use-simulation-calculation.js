import useSolarPanel from 'src/stores/use-solar-panel.js';
import useWeather from 'src/stores/use-weather.js';
import useLocation from 'src/stores/use-location.js';
import { useEffect, useState } from 'react';
import SimulationCalculations from 'src/utils/simulation-calculations.js';

const useSimulationCalculation = () => {
  const pumpConfig = useSolarPanel((state) => state.pumpConfig);
  const panelConfig = useSolarPanel((state) => state.panelConfig);
  const weather = useWeather((state) => state.weather);
  const location = useLocation((state) => state.location);
  const [simulationCalculations, setSimulationCalculations] = useState(null);

  useEffect(() => {
    if (!panelConfig || !weather || !location || !pumpConfig) {
      setSimulationCalculations(null);
      return;
    }

    const powerTransfer = SimulationCalculations.calculatePowerTransfer(panelConfig, weather, location, pumpConfig);

    setSimulationCalculations(powerTransfer);
  }, [pumpConfig, panelConfig, weather, location]);

  return { simulationCalculations, isValid: simulationCalculations != null };
};

export default useSimulationCalculation;
