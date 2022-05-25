import { useState } from 'react';
import moment from 'moment';
import { FiPlus } from 'react-icons/fi';
import { IoMdWater } from 'react-icons/io';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import Header from './Header';
import Tab from './UI/Table/Tab';
import Table from './UI/Table/Table';
import TableCell from './UI/Table/TableCell';
import TableRow from './UI/Table/TableRow';
import XChart from './UI/Chart/XChart';
import { useSelector } from '../store';
import useMobile from '../hooks/useMobile';
import getTempPercent from '../helpers';

const types = ['Hourly', 'Weekly'];
const weekly = [
  { dt: 'Sunday', humidity: 54, weather: { description: 'rain', icon: 'rain' }, temps: { temp_min: 12, temp_max: 24 } },
  { dt: 'Monday', humidity: 54, weather: { description: 'rain', icon: 'rain' }, temps: { temp_min: 12, temp_max: 24 } },
  {
    dt: 'Tuesday',
    humidity: 54,
    weather: { description: 'rain', icon: 'rain' },
    temps: { temp_min: 24, temp_max: 30 },
  },
  {
    dt: 'Wednesday',
    humidity: 54,
    weather: { description: 'rain', icon: 'rain' },
    temps: { temp_min: 19, temp_max: 24 },
  },
  {
    dt: 'Thursday',
    humidity: 54,
    weather: { description: 'rain', icon: 'rain' },
    temps: { temp_min: 14, temp_max: 18 },
  },
  { dt: 'Friday', humidity: 54, weather: { description: 'rain', icon: 'rain' }, temps: { temp_min: 12, temp_max: 23 } },
  {
    dt: 'Saturday',
    humidity: 54,
    weather: { description: 'rain', icon: 'rain' },
    temps: { temp_min: 0, temp_max: 24 },
  },
];

function Card() {
  return (
    <div className="order-last relative flex flex-col rounded-lg">
      <div className="h-56 w-48 flex-none bg-cover rounded-lg text-center overflow-hidden bg-[url('https://source.unsplash.com/random/?city,night')]" />
      <span className="mt-4 mx-auto text-gray-600 text-sm font-bold">Place Holder</span>
    </div>
  );
}

export default function Overview() {
  const [active, setActive] = useState(types[0]);
  const items = useSelector((state) => state.weather.forecasts);
  const { isMobile } = useMobile();
  return (
    <div className="relative flex flex-col mx-auto max-w-xs md:max-w-full lg:max-w-[150rem] flex-1 overflow-y-auto overflow-x-hidden px-0 md:px-6 lg:px-16 pb-12">
      <Header />
      <main className="flex flex-col pt-8 gap-y-8">
        <span className="font-thin text-4xl text-gray-700">
          Weather <span className="font-bold">Forecast</span>
        </span>
        <div className="flex overflow-x-auto gap-x-8">
          <Card />
          <Card />
          <Card />
          <div className="flex flex-none rounded-xl border border-primary h-56 w-48">
            <div className="flex flex-col gap-y-8 m-auto border-border-primary text-primary">
              <FiPlus className="m-auto w-5 h-auto" />
              <span className="font-medium">Add city</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto flex gap-x-8 md:gap-x-16 mt-4">
          {types.map((item, index) => (
            <Tab key={index} active={active === item} onClick={() => setActive(item)}>
              {item}
            </Tab>
          ))}
        </div>
        {/* <button type="button" onClick={() => console.log(items.hourly)}>
          test
        </button> */}
        <Table active={active === 'Hourly'}>
          {items?.hourly.slice(0, 13).map((item, id) => (
            <TableRow key={id}>
              <TableCell>
                <div className="flex gap-x-1 md:gap-x-8 items-center">
                  <p className="text-xs md:text-base w-12">{moment.unix(item.dt).format('LT')}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather.map((el) => el.icon)}${
                      isMobile ? '' : '@2x'
                    }.png`}
                    alt="Weather Icon"
                    className="relative"
                  />
                  <span className="text-2xl"> {Math.floor(item.temp)}°</span>
                </div>
              </TableCell>
              <TableCell className="text-xs md:text-base">feels like {Math.floor(item.feels_like)}°</TableCell>
              <TableCell>
                <div className="flex gap-x-1 items-center">
                  <IoMdWater className="text-blue-500" />
                  <span className="flex-1 text-gray-500">{Math.floor(item.pop * 100)}%</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <Table active={active === 'Weekly'}>
          {weekly.map((item, id) => {
            const temps = getTempPercent(item.temps.temp_min, item.temps.temp_max);
            return (
              <TableRow key={id}>
                <TableCell className="w-1/12">{item.dt}</TableCell>
                <TableCell className="w-1/12">
                  <div className="flex gap-x-1 items-center">
                    <IoMdWater className="text-blue-500" />
                    <span className="flex-1 text-gray-500">{item.humidity}%</span>
                  </div>
                </TableCell>
                <TableCell className="w-1/12">
                  <span className="text-blue-500">{item.weather.icon}</span>
                </TableCell>
                <TableCell className="w-3/12">
                  <div className="flex justify-between items-center gap-x-8">
                    <span className="flex gap-x-1 text-gray-500">
                      <span className="flex items-center md:hidden">
                        <BiDownArrow className="fill-blue-500" />
                      </span>
                      {`${item.temps.temp_min}*C`}
                    </span>
                    {temps.map((temp, index) => {
                      if (temp.highest === 0 || temp.lowest === 0) {
                        return (
                          <XChart
                            key={index}
                            lowest={temp.lowest && temp.lowest}
                            highest={temp.highest && temp.highest}
                          />
                        );
                      }
                      return <XChart key={index} lowest={temp.lowest} highest={temp.highest} />;
                    })}

                    <span className="flex gap-x-1">
                      <span className="flex items-center md:hidden">
                        <BiUpArrow className="fill-red-500" />
                      </span>
                      {`${item.temps.temp_max}*C`}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </main>
    </div>
  );
}
