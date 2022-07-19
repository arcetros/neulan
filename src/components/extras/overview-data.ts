/* eslint-disable no-unsafe-optional-chaining */
import { useSelector } from '../../store';
import getLocalTime from '../../helpers/getLocalTime';

const isLoading = useSelector((state) => state.weather?.isRequested);
const currentForecast = useSelector((state) => state.weather?.forecasts);

export const data = [
  {
    name: !isLoading && 'Today',
    temperature: Math.floor((currentForecast?.daily[0].temp.min + currentForecast?.daily[1].temp.max) / 2),
  },
  {
    name: !isLoading && getLocalTime(currentForecast?.daily[1].dt, currentForecast?.timezone).format('dddd'),
    temperature: Math.floor((currentForecast?.daily[1].temp.min + currentForecast?.daily[1].temp.max) / 2),
  },
  {
    name: !isLoading && getLocalTime(currentForecast?.daily[2].dt, currentForecast?.timezone).format('dddd'),
    temperature: Math.floor((currentForecast?.daily[2].temp.min + currentForecast?.daily[2].temp.max) / 2),
  },
  {
    name: !isLoading && getLocalTime(currentForecast?.daily[3].dt, currentForecast?.timezone).format('dddd'),
    temperature: Math.floor((currentForecast?.daily[3].temp.min + currentForecast?.daily[3].temp.max) / 2),
  },
  {
    name: !isLoading && getLocalTime(currentForecast?.daily[4].dt, currentForecast?.timezone).format('dddd'),
    temperature: Math.floor((currentForecast?.daily[4].temp.min + currentForecast?.daily[4].temp.max) / 2),
  },
  {
    name: !isLoading && getLocalTime(currentForecast?.daily[5].dt, currentForecast?.timezone).format('dddd'),
    temperature: Math.floor((currentForecast?.daily[5].temp.min + currentForecast?.daily[5].temp.max) / 2),
  },
  {
    name: !isLoading && getLocalTime(currentForecast?.daily[6].dt, currentForecast?.timezone).format('dddd'),
    temperature: Math.floor((currentForecast?.daily[6].temp.max + currentForecast?.daily[6].temp.min) / 2),
  },
];
