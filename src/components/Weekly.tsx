import { useState, useEffect } from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { IoMdWater, IoMdSpeedometer } from 'react-icons/io';
import { WiSunrise } from 'react-icons/wi';
import { BsDroplet, BsSunFill, BsSunset, BsFillMoonFill } from 'react-icons/bs';
import { GiSunRadiations } from 'react-icons/gi';

import { Forecasts } from '../types';
import useMobile from '../hooks/useMobile';
import XChart from './UI/Chart/XChart';
import Table from './UI/Table/Table';
import TableRow from './UI/Table/TableRow';
import TableCell from './UI/Table/TableCell';
import getTempPercent from '../helpers';

interface IHourly {
  active: string;
  items: Forecasts;
}

function Hourly({ active, items }: IHourly) {
  const [activeIndex, setActiveIndex] = useState(null as any);
  const { isMobile } = useMobile();
  useEffect(() => {
    setActiveIndex(null);
  }, [active]);
  return (
    <Table active={active === 'Weekly'}>
      {items?.daily.map((item, id) => {
        const temps = getTempPercent(item.temp.min, item.temp.max);
        const isActive = id === activeIndex;
        const dateTime = moment.unix(item.dt).format();
        const offset = items?.timezone;
        const currentTime = momenttz.tz(dateTime, offset);
        const content = (
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
            <div className="flex flex-row justify-around md:flex-col mt-3 gap-y-0.5 text-xs w-full md:w-auto">
              <div className="flex gap-1 items-center">
                <GiSunRadiations />
                <span className="">UVI {item.uvi.toFixed(0)}</span>
              </div>
              <div className="flex gap-1 items-center">
                <BsDroplet />
                <span>Humidity {item.humidity}%</span>
              </div>
              <div className="flex gap-1 items-center">
                <IoMdSpeedometer />
                <span>{item.pressure}hpa</span>
              </div>
            </div>
          </div>
        );
        return (
          <TableRow
            content={content}
            key={id}
            onClick={() => setActiveIndex(id)}
            isActive={isActive}
            disable={setActiveIndex}
          >
            <TableCell className="flex flex-1 md:flex-initial justify-between items-center">
              <div className="flex flex-col items-left w-24">
                <span className="text-sm md:text-base text-gray-800">
                  {id === 0 ? 'Today' : moment.unix(item.dt).format('ddd')}
                </span>
                <span className="text-xs">{currentTime.format('M/D')}</span>
              </div>

              <img
                src={`http://openweathermap.org/img/wn/${item.weather.map((el) => el.icon)}${
                  isMobile ? '' : '@2x'
                }.png`}
                alt="Weather Icon"
                className="relative"
              />
            </TableCell>
            <TableCell className="flex-1 w-auto md:w-1/2">
              <div className="flex flex-col md:flex-row justify-between items-center gap-x-8">
                <span className="flex gap-x-1 text-gray-500">
                  <span className="flex items-center md:hidden">
                    <BiDownArrow className="fill-blue-500" />
                  </span>
                  {`${Math.floor(item.temp.min)}°`}
                </span>
                {temps.map((temp, index) => {
                  if (temp.highest === 0 || temp.lowest === 0) {
                    return (
                      <XChart key={index} lowest={temp.lowest && temp.lowest} highest={temp.highest && temp.highest} />
                    );
                  }
                  return <XChart key={index} lowest={temp.lowest} highest={temp.highest} />;
                })}

                <span className="flex gap-x-1">
                  <span className="flex items-center md:hidden">
                    <BiUpArrow className="fill-red-500" />
                  </span>
                  <span className="text-inherit md:text-red-400"> {`${Math.floor(item.temp.max)}°`}</span>
                </span>
              </div>
            </TableCell>
            <TableCell className="flex-none md:flex-initial">
              <div className="flex gap-x-1 items-center">
                <IoMdWater className="text-blue-500" />
                <span className="text-sm md:text-base text-gray-500">{item.humidity}%</span>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}

export default Hourly;
