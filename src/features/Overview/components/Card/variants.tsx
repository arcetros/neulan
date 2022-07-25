/* eslint-disable no-unsafe-optional-chaining */
import { BsWind, BsCloudRain, BsSpeedometer2, BsFillSunFill } from 'react-icons/bs';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Forecasts } from '@/types';

interface IType {
  data: Forecasts;
  calculatedData: number;
  isMetric: RegExpMatchArray | null;
}

export function WindSpeed({ data, isMetric, calculatedData }: IType) {
  return (
    <>
      <BsWind className="text-blue-500 w-7 h-7" />
      <div className="mr-auto ml-4 flex flex-col justify-center h-full">
        <span className="text-sm text-gray-600 dark:text-textDarkSub font-light">Wind Speed</span>
        <span className="text-2xl text-gray-800 dark:text-textDarkMain">
          {data?.current.wind_speed.toFixed(2)}
          {isMetric ? 'm/s' : 'mph'}
        </span>
      </div>
      <div className="flex items-center gap-x-1">
        <IoMdArrowDropdown
          className={`w-5 h-5 ${
            data?.current.wind_speed < data?.hourly[0].wind_speed ? 'text-red-500' : 'text-blue-500 rotate-180'
          }`}
        />
        <span className="text-gray-600 dark:text-textDarkSub font-light text-sm">
          {data && Math.abs(calculatedData).toFixed(2)}
          {isMetric ? 'm/s' : 'mph'}
        </span>
      </div>
    </>
  );
}

export function RainChance({ data, calculatedData, isMetric }: IType) {
  return (
    <>
      <BsCloudRain className="text-blue-500 w-7 h-7" />
      <div className="mr-auto ml-4 flex flex-col justify-center h-full">
        <span className="text-sm text-gray-600 dark:text-textDarkSub font-light">Rain Chance</span>
        <span className="text-2xl text-gray-800 dark:text-textDarkMain">{Math.round(data?.hourly[0].pop * 100)}%</span>
      </div>
      <div className="flex items-center gap-x-1">
        <IoMdArrowDropdown
          className={`w-5 h-5 ${
            data?.hourly[0].pop < data?.daily[0].pop ? 'text-red-500' : 'text-blue-500 rotate-180'
          }`}
        />
        <span className="text-gray-600 dark:text-textDarkSub font-light text-sm">
          {(calculatedData * 100).toFixed(2)}%
        </span>
      </div>
    </>
  );
}

export function Preassure({ data, calculatedData, isMetric }: IType) {
  return (
    <>
      <BsSpeedometer2 className="text-blue-500 w-7 h-7" />
      <div className="mr-auto ml-4 flex flex-col justify-center h-full">
        <span className="text-sm text-gray-600 dark:text-textDarkSub font-light">Preassure</span>
        <span className="text-2xl text-gray-800 dark:text-textDarkMain">{data?.hourly[0].pressure} hpa</span>
      </div>
      <div className="flex items-center gap-x-1">
        <IoMdArrowDropdown
          className={`w-5 h-5 ${
            data?.current.pressure < data?.daily[0].pressure ? 'text-red-500' : 'text-blue-500 rotate-180'
          }`}
        />
        <span className="text-gray-600 dark:text-textDarkSub font-light text-sm">{calculatedData} hpa</span>
      </div>
    </>
  );
}

export function UV({ data, calculatedData, isMetric }: IType) {
  return (
    <>
      <BsFillSunFill className="text-blue-500 w-7 h-7" />
      <div className="mr-auto ml-4 flex flex-col justify-center h-full">
        <span className="text-sm text-gray-600 dark:text-textDarkSub font-light">UV Index</span>
        <span className="text-2xl text-gray-800 dark:text-textDarkMain">{data?.hourly[0].uvi}</span>
      </div>
      <div className="flex items-center gap-x-1">
        <IoMdArrowDropdown
          className={`w-5 h-5 ${data?.current.uvi < data?.daily[0].uvi ? 'text-red-500' : 'text-blue-500 rotate-180'}`}
        />
        <span className="text-gray-600 dark:text-textDarkSub font-light text-sm">{calculatedData.toFixed(2)}</span>
      </div>
    </>
  );
}
