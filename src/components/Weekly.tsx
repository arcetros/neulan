import { useState, useMemo } from 'react';
import moment from 'moment';

import { Forecasts } from '../types';
import { BiDownArrow, BiUpArrow } from './UI/Icons';
import XChart from './UI/Chart/XChart';
import Table from './UI/Table/Table';
import TableRow from './UI/Table/TableRow';
import TableCell from './UI/Table/TableCell';
import useMobile from '../hooks/useMobile';
import WeeklyContent from './extras/WeeklyContent';
import getLocalTime from '../helpers/getLocalTime';
import getTempPercent from '../helpers/getTempPercent';
import { useSelector } from '../store';

interface IHourly {
  items: Forecasts;
}

function Hourly({ items }: IHourly) {
  const { isMobile } = useMobile();
  const [activeIndex, setActiveIndex] = useState(null as any);
  const unit = useSelector((state) => state.weather?.units);

  const memoizedItems = useMemo(
    () =>
      items?.daily.map((item, id) => {
        const temps = getTempPercent(item.temp.min, item.temp.max, unit);
        const isActive = id === activeIndex;
        return (
          <TableRow
            content={<WeeklyContent item={item} />}
            key={id}
            onClick={() => setActiveIndex(id)}
            isActive={isActive}
            disable={setActiveIndex}
          >
            <TableCell className="flex items-center">
              <div className="flex justify-between items-center w-24">
                <span className="text-sm md:text-base text-gray-800">
                  {id === 0 ? 'Today' : moment.unix(item.dt).format('ddd')}
                </span>
                <span className="text-xs ml-2">{getLocalTime(item.dt, items?.timezone).format('M/D')}</span>
              </div>
            </TableCell>
            {!isMobile && (
              <TableCell>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather.map((el) => el.icon)}${
                    isMobile ? '' : '@2x'
                  }.png`}
                  alt="Weather Icon"
                  className="relative"
                />
              </TableCell>
            )}
            <TableCell className="w-full">
              <div className="flex justify-between items-center gap-x-4">
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
          </TableRow>
        );
      }),
    [items, activeIndex],
  );

  return <Table>{memoizedItems}</Table>;
}

export default Hourly;
