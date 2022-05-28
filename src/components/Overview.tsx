import { useState, useEffect, useRef } from 'react';
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
  const scrollToElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items) {
      if (scrollToElement.current) {
        scrollToElement.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [items]);

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

        <div ref={scrollToElement}>
          <div className="overflow-x-auto flex gap-x-8 md:gap-x-16 mt-4">
            {types.map((item, index) => (
              <Tab key={index} active={active === item} onClick={() => setActive(item)}>
                {item}
              </Tab>
            ))}
          </div>
          <Table active={active === 'Hourly'}>
            {items?.hourly.slice(0, 13).map((item, id) => (
              <TableRow key={id}>
                <TableCell>
                  <div className="flex gap-x-1 items-center">
                    <p className="text-sm md:text-base w-12 md:w-24 text-gray-800">
                      {moment.unix(item.dt).format('LT')}
                    </p>
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
            ))}
          </Table>
          <Table active={active === 'Weekly'}>
            {items?.daily.map((item, id) => {
              const temps = getTempPercent(item.temp.min, item.temp.max);
              console.log(Math.floor(item.temp.min), Math.floor(item.temp.max));
              return (
                <TableRow key={id}>
                  <TableCell className="flex flex-1 md:flex-initial justify-between items-center">
                    <div className="flex flex-col items-left w-24">
                      <span className="text-sm md:text-base text-gray-800">
                        {id === 0 ? 'Today' : moment.unix(item.dt).format('ddd')}
                      </span>
                      <span className="text-xs">{moment.unix(item.dt).format('M/D')}</span>
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
        </div>
      </main>
    </div>
  );
}
