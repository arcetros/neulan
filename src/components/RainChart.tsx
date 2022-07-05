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
    <div className="relative flex items-center gap-x-6">
      <span className="z-30 font-light text-sm text-gray-200 w-16">{currentTime.format('h A')}</span>
      <div className="relative flex items-center w-full h-full">
        <div className=" bg-[#8cb2fb] h-6 z-30 rounded-xl" style={{ width: percent && percent }} />
        <div className="absolute left-0 top-0 bg-[#2a4263] rounded-xl z-0 w-full h-6" />
      </div>
      <span className="font-light text-sm text-gray-200">{percent}</span>
    </div>
  );
}

export default function RainChart() {
  const items = useSelector((state) => state.weather?.forecasts?.hourly);
  const timezone = useSelector((state) => state.weather?.forecasts?.timezone);
  return (
    <div className="relative flex flex-col gap-y-6">
      <h1 className="text-white">Chance Of Rain</h1>
      <div className="w-full h-full">
        <div className="flex flex-col justify-between gap-y-4 h-44">
          {items && (
            <>
              <Chart percent={`${items[0].pop * 100}%`} dateTime={{ dt: items[0].dt, offset: timezone }} />
              <Chart percent={`${items[3].pop * 100}%`} dateTime={{ dt: items[3].dt, offset: timezone }} />
              <Chart percent={`${items[6].pop * 100}%`} dateTime={{ dt: items[6].dt, offset: timezone }} />
              <Chart percent={`${items[9].pop * 100}%`} dateTime={{ dt: items[9].dt, offset: timezone }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
