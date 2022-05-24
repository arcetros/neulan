export type CurrentWeather = {
  weather: Array<{ id: number; description: string }>;
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
  sys: {
    country: string;
  };
  dt: number;
  coord: {
    lat: number;
    lon: number;
  };
};

export type Forecasts = {
  hourly: Array<{
    dt: number;
    temp: number;
    weather: Array<{ id: number; description: string }>;
    pop: number;
  }>;
  daily: Array<{
    dt: number;
    temp: { min: number; max: number };
    weather: Array<{ id: number; description: string }>;
    pop: number;
  }>;
};

export interface CityModel {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface CityArrayModel {
  all_cities: CityModel[];
}
