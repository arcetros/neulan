/* eslint-disable no-unsafe-optional-chaining */
import { useEffect } from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import { CgArrowsExchange } from 'react-icons/cg';
import { OverviewLayout } from './Layouts';
import Header from './Header';
import Card from './Overview-extra/Card';
import Loader from './UI/Loader/Loader';
import WeeklyChart from './UI/Chart/WeeklyChart';
import Weekly from './Weekly';
import { useSelector, useDispatch } from '../store';
import { weatherActions } from '../store/weather-slice';
import { fetchForecast } from '../store/weather-actions';

export default function Overview() {
  const dispatch = useDispatch();
  const { units, isRequested, forecasts } = useSelector((state) => state.weather);
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
    <OverviewLayout>
      <div className="w-full px-8 lg:px-16 pb-8 gap-y-4 gap-x-4 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray">
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
      <div className="h-full px-8 lg:px-16">
        <div className="flex justify-between items-center">
          <h1 className="text-base md:text-lg text-gray-600 font-bold">Today Overview</h1>
          <div
            className="cursor-pointer flex items-center gap-x-2 text-gray-600 text-sm"
            onClick={handleUnits}
            aria-hidden
          >
            <span>Change Units</span>
            <span className="flex">
              {isMetric ? '°C' : '°F'} <CgArrowsExchange className="w-5 h-5" /> {!isMetric ? '°C' : '°F'}
            </span>
          </div>
        </div>
        <div className="my-5" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card type="WindSpeed" data={forecasts} calculatedData={windSpeed} />
          <Card type="RainChance" data={forecasts} calculatedData={rainChance} />
          <Card type="Preassure" data={forecasts} calculatedData={pressure} />
          <Card type="UV" data={forecasts} calculatedData={uv} />
        </div>
        <div className="my-8" />
        <h1 className="text-base md:text-lg text-gray-600 font-bold mb-4">Average Daily Temperature</h1>
        <div className="flex flex-col lg:flex-row w-full">
          <WeeklyChart />
          <Weekly items={forecasts} />
        </div>
      </div>
    </OverviewLayout>
  );
}
