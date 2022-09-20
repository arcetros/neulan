import { BsSunrise, BsSunset, BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { DailyForecast } from '@/types';

interface IDetailedContent {
  item: DailyForecast;
}

export function Dropdown({ item }: IDetailedContent) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col text-xs w-full md:w-auto">
        <span className="font-bold capitalize dark:text-textDarkMain">{item.weather[0].description}</span>
        <span className="dark:text-textDarkSub">
          The high will be {item.temp.max.toFixed(0)}°, The Lowest {item.temp.min.toFixed(0)}°
        </span>
      </div>
      <div className="flex justify-start lg:justify-end w-full lg:w-1/2 text-xs mt-4 lg:mt-0">
        <div className="flex flex-col gap-y-2 pr-4">
          <BsSunrise className="mx-auto w-6 h-6 text-gray-700 dark:text-white" />
          <span className="mx-auto dark:text-textDarkMain">{item.temp.morn.toFixed(0)}°</span>
        </div>
        <div className="flex flex-col gap-y-2 px-4">
          <BsSunFill className="mx-auto w-6 h-6 text-gray-700 dark:text-white" />
          <span className="mx-auto dark:text-textDarkMain">{item.temp.day.toFixed(0)}°</span>
        </div>
        <div className="flex flex-col gap-y-2 px-4">
          <BsSunset className="mx-auto w-6 h-6 text-gray-700 dark:text-white" />
          <span className="mx-auto dark:text-textDarkMain">{item.temp.eve.toFixed(0)}°</span>
        </div>
        <div className="flex flex-col gap-y-2 px-4">
          <BsFillMoonFill className="mx-auto w-6 h-6 text-gray-700 dark:text-white" />
          <span className="mx-auto dark:text-textDarkMain">{item.temp.night.toFixed(0)}°</span>
        </div>
      </div>
    </div>
  );
}
