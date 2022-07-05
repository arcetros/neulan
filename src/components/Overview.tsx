import moment from 'moment';
import momenttz from 'moment-timezone';
import { useSelector } from '../store';
// import Tab from './UI/Table/Tab';
// import Hourly from './Hourly';
// import Weekly from './Weekly';
import Header from './Header';

// const types = ['Hourly', 'Weekly']; // Weather Types

export default function Overview() {
  // const [active, setActive] = useState(types[0]);
  // const items = useSelector((state) => state.weather.forecasts);
  const currentForecast = useSelector((state) => state.weather?.forecasts);

  const now = moment();
  const offset = currentForecast?.timezone;
  const currentDate = momenttz.tz(now, offset);

  return (
    <div className="relative flex flex-col mx-auto w-full md:w-full lg:max-w-[150rem] flex-1 overflow-y-auto overflow-x-hidden pb-12">
      <main className="flex flex-col pt-8 gap-y-8">
        <div className="w-full px-8 lg:px-16 pb-8 gap-y-4 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-gray-700">{currentDate.format('MMMM YYYY')}</span>
            <span className="text-sm md:text-base text-gray-500">{currentDate.format('dddd, MMM DD, YYYY')}</span>
          </div>
          <Header />

          {/* <div className="flex items-center gap-x-8 md:gap-x-16">
            {types.map((item, index) => (
              <Tab key={index} active={active === item} onClick={() => setActive(item)}>
                {item}
              </Tab>
            ))}
          </div> */}
        </div>

        {/* <Hourly items={items} active={active} />
        <Weekly items={items} active={active} /> */}
      </main>
    </div>
  );
}
