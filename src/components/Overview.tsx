import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import Header from './Header';
import Table from './UI/Table';
import Tab from './UI/Table/Tab';

const types = ['Week', 'Month', '3 Month', '6 Month'];

function Card() {
  return (
    <div className="relative flex flex-col rounded-lg">
      <div className="h-56 w-48 flex-none bg-cover rounded-lg text-center overflow-hidden bg-[url('https://source.unsplash.com/random/?city,night')]" />
      <span className="mt-4 mx-auto text-gray-600 text-sm font-bold">Place Holder</span>
    </div>
  );
}

export default function Overview() {
  const [active, setActive] = useState(types[0]);
  return (
    <div className="relative flex flex-col mx-auto max-w-[150rem] flex-1 overflow-y-auto overflow-x-hidden px-16 pb-12">
      <Header />
      <main className="flex flex-col pt-8 gap-y-8">
        <span className="font-thin text-4xl text-gray-700">
          Weather <span className="font-bold">Forecast</span>
        </span>
        <div className="flex gap-x-8">
          <Card />
          <Card />
          <Card />
          <div className="flex rounded-xl border border-primary h-56 w-40">
            <div className="flex flex-col gap-y-8 m-auto border-border-primary text-primary">
              <FiPlus className="m-auto w-5 h-auto" />
              <span className="font-medium">Add city</span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-16 mt-4">
          {types.map((item, index) => (
            <Tab key={index} active={active === item} onClick={() => setActive(item)}>
              {item}
            </Tab>
          ))}
        </div>
        <Table />
      </main>
    </div>
  );
}
