import { weatherActions } from './weather-slice';
import { AppDispatch } from '.';

export const fetchCity = (city: string) => async (dispatch: AppDispatch) => {
  const sendRequest = async () => {
    if (!city) {
      return null;
    }
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_CITY_API}`,
    );
    if (!response.ok) {
      throw new Error('Response Failed');
    }
    const data = response.json();
    return data;
  };

  try {
    const cityData = await sendRequest();
    dispatch(weatherActions.addCity(cityData));
  } catch (err) {
    console.log(err);
  }
};

export const fetchWeather = (lat: number, lon: number) => async (dispatch: AppDispatch) => {
  const sendRequest = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_CITY_API}&units=metric`,
    );
    if (!response.ok) {
      throw new Error('Response Failed');
    }
    const data = response.json();
    return data;
  };

  try {
    const forecastsData = await sendRequest();
    dispatch(weatherActions.addWeather(forecastsData));
    dispatch(weatherActions.forecastReceived());
  } catch (err) {
    console.log(err);
    dispatch(weatherActions.forecastReceived());
  }
};

export const fetchForecast = (lat: number, lon: number) => async (dispatch: AppDispatch) => {
  dispatch(weatherActions.forecastRequested());
  const sendRequest = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.REACT_APP_CITY_API}&units=metric`,
    );
    if (!response.ok) {
      throw new Error('Response Failed');
    }
    const data = response.json();
    return data;
  };

  try {
    const forecastsData = await sendRequest();
    dispatch(weatherActions.addForecast(forecastsData));
    dispatch(weatherActions.forecastReceived());
  } catch (err) {
    console.log(err);
    dispatch(weatherActions.forecastReceived());
  }
};

export const getGeo = () => async (dispatch: AppDispatch) => {
  const getIp = async () => {
    const response = await fetch('https://geolocation-db.com/json/');
    const data = await response.json();
    return data;
  };

  try {
    const responseData = await getIp();
    dispatch(weatherActions.getGeo(responseData));
    dispatch(fetchWeather(responseData.latitude, responseData.longitude));
    dispatch(fetchForecast(responseData.latitude, responseData.longitude));
  } catch (err) {
    console.log(err);
  }
};
