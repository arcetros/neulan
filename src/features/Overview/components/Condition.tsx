import { useEffect } from 'react';
import { CgArrowsExchange } from 'react-icons/cg';
import { useSelector, useDispatch } from '@/store';
import { fetchForecast } from '@/store/weather-actions';
import { weatherActions } from '@/store/weather-slice';
import { Loader } from '@/components/Element/Loader';
import { Card } from './Card';

export function Condition() {
  const dispatch = useDispatch();
  const { units, isRequested, forecasts, message } = useSelector((state) => state.weather);

  const IsMetric = units.match(/metric/i);

  const handleUnits = () => {
    if (IsMetric) return dispatch(weatherActions.changeUnits('imperial'));
    return dispatch(weatherActions.changeUnits('metric'));
  };

  useEffect(() => {
    if (forecasts) dispatch(fetchForecast(forecasts?.lat, forecasts?.lon, units));
  }, [units]);

  const windSpeed = forecasts && forecasts.current.wind_speed - forecasts.hourly[0].wind_speed;
  const rainChance = forecasts && forecasts.hourly[0].pop - forecasts.daily[0].pop;
  const pressure = forecasts && forecasts.current.pressure - forecasts.hourly[0].pressure;
  const uv = forecasts && forecasts.current.uvi - forecasts.hourly[0].uvi;

  const props = { data: forecasts, isMetric: IsMetric };

  return (
    <div className="bg-white dark:bg-dark200 rounded-xl shadow-md dark:shadow-none py-8">
      <div className="px-8 flex justify-between items-center">
        <h1 className="text-base md:text-xl text-gray-600 dark:text-textDarkMain font-bold">Today Overview</h1>

        <div
          className="cursor-pointer flex items-center gap-x-2 text-gray-600 dark:text-textDarkSub text-sm"
          onClick={handleUnits}
          aria-hidden
        >
          <span className="flex border border-gray-200 dark:border-dark100 bg-gray-100 dark:bg-dark300 rounded-full p-2">
            {IsMetric ? '°C' : '°F'} <CgArrowsExchange className="w-5 h-5" /> {!IsMetric ? '°C' : '°F'}
          </span>
        </div>
      </div>

      {isRequested ? (
        <Loader type="Message" />
      ) : (
        <h1 className="px-8 col-span-2 text-lg mt-3 text-gray-400 dark:text-textDarkSub font-light">{message}</h1>
      )}
      <div className="h-[2px] mt-8 w-full bg-gray-300 dark:bg-dark100" />
      <div className="my-5" />
      <div className={`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 ${isRequested && 'mx-8'}`}>
        <Card type="WindSpeed" {...props} calculatedData={windSpeed} />
        <Card type="RainChance" {...props} calculatedData={rainChance} />
        <Card type="Preassure" {...props} calculatedData={pressure} />
        <Card type="UV" {...props} calculatedData={uv} />
      </div>
    </div>
  );
}
