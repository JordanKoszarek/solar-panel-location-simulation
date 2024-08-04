import { create } from 'zustand';

const defaultPanelConfig = {
  area: 10,
  tilt: 30,
  efficiency: 20,
  distanceToStorage: 10,
  panelAzimuth: 270,
};

const defaultPumpConfig = {
  power: 750,
  efficiency: 70,
};

const useSolarPanel = create((set, get) => ({
  panelConfig: defaultPanelConfig,
  pumpConfig: defaultPumpConfig,
  setPanelConfig: (config) =>
    set((state) => ({
      panelConfig: {
        ...state.panelConfig,
        ...config,
      },
    })),
  setPumpConfig: (config) =>
    set((state) => ({
      pumpConfig: {
        ...state.pumpConfig,
        ...config,
      },
    })),
}));

export default useSolarPanel;
