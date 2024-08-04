import { create } from 'zustand';

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const defaultWeather = {
  coord: {
    lon: -111.5867,
    lat: 40.6193,
  },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d',
    },
  ],
  base: 'stations',
  main: {
    temp: 26.43,
    feels_like: 26.43,
    temp_min: 22.92,
    temp_max: 28.2,
    pressure: 1013,
    humidity: 23,
    sea_level: 1013,
    grnd_level: 786,
  },
  visibility: 10000,
  wind: {
    speed: 2.57,
    deg: 280,
  },
  clouds: {
    all: 100,
  },
  dt: 1722725481,
  sys: {
    type: 2,
    id: 2007226,
    country: 'US',
    sunrise: 1722687940,
    sunset: 1722739153,
  },
  timezone: -21600,
  id: 5779451,
  name: 'Park City',
  cod: 200,
};

const useWeather = create((set, get) => ({
  weather: defaultWeather,
  loading: false,
  error: null,

  updateWeather: async ([latitude, longitude]) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    set({ loading: true });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      const data = await response.json();
      set({ weather: data, error: null });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useWeather;
