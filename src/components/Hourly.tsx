import { useState, useEffect, useCallback, memo } from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import { IoMdWater, IoMdSpeedometer } from 'react-icons/io';
import { BsDroplet } from 'react-icons/bs';
import { GiSunRadiations } from 'react-icons/gi';
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

  const handleActive = useCallback((id: number) => setActiveIndex(id), []);
  useEffect(() => {
    setActiveIndex(null);
  }, [active]);

  return (
    <Table active={active === 'Hourly'}>
      {items?.hourly.slice(0, 13).map((item, id) => {
        const isActive = id === activeIndex;
        const dateTime = moment.unix(item.dt).format();
        const offset = items?.timezone;
        const currentTime = momenttz.tz(dateTime, offset);
        const content = (
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-xs">
              <span className="font-bold capitalize">{item.weather[0].description}</span>
              <span>The temperature will be {item.temp.toFixed(0)}°</span>
            </div>
            <div className="flex flex-col gap-y-0.5 text-xs">
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
                <span>Preassure {item.pressure}hpa</span>
              </div>
            </div>
          </div>
        );
        return (
          <TableRow
            content={content}
            key={id}
            onClick={() => handleActive(id)}
            isActive={isActive}
            disable={setActiveIndex}
          >
            <TableCell>
              <div className="flex gap-x-1 items-center">
                <p className="text-sm md:text-base w-12 md:w-24 text-gray-800">{currentTime.format('LT')}</p>
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

export default memo(Hourly);
