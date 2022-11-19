import { useState } from 'react';
import { getLocalTime } from '@helpers/getLocalTime';
import { Forecasts } from 'type';
import { DetailedInfo } from './DetailedInfo';
import { WeeklyChart } from './WeeklyChart';

const tabTypes = ['Chart', 'Detailed Info'];

interface IOverviewDetailed {
  forecasts: Forecasts;
  isRequested: boolean;
  units: string;
}

export default function OverviewDetailed({ forecasts, isRequested, units }: IOverviewDetailed) {
  const [activeTab, setActiveTab] = useState(tabTypes[0]);
  return (
    <div className="flex flex-col w-full bg-white mx-auto dark:bg-dark200 rounded-xl shadow-md dark:shadow-none py-8 lg:max-w-[120rem]">
      <div className="mb-4 border-b-2 border-gray-300 dark:border-dark100 w-full">
        <div className="flex flex-col md:flex-row mx-8 pb-8 justify-between items-start">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-base md:text-lg text-gray-600 dark:text-textDarkMain font-bold ">
              Average Weekly Overview
            </h1>
            <span className="text-xs lg:text-sm text-gray-400 dark:text-textDarkSub">
              showing data from {getLocalTime(forecasts?.daily[0]?.dt, forecasts?.timezone).format('dddd')} to{' '}
              {getLocalTime(forecasts?.daily[6]?.dt, forecasts?.timezone).format('dddd')}
            </span>
          </div>
          <ul className="relative flex w-full md:w-1/3 mt-auto">
            {tabTypes.map((item, i) => (
              <li
                key={i}
                className={`relative flex-1 text-center cursor-pointer ${
                  activeTab === item ? 'dark:text-textDarkMain' : 'dark:text-textDarkSub'
                }`}
                onClick={() => setActiveTab(item)}
                aria-hidden
              >
                {item}
                {activeTab === item && <div className="w-full h-1 absolute -bottom-8 md:-bottom-9 bg-blue-500" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {activeTab === 'Chart' && <WeeklyChart currentForecast={forecasts} isLoading={isRequested} />}
      {activeTab === 'Detailed Info' && <DetailedInfo forecasts={forecasts} units={units} />}
    </div>
  );
}
