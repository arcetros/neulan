/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import { CgArrowsExchange } from 'react-icons/cg';
import { MainLayout } from '@/components/Layout';
import Header from './Header';
import Card from './Overview-extra/Card';
import Loader from './UI/Loader/Loader';
import WeeklyChart from './UI/Chart/WeeklyChart';
import DetailedInfo from './Overview-extra/DetailedInfo';
import { useSelector, useDispatch } from '../store';
import { weatherActions } from '../store/weather-slice';
import { fetchForecast } from '../store/weather-actions';
import getLocalTime from '../helpers/getLocalTime';

const tabTypes = ['Chart', 'Detailed Info'];

export default function Overview() {
  const dispatch = useDispatch();
  const { units, isRequested, forecasts, message } = useSelector((state) => state.weather);
  const [activeTab, setActiveTab] = useState(tabTypes[0]);
  const isMetric = units.match(/metric/i);

  const now = moment();
  const offset = forecasts?.timezone;
  const currentDate = momenttz.tz(now, offset);

  const handleUnits = () => {
    if (isMetric) return dispatch(weatherActions.changeUnits('imperial'));
    return dispatch(weatherActions.changeUnits('metric'));
  };

  useEffect(() => {
    if (forecasts) dispatch(fetchForecast(forecasts?.lat, forecasts?.lon, units));
  }, [units]);

  // this is for overview stats
  const windSpeed = forecasts?.current.wind_speed - forecasts?.hourly[0].wind_speed;
  const rainChance = forecasts?.hourly[0].pop - forecasts?.daily[0].pop;
  const pressure = forecasts?.current.pressure - forecasts?.hourly[0].pressure;
  const uv = forecasts?.current.uvi - forecasts?.hourly[0].uvi;

  return (
    <MainLayout>
      <div className="w-full p-8 lg:px-16 gap-y-4 gap-x-4 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray bg-white">
        <div className="w-1/3">
          {isRequested ? (
            <Loader type="MainDate" />
          ) : (
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-gray-700">{currentDate.format('MMMM YYYY')}</span>
              <span className="text-sm md:text-base text-gray-500">{currentDate.format('dddd, MMM DD, YYYY')}</span>
            </div>
          )}
        </div>
        <Header />
      </div>
      <div className="h-full px-2 pb-8 lg:px-16">
        <div className="bg-white rounded-xl shadow-md py-8">
          <div className="px-8 flex justify-between items-center">
            <h1 className="text-base md:text-xl text-gray-600 font-bold">Today Overview</h1>

            <div
              className="cursor-pointer flex items-center gap-x-2 text-gray-600 text-sm"
              onClick={handleUnits}
              aria-hidden
            >
              <span className="flex border border-gray-200 bg-gray-100 rounded-full p-2">
                {isMetric ? '°C' : '°F'} <CgArrowsExchange className="w-5 h-5" /> {!isMetric ? '°C' : '°F'}
              </span>
            </div>
          </div>
          <h1 className="px-8 col-span-2 text-lg mt-3 text-gray-400 font-light">{message}</h1>
          <div className="h-[2px] mt-8 w-full bg-gray-300" />
          <div className="my-5" />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card type="WindSpeed" data={forecasts} calculatedData={windSpeed} isMetric={isMetric} />
            <Card type="RainChance" data={forecasts} calculatedData={rainChance} />
            <Card type="Preassure" data={forecasts} calculatedData={pressure} />
            <Card type="UV" data={forecasts} calculatedData={uv} />
          </div>
        </div>

        <div className="my-8" />

        <div className="flex flex-col w-full bg-white rounded-xl shadow-md py-8">
          <div className="mb-4 border-b-2 border-gray-300 w-full">
            <div className="flex flex-col md:flex-row mx-8 pb-8 justify-between items-start">
              <div className="mb-8 lg:mb-0">
                <h1 className="text-base md:text-lg text-gray-600 font-bold ">Average Weekly Overview</h1>
                <span className="text-xs lg:text-sm text-gray-400">
                  showing data from {getLocalTime(forecasts?.daily[0]?.dt, forecasts?.timezone).format('dddd')} to{' '}
                  {getLocalTime(forecasts?.daily[6]?.dt, forecasts?.timezone).format('dddd')}
                </span>
              </div>
              <ul className="relative flex w-full md:w-1/3 mt-auto">
                {tabTypes.map((item, i) => (
                  <li
                    key={i}
                    className="relative flex-1 text-center cursor-pointer"
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
          {activeTab === 'Chart' && <WeeklyChart />}
          {activeTab === 'Detailed Info' && <DetailedInfo />}
        </div>
      </div>
    </MainLayout>
  );
}
