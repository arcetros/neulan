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
    // TODO: Dispatch an error handling with UI components
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export const fetchWeather = (lat: number, lon: number) => async (dispatch: AppDispatch) => {
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
