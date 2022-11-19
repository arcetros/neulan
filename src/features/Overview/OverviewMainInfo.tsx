import { useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch } from '@store/index';
import { fetchForecast } from '@store/weather-actions';
import { weatherActions } from '@store/weather-slice';
import { Loader } from '@components/Element/Loader';
import Portal from '@helpers/Portal';
import { useToggle, useDarkMode } from '@hooks/index';
import { Forecasts } from 'type';
import { Card } from './Card';
import OverviewSetting from './OverviewSetting';

interface IOverviewMainInfo {
  units: string;
  isRequested: boolean;
  forecasts: Forecasts;
  message: string;
}

export default function OverviewMainInfo({ units, isRequested, forecasts, message }: IOverviewMainInfo) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useToggle(false);
  const { toggleDarkMode, darkMode } = useDarkMode();

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

  const cardType = [
    { type: 'WindSpeed', data: forecasts && forecasts.current.wind_speed - forecasts.hourly[0].wind_speed },
    { type: 'RainChance', data: forecasts && forecasts.hourly[0].pop - forecasts.daily[0].pop },
    { type: 'Preassure', data: forecasts && forecasts.current.pressure - forecasts.hourly[0].pressure },
    { type: 'UV', data: forecasts && forecasts.current.uvi - forecasts.hourly[0].uvi },
  ];

  const props = { data: forecasts, isMetric: IsMetric };

  useEffect(() => {
    if (forecasts) dispatch(fetchForecast(forecasts?.lat, forecasts?.lon, units));
  }, [units]);

  return (
    <div className="bg-white dark:bg-dark200 rounded-xl shadow-md dark:shadow-none py-8 lg:max-w-[120rem] mx-auto">
      <div className="px-8 flex justify-between items-center">
        <h1 className="text-base md:text-lg text-gray-600 dark:text-textDarkMain font-bold">Today Overview</h1>
        <div
          className="relative w-1/2 lg:w-1/4 justify-end flex items-center gap-x-2 text-gray-600 dark:text-textDarkSub text-sm"
          aria-hidden
        >
          <OverviewSetting
            darkMode={darkMode}
            handleDarkMode={handleDarkMode}
            handleUnits={handleUnits}
            isMetric={IsMetric}
            toggle={toggle}
          />
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
        {cardType.map((item) => (
          <Card key={item.type} type={item.type as any} {...props} calculatedData={item.data} />
        ))}
      </div>
    </div>
  );
}
