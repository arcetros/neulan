import { useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector, useDispatch } from '@/store';
import { fetchForecast } from '@/store/weather-actions';
import { weatherActions } from '@/store/weather-slice';
import { Loader } from '@/components/Element/Loader';
import Portal from '@/helpers/Portal';
import { useToggle, useDarkMode } from '@/hooks';
import { Card } from './Card';

export function Condition() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useToggle(false);
  const { toggleDarkMode, darkMode } = useDarkMode();
  const { units, isRequested, forecasts, message } = useSelector((state) => state.weather);

  const IsMetric = units.match(/metric/i);

  const handleUnits = () => {
    setToggle();
    if (IsMetric) return dispatch(weatherActions.changeUnits('imperial'));
    return dispatch(weatherActions.changeUnits('metric'));
  };

  const handleDarkMode = () => {
    setToggle();
    toggleDarkMode();
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
    <div className="bg-white dark:bg-dark200 rounded-xl shadow-md dark:shadow-none py-8 lg:max-w-[120rem] mx-auto">
      <div className="px-8 flex justify-between items-center">
        <h1 className="text-base md:text-lg text-gray-600 dark:text-textDarkMain font-bold">Today Overview</h1>

        <div
          className="relative w-1/2 lg:w-1/4 justify-end flex items-center gap-x-2 text-gray-600 dark:text-textDarkSub text-sm"
          aria-hidden
        >
          <div
            className={`absolute right-0 top-8 bg-white dark:bg-dark100 rounded w-fit p-1 z-10 text-xs shadow transition-all duration-200 ${
              toggle ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {toggle && (
              <ul className="flex flex-col gap-y-3">
                <li
                  className="hover:bg-slate-100 dark:hover:bg-dark300 p-4 rounded cursor-pointer"
                  onClick={handleUnits}
                  aria-hidden
                >
                  Change unit to {IsMetric ? 'Imperial' : 'Metric'}
                </li>
                <li
                  className="hover:bg-slate-100 dark:hover:bg-dark300 p-4 rounded cursor-pointer"
                  onClick={handleDarkMode}
                  aria-hidden
                >
                  Switch to {darkMode ? 'Light' : 'Dark'} mode
                </li>
              </ul>
            )}
          </div>
          <BsThreeDots className="w-8 h-8 cursor-pointer z-20 hover:bg-dark-300" onClick={() => setToggle()} />
          {toggle && <Portal className="portal" onClick={setToggle} />}
        </div>
      </div>

      {isRequested ? (
        <Loader type="Message" />
      ) : (
        <h1 className="px-8 col-span-2 mt-2 text-gray-400 dark:text-textDarkSub font-light">{message}</h1>
      )}
      <div className={`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 ${isRequested && 'mx-8'}`}>
        <Card type="WindSpeed" {...props} calculatedData={windSpeed} />
        <Card type="RainChance" {...props} calculatedData={rainChance} />
        <Card type="Preassure" {...props} calculatedData={pressure} />
        <Card type="UV" {...props} calculatedData={uv} />
      </div>
    </div>
  );
}
