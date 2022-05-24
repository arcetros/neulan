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
