/* eslint-disable no-unsafe-optional-chaining */
import moment from 'moment';
import momenttz from 'moment-timezone';
import { BiLinkExternal } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsWind, BsCloudRain, BsSpeedometer2, BsFillSunFill } from 'react-icons/bs';
import { useSelector } from '../store';
import Card from './Overview/Card';
// import Tab from './UI/Table/Tab';
// import Hourly from './Hourly';
// import Weekly from './Weekly';
import Header from './Header';

// const types = ['Hourly', 'Weekly']; // Weather Types

export default function Overview() {
  // const [active, setActive] = useState(types[0]);
  // const items = useSelector((state) => state.weather.forecasts);
  const currentForecast = useSelector((state) => state.weather?.forecasts);
  const isLoading = useSelector((state) => state.weather?.isRequested);

  const now = moment();
  const offset = currentForecast?.timezone;
  const currentDate = momenttz.tz(now, offset);

  // this is for overview stats
  const windSpeed = currentForecast?.current.wind_speed - currentForecast?.hourly[0].wind_speed;
  const rainChance = currentForecast?.hourly[0].pop - currentForecast?.daily[0].pop;
  const pressure = currentForecast?.current.pressure - currentForecast?.hourly[0].pressure;
  const uv = currentForecast?.current.uvi - currentForecast?.hourly[0].uvi;

  return (
    <div className="relative flex flex-col mx-auto w-full md:w-full lg:max-w-[120rem] flex-1 overflow-y-auto overflow-x-hidden pb-12">
      <main className="flex flex-col pt-8 gap-y-8">
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

          {/* <div className="flex items-center gap-x-8 md:gap-x-16">
            {types.map((item, index) => (
              <Tab key={index} active={active === item} onClick={() => setActive(item)}>
                {item}
              </Tab>
            ))}
          </div> */}
        </div>
        <div className="w-full px-8 lg:px-16">
          <div className="flex items-center justify-between">
            <h1 className="text-base md:text-lg text-gray-600 font-bold">Today Overview</h1>

            <div className="flex gap-x-2 items-center text-blue-500">
              <span>More detail</span>
              <BiLinkExternal />
            </div>
          </div>
          <div className="my-5" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <BsWind className="text-blue-500 w-7 h-7" />
              <div className="mr-auto ml-4 flex flex-col justify-center h-full">
                <span className="text-sm text-gray-600 font-light">Wind Speed</span>
                <span className="text-xl text-gray-800">{currentForecast?.current.wind_speed.toFixed(2)}km/h</span>
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
                  km/h
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
        </div>
        {/* <Hourly items={items} active={active} />
        <Weekly items={items} active={active} /> */}
      </main>
    </div>
  );
}
