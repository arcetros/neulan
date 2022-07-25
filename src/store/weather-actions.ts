import moment from 'moment';
import { weatherActions } from './weather-slice';
import { AppDispatch } from '.';
import * as recommendations from '../components/recommendation.json';

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

export const fetchForecast = (lat: number, lon: number, units: string) => async (dispatch: AppDispatch) => {
  dispatch(weatherActions.forecastRequested());
  const getOnecall = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.REACT_APP_CITY_API}&units=${units}`,
    );
    if (!response.ok) {
      throw new Error('Response Failed');
    }
    const data = response.json();
    return data;
  };

  const getDaily = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_CITY_API}&units=${units}`,
    );
    if (!response.ok) {
      throw new Error('Response Failed');
    }
    const data = response.json();
    return data;
  };

  try {
    const [oneCall, daily] = await Promise.all([getOnecall(), getDaily()]);

    const { sunset, sunrise } = daily.sys;

    if (sunset || sunrise) {
      const recomObject: { [key: string]: any } = recommendations;
      const timeZone = daily.timezone / 60;
      const currentTime = moment.unix(daily.dt).utc().add(timeZone, 's').format();
      const sunsetTime = moment.unix(daily.sys.sunset).utc().add(timeZone, 's').format();
      const sunriseTime = moment.unix(daily.sys.sunrise).utc().add(timeZone, 's').format();

      const isDay = !!(currentTime > sunriseTime && currentTime < sunsetTime);
      const message = recomObject[isDay ? 'day' : 'night'][daily.weather[0].id].recommendation;
      dispatch(weatherActions.addForecast({ oneCall, daily, message }));
    }
    dispatch(weatherActions.forecastReceived());
  } catch (err) {
    weatherActions.setMessage(err);
    dispatch(weatherActions.forecastReceived());
  }
};

export const getGeo = (units: string) => async (dispatch: AppDispatch) => {
  const geolocationAPI = navigator.geolocation;
  const geolocationOption = {
    enableHighAccuracy: true,
    timeout: 5000,
  };
  const dispatchAction = (lat: number, lon: number) => {
    dispatch(fetchForecast(lat, lon, units));
  };

  const getUserCoords = () => {
    if (!geolocationAPI) weatherActions.setMessage('Geolocation is not available in your browser !');

    geolocationAPI.getCurrentPosition(
      (position) => {
        const { coords } = position;
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
          dispatch(fetchForecast(responseData.latitude, responseData.longitude, units));
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
