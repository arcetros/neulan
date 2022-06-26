import moment from 'moment';
import momenttz from 'moment-timezone';
import { useSelector } from '../store';

interface IIsActive {
  percent: string;
  dateTime: { dt: number; offset: string };
}

function Chart({ percent, dateTime }: IIsActive) {
  const time = moment.unix(dateTime.dt).format();
  const offset = dateTime?.offset;
  const currentTime = momenttz.tz(time, offset);
  return (
    <div className="relative">
      <div
        className="absolute bottom-0 bg-yellow-400 w-[10px] z-20 rounded-lg"
        style={{ height: percent && percent }}
      />
      <div className="absolute bottom-0 left-[0.9px] transform translate-x-1/2 z-0 border-l-gray-700 border-dashed border-l-2 w-1 h-full" />
      <span className="absolute -left-3 -bottom-8 text-xs text-gray-200">{currentTime.format('HH:mm')}</span>
    </div>
  );
}

export default function RainChart() {
  const items = useSelector((state) => state.weather?.forecasts?.hourly);
  const timezone = useSelector((state) => state.weather?.forecasts?.timezone);
  return (
    <div className="flex flex-col gap-y-6">
      <h1 className="text-white">Chance Of Rain</h1>
      <div className="w-full h-full">
        <div className=" flex justify-between mr-3 h-full">
          <div className="flex flex-col justify-between text-gray-200 text-xs h-36">
            <span>heavy rain</span>
            <span>rainy</span>
            <span>sunny</span>
          </div>
          {items && (
            <>
              <Chart percent={`${items[0].pop * 100}%`} dateTime={{ dt: items[0].dt, offset: timezone }} />
              <Chart percent={`${items[3].pop * 100}%`} dateTime={{ dt: items[3].dt, offset: timezone }} />
              <Chart percent={`${items[6].pop * 100}%`} dateTime={{ dt: items[6].dt, offset: timezone }} />
              <Chart percent={`${items[9].pop * 100}%`} dateTime={{ dt: items[9].dt, offset: timezone }} />
              <Chart percent={`${items[12].pop * 100}%`} dateTime={{ dt: items[12].dt, offset: timezone }} />
              <Chart percent={`${items[15].pop * 100}%`} dateTime={{ dt: items[15].dt, offset: timezone }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
