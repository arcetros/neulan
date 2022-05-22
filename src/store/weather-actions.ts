import { weatherActions, WeatherState } from './weather-slice';
import { AppDispatch } from '.';

export const fetchCity = (city: string) => async (dispatch: AppDispatch) => {
  const sendRequest = async () => {
    const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${city}&limit=5`, {
      headers: { 'X-Api-Key': 'TxPOaDQ0PFl6pSnDgtcNEA==JHthdXqxhEBOfQCO' },
    });
    if (!response.ok) {
      throw new Error('Response Failed');
    }
    const data = response.json();
    return data;
  };

  try {
    const cityData: WeatherState = await sendRequest();
    dispatch(weatherActions.addCity(cityData));
  } catch (err) {
    // TODO: Dispatch an error handling with UI components
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
