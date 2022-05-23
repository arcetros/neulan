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
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
}

export interface CityArrayModel {
  all_cities: CityModel[];
}
