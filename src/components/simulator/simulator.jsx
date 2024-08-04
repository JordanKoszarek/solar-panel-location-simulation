import React from 'react';
import './simulator.scss';
import useSimulationCalculation from 'src/hooks/use-simulation-calculation.js';
import GeoMapUtils from 'src/utils/geo-map-utils.js';
import useSolarPanel from 'src/stores/use-solar-panel.js';

const Simulator = () => {
  const panelConfig = useSolarPanel((state) => state.panelConfig);
  const { simulationCalculations, isValid } = useSimulationCalculation();

  if (!isValid) {
    return <div className="simulator">Invalid Simulation</div>;
  }

  const { totalGeneration, pumpConsumption, netTransfer } = simulationCalculations;

  return (
    <div className="simulator">
      <h3 className="simulator-power-title">Power Transfer (per hour)</h3>
      <div className="simulator-power-item">
        <span className="simulator-power-label">Total Generation:</span>
        <span className="simulator-power-value">{totalGeneration.toFixed(2)} Wh</span>
        <span className="simulator-power-explanation">(Solar energy produced)</span>
      </div>
      <div className="simulator-power-item">
        <span className="simulator-power-label">Pump Consumption:</span>
        <span className="simulator-power-value">{pumpConsumption.toFixed(2)} Wh</span>
        <span className="simulator-power-explanation">(Energy pump uses)</span>
      </div>
      <div className="simulator-power-item">
        <span className="simulator-power-label">Net Transfer:</span>
        <span className="simulator-power-value">{netTransfer.toFixed(2)} Wh</span>
        <span className="simulator-power-explanation">(Generation minus consumption)</span>
      </div>
      <div className="simulator-power-item">
        <span className="simulator-power-label">Solar Panel Facing: </span>
        <span className="simulator-power-value">{GeoMapUtils.getStringFacingDirection(panelConfig.panelAzimuth)}</span>
        <span className="simulator-power-explanation">(The direction the solar panel is facing)</span>
      </div>
    </div>
  );
};

export default Simulator;
