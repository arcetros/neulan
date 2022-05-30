import { useState, useEffect, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useSelector } from '../store';
import Header from './Header';
import Tab from './UI/Table/Tab';
import Card from './UI/Card';
import Hourly from './Hourly';
import Weekly from './Weekly';

const types = ['Hourly', 'Weekly']; // Weather Types

export default function Overview() {
  const [active, setActive] = useState(types[0]);
  const items = useSelector((state) => state.weather.forecasts);
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
          <Card image="bg-[url('https://source.unsplash.com/random/?city,night')]" />
          <Card image="bg-[url('https://source.unsplash.com/random/?city,night')]" />
          <Card image="bg-[url('https://source.unsplash.com/random/?city,night')]" />
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
          <Hourly items={items} active={active} />
          <Weekly items={items} active={active} />
        </div>
      </main>
    </div>
  );
}
