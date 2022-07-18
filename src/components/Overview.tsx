/* eslint-disable no-unsafe-optional-chaining */
import { useEffect } from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsWind, BsCloudRain, BsSpeedometer2, BsFillSunFill } from 'react-icons/bs';
import { CgArrowsExchange } from 'react-icons/cg';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Weekly from './Weekly';
import getLocalTime from '../helpers/getLocalTime';
import { useSelector, useDispatch } from '../store';
import Card from './Overview/Card';
import Header from './Header';
import { weatherActions } from '../store/weather-slice';
import { fetchForecast } from '../store/weather-actions';
import useMobile from '../hooks/useMobile';

export default function Overview() {
  const { isMobile } = useMobile();
  const dispatch = useDispatch();
  const currentForecast = useSelector((state) => state.weather?.forecasts);
  const unit = useSelector((state) => state.weather?.units);
  const isLoading = useSelector((state) => state.weather?.isRequested);
  const isMetric = unit.match(/metric/i);

  const now = moment();
  const offset = currentForecast?.timezone;
  const currentDate = momenttz.tz(now, offset);

  const handleUnits = () => {
    if (isMetric) return dispatch(weatherActions.changeUnits('imperial'));
    return dispatch(weatherActions.changeUnits('metric'));
  };

  useEffect(() => {
    if (currentForecast) dispatch(fetchForecast(currentForecast?.lat, currentForecast?.lon, unit));
  }, [unit]);

  // this is for overview stats
  const windSpeed = currentForecast?.current.wind_speed - currentForecast?.hourly[0].wind_speed;
  const rainChance = currentForecast?.hourly[0].pop - currentForecast?.daily[0].pop;
  const pressure = currentForecast?.current.pressure - currentForecast?.hourly[0].pressure;
  const uv = currentForecast?.current.uvi - currentForecast?.hourly[0].uvi;

  const data = [
    {
      name: !isLoading && 'Today',
      temperature: Math.floor((currentForecast?.daily[0].temp.min + currentForecast?.daily[1].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[1].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[1].temp.min + currentForecast?.daily[1].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[2].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[2].temp.min + currentForecast?.daily[2].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[3].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[3].temp.min + currentForecast?.daily[3].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[4].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[4].temp.min + currentForecast?.daily[4].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[5].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[5].temp.min + currentForecast?.daily[5].temp.max) / 2),
    },
    {
      name: !isLoading && getLocalTime(currentForecast?.daily[6].dt, currentForecast?.timezone).format('dddd'),
      temperature: Math.floor((currentForecast?.daily[6].temp.max + currentForecast?.daily[6].temp.min) / 2),
    },
  ];

  return (
    <div className="relative flex flex-col mx-auto w-full md:w-full lg:max-w-[120rem] overflow-x-hidden flex-1">
      <main className="flex flex-col py-8 gap-y-8">
        <div className="w-full px-8 lg:px-16 pb-8 gap-y-4 gap-x-4 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray">
          <div className="w-1/3">
            {isLoading ? (
              <div className="flex flex-col gap-y-4">
                <div className="w-1/3 my-auto h-6 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />
                <div className="w-2/3 my-auto h-4 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />
              </div>
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
            <Card>
              <BsWind className="text-blue-500 w-7 h-7" />
              <div className="mr-auto ml-4 flex flex-col justify-center h-full">
                <span className="text-sm text-gray-600 font-light">Wind Speed</span>
                <span className="text-xl text-gray-800">
                  {currentForecast?.current.wind_speed.toFixed(2)}
                  {isMetric ? 'km/h' : 'mph'}
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <IoMdArrowDropdown
                  className={`w-5 h-5 ${
                    currentForecast?.current.wind_speed < currentForecast?.hourly[0].wind_speed
                      ? 'text-red-500'
                      : 'text-blue-500 rotate-180'
                  }`}
                />
                <span className="text-gray-600 font-light text-sm">
                  {currentForecast && Math.abs(windSpeed).toFixed(2)}
                  {isMetric ? 'km/h' : 'mph'}
                </span>
              </div>
            </Card>
            <Card>
              <BsCloudRain className="text-blue-500 w-7 h-7" />
              <div className="mr-auto ml-4 flex flex-col justify-center h-full">
                <span className="text-sm text-gray-600 font-light">Rain Chance</span>
                <span className="text-xl text-gray-800">{currentForecast?.hourly[0].pop * 100}%</span>
              </div>
              <div className="flex items-center gap-x-1">
                <IoMdArrowDropdown
                  className={`w-5 h-5 ${
                    currentForecast?.hourly[0].pop < currentForecast?.daily[0].pop
                      ? 'text-red-500'
                      : 'text-blue-500 rotate-180'
                  }`}
                />
                <span className="text-gray-600 font-light text-sm">{(rainChance * 100).toFixed(2)}%</span>
              </div>
            </Card>
            <Card>
              <BsSpeedometer2 className="text-blue-500 w-7 h-7" />
              <div className="mr-auto ml-4 flex flex-col justify-center h-full">
                <span className="text-sm text-gray-600 font-light">Preassure</span>
                <span className="text-xl text-gray-800">{currentForecast?.hourly[0].pressure} hpa</span>
              </div>
              <div className="flex items-center gap-x-1">
                <IoMdArrowDropdown
                  className={`w-5 h-5 ${
                    currentForecast?.current.pressure < currentForecast?.daily[0].pressure
                      ? 'text-red-500'
                      : 'text-blue-500 rotate-180'
                  }`}
                />
                <span className="text-gray-600 font-light text-sm">{pressure} hpa</span>
              </div>
            </Card>
            <Card>
              <BsFillSunFill className="text-blue-500 w-7 h-7" />
              <div className="mr-auto ml-4 flex flex-col justify-center h-full">
                <span className="text-sm text-gray-600 font-light">UV Index</span>
                <span className="text-xl text-gray-800">{currentForecast?.hourly[0].uvi}</span>
              </div>
              <div className="flex items-center gap-x-1">
                <IoMdArrowDropdown
                  className={`w-5 h-5 ${
                    currentForecast?.current.uvi < currentForecast?.daily[0].uvi
                      ? 'text-red-500'
                      : 'text-blue-500 rotate-180'
                  }`}
                />
                <span className="text-gray-600 font-light text-sm">{uv.toFixed(2)}</span>
              </div>
            </Card>
          </div>
          <div className="my-8" />
          <h1 className="text-base md:text-lg text-gray-600 font-bold mb-4">Average Daily Temperature</h1>
          <div className="flex flex-col lg:flex-row w-full">
            <ResponsiveContainer width={isMobile ? '100%' : '50%'} height={500} className="min-w-[50%]">
              <AreaChart
                data={data}
                margin={{
                  top: 30,
                  right: 30,
                  left: 0,
                  bottom: -10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  type="number"
                  domain={[
                    (dataMin: number) => Math.floor(dataMin - 0.9),
                    (dataMax: number) => Math.floor(dataMax * 1.04),
                  ]}
                  allowDataOverflow
                />
                <Tooltip />
                <Area type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
            <Weekly items={currentForecast} />
          </div>
        </div>
        {/* <Hourly items={items} active={active} />
        <Weekly items={items} active={active} /> */}
      </main>
    </div>
  );
}
