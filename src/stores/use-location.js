import { create } from 'zustand';
import KnownLocations from 'src/utils/known-locations.js';

const useLocation = create((set, get) => ({
  location: KnownLocations.PassiveLogic,
  setLocation: (location) =>
    set({
      location,
    }),
}));

export default useLocation;
