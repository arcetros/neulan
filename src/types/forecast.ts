export interface CurrentWeather {
  weather: Array<{ id: number; description: string; main: string; icon: string }>;
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  wind: { speed: number };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
  coord: {
    lat: number;
    lon: number;
  };
}

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

export interface DailyForecast {
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

export interface HourlyForecast {
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

export interface GeoModel {
  country_code: string;
  country_name: string;
  city: string;
  postal: number;
  latitude: number;
  longitude: number;
  IPv4: any;
  state: string;
}

export interface SelectedCity {
  name: string;
  lat: number;
  lon: number;
  state: string;
  country: string;
}

export interface CityModel {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface CityArrayModel {
  my_location: GeoModel;
  current_weather: CurrentWeather;
  cities: CityModel[];
  isRequested: boolean;
  forecasts: Forecasts;
  message: string;
  units: string;
}
