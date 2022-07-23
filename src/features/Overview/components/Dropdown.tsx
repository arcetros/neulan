import { BsSunset, BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { WiSunrise } from 'react-icons/wi';
import { DailyForecast } from '@/types';

interface IDetailedContent {
  item: DailyForecast;
}

export function Dropdown({ item }: IDetailedContent) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col text-xs">
        <span className="font-bold capitalize">{item.weather[0].description}</span>
        <span>
          The high will be {item.temp.max.toFixed(0)}°, The Lowest {item.temp.min.toFixed(0)}°
        </span>
        <div className="mt-4 flex justify-between md:justify-start w-full text-xs">
          <div className="flex flex-col gap-y-2 pr-4">
            <h1>Morning</h1>
            <WiSunrise className="mx-auto w-6 h-6 text-gray-700" />
            <span className="mx-auto">{item.temp.morn.toFixed(0)}°</span>
          </div>
          <div className="flex flex-col gap-y-2 px-4">
            <h1>Afternoon</h1>
            <BsSunFill className="mx-auto w-6 h-6 text-gray-700" />
            <span className="mx-auto">{item.temp.day.toFixed(0)}°</span>
          </div>
          <div className="flex flex-col gap-y-2 px-4">
            <h1>Evening</h1>
            <BsSunset className="mx-auto w-6 h-6 text-gray-700" />
            <span className="mx-auto">{item.temp.eve.toFixed(0)}°</span>
          </div>
          <div className="flex flex-col gap-y-2 px-4">
            <h1>Night</h1>
            <BsFillMoonFill className="mx-auto w-6 h-6 text-gray-700" />
            <span className="mx-auto">{item.temp.night.toFixed(0)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
