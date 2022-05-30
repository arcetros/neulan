import { useState, useEffect } from 'react';
import moment from 'moment';
import { IoMdWater } from 'react-icons/io';
import { Forecasts } from '../types';
import useMobile from '../hooks/useMobile';
import Table from './UI/Table/Table';
import TableRow from './UI/Table/TableRow';
import TableCell from './UI/Table/TableCell';

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
    <Table active={active === 'Hourly'}>
      {items?.hourly.slice(0, 13).map((item, id) => {
        const isActive = id === activeIndex;
        return (
          <TableRow key={id} onClick={() => setActiveIndex(id)} isActive={isActive} disable={setActiveIndex}>
            <TableCell>
              <div className="flex gap-x-1 items-center">
                <p className="text-sm md:text-base w-12 md:w-24 text-gray-800">{moment.unix(item.dt).format('LT')}</p>
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
                <span className="text-sm md:text-base flex-1 text-gray-500">{Math.floor(item.pop * 100)}%</span>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}

export default Hourly;
