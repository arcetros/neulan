import { useState } from 'react';
import { useSelector } from '../store';
import Tab from './UI/Table/Tab';
import Heading from './UI/Heading';
import Hourly from './Hourly';
import Weekly from './Weekly';

const types = ['Hourly', 'Weekly']; // Weather Types

export default function Overview() {
  const [active, setActive] = useState(types[0]);
  const items = useSelector((state) => state.weather.forecasts);
  const selectedCity = useSelector((state) => state.weather.current_weather);

  return (
    <div className="relative flex flex-col mx-auto max-w-[90%] md:w-full lg:max-w-[150rem] flex-1 overflow-y-auto overflow-x-hidden md:px-6 lg:px-16 pb-12">
      <main className="flex flex-col pt-8 gap-y-8">
        <div className="flex flex-row items-center justify-between">
          <Heading>
            {`${selectedCity && selectedCity?.name}, `} <span className="font-bold">{selectedCity?.sys.country} </span>
          </Heading>

          <div className="flex items-center gap-x-8 md:gap-x-16">
            {types.map((item, index) => (
              <Tab key={index} active={active === item} onClick={() => setActive(item)}>
                {item}
              </Tab>
            ))}
          </div>
        </div>

        <Hourly items={items} active={active} />
        <Weekly items={items} active={active} />
      </main>
    </div>
  );
}
