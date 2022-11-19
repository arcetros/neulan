import { BsSunrise, BsSunset, BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { DailyForecast } from '../../type';

interface IDetailedContent {
  item: DailyForecast;
}

export function Dropdown({ item }: IDetailedContent) {
  const iconClassName = 'mx-auto w-6 h-6 text-gray-700 dark:text-white';

  const dropdownData = [
    { icon: <BsSunrise className={iconClassName} />, data: item.temp.morn.toFixed(0) },
    { icon: <BsSunFill className={iconClassName} />, data: item.temp.day.toFixed(0) },
    { icon: <BsSunset className={iconClassName} />, data: item.temp.eve.toFixed(0) },
    { icon: <BsFillMoonFill className={iconClassName} />, data: item.temp.night.toFixed(0) },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col text-xs w-full md:w-auto">
        <span className="font-bold capitalize dark:text-textDarkMain">{item.weather[0].description}</span>
        <span className="dark:text-textDarkSub">
          The high will be {item.temp.max.toFixed(0)}°, The Lowest {item.temp.min.toFixed(0)}°
        </span>
      </div>
      <div className="flex justify-start lg:justify-end w-full lg:w-1/2 text-xs mt-4 lg:mt-0">
        {dropdownData.map((d) => (
          <div className="flex flex-col gap-y-2 px-4">
            {d.icon}
            <span className="mx-auto dark:text-textDarkMain">{d.data}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
