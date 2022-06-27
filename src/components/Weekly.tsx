import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';

import { Forecasts } from '../types';
import { BiDownArrow, BiUpArrow, IoMdWater } from './UI/Icons';
import useMobile from '../hooks/useMobile';
import XChart from './UI/Chart/XChart';
import Table from './UI/Table/Table';
import TableRow from './UI/Table/TableRow';
import TableCell from './UI/Table/TableCell';
import WeeklyContent from './extras/WeeklyContent';
import getLocalTime from '../helpers/getLocalTime';
import getTempPercent from '../helpers';

interface IHourly {
  active: string;
  items: Forecasts;
}

function Hourly({ active, items }: IHourly) {
  const [activeIndex, setActiveIndex] = useState(null as any);
  const { isMobile } = useMobile();

  const memoizedItems = useMemo(
    () =>
      items?.daily.map((item, id) => {
        const temps = getTempPercent(item.temp.min, item.temp.max);
        const isActive = id === activeIndex;
        return (
          <TableRow
            content={<WeeklyContent item={item} />}
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
                <span className="text-xs">{getLocalTime(item.dt, items?.timezone).format('M/D')}</span>
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
      }),
    [items, activeIndex],
  );

  useEffect(() => {
    setActiveIndex(null);
  }, [active]);
  return <Table active={active === 'Weekly'}>{memoizedItems}</Table>;
}

export default Hourly;
