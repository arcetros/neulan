import { useState, useMemo } from 'react';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import moment from 'moment';
import { Dropdown } from './Dropdown';
import { Temperature } from './Temperature';
import { useSelector } from '@/store';
import { useMobile } from '@/hooks';
import { getLocalTime, getTempsPercent } from '@/helpers';
import { Table, TableCell, TableRow } from '@/components/Element/Table';

export function DetailedInfo() {
  const { isMobile } = useMobile();
  const [activeIndex, setActiveIndex] = useState(null as any);
  const { forecasts, units } = useSelector((state) => state.weather);

  const memoizedItems = useMemo(
    () =>
      forecasts?.daily.map((item, id) => {
        const temps = getTempsPercent(item.temp.min, item.temp.max, units);
        const isActive = id === activeIndex;
        return (
          <TableRow
            content={<Dropdown item={item} />}
            key={id}
            onClick={() => setActiveIndex(id)}
            isActive={isActive}
            disable={setActiveIndex}
          >
            <TableCell className="flex items-center">
              <div className="flex justify-between items-center w-24">
                <span className="font-light text-sm md:text-base text-gray-800 dark:text-textDarkMain">
                  {id === 0 ? 'Today' : moment.unix(item.dt).format('ddd')}
                </span>
                <span className="text-xs ml-2">{getLocalTime(item.dt, forecasts?.timezone).format('M/D')}</span>
              </div>
            </TableCell>
            <TableCell className="w-full lg:w-fit">
              <img
                src={`http://openweathermap.org/img/wn/${item.weather.map((el) => el.icon)}${
                  isMobile ? '' : '@2x'
                }.png`}
                alt="Weather Icon"
                className="relative"
              />
            </TableCell>
            <TableCell className="w-full">
              <div className="flex justify-between items-center gap-x-4">
                <span className="flex gap-x-1 text-blue-500">
                  <span className="flex items-center md:hidden">
                    <BiDownArrow className="fill-blue-500" />
                  </span>
                  {`${Math.floor(item.temp.min)}°`}
                </span>
                {temps.map((temp, index) => {
                  if (temp.highest === 0 || temp.lowest === 0) {
                    return (
                      <Temperature
                        key={index}
                        lowest={temp.lowest && temp.lowest}
                        highest={temp.highest && temp.highest}
                      />
                    );
                  }
                  return <Temperature key={index} lowest={temp.lowest} highest={temp.highest} />;
                })}

                <span className="flex gap-x-1">
                  <span className="flex items-center md:hidden">
                    <BiUpArrow className="fill-red-500" />
                  </span>
                  <span className="text-inherit text-red-500"> {`${Math.floor(item.temp.max)}°`}</span>
                </span>
              </div>
            </TableCell>
          </TableRow>
        );
      }),
    [forecasts, activeIndex],
  );

  return (
    <div className="min-h-[400px] mx-2 md:mx-8">
      <Table>{memoizedItems}</Table>
    </div>
  );
}
