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
    weatherActions.setMessage(err);
  }
};

// call for current day only
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
    weatherActions.setMessage(err);
    dispatch(weatherActions.forecastReceived());
  }
};

// one call for 1 week forecasts
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
    weatherActions.setMessage(err);
    dispatch(weatherActions.forecastReceived());
  }
};

export const getGeo = () => async (dispatch: AppDispatch) => {
  const geolocationAPI = navigator.geolocation;
  const geolocationOption = {
    enableHighAccuracy: true,
    timeout: 5000,
  };
  const dispatchAction = (lat: number, lon: number) => {
    dispatch(fetchWeather(lat, lon));
    dispatch(fetchForecast(lat, lon));
  };

  const getUserCoords = () => {
    if (!geolocationAPI) weatherActions.setMessage('Geolocation is not available in your browser !');

    geolocationAPI.getCurrentPosition(
      (position) => {
        const { coords } = position;
        // console.log(coords.latitude, coords.longitude);
        dispatchAction(coords.latitude, coords.longitude);
      },
      // if geolocation is denied, use browser ip geolocation instead.
      async (error) => {
        const getByBrowserIp = async () => {
          const response = await fetch('https://geolocation-db.com/json/');
          const data = await response.json();
          return data;
        };
        try {
          const responseData = await getByBrowserIp();
          dispatchAction(responseData.latitude, responseData.longitude);
        } catch (err) {
          dispatch(weatherActions.setMessage(err));
        }
        dispatch(weatherActions.setMessage(error.message));
      },
      geolocationOption,
    );
  };
  try {
    getUserCoords();
  } catch (err) {
    dispatch(weatherActions.setMessage(err));
  }
};
