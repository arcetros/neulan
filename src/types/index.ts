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

interface CurrentDay {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  pop: number;
}

interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  pop: number;
}

export interface Forecasts {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentDay;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface CityModel {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface CityArrayModel {
  all_cities: CityModel[];
  isRequested: boolean;
  forecasts: Forecasts;
}
