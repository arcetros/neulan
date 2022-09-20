import moment from 'moment';
import momenttz from 'moment-timezone';
import { useSelector } from '@/store';

interface IIsActive {
  percent: string;
  dateTime: { dt: number; offset: string };
}

function Chart({ percent, dateTime }: IIsActive) {
  const currentForecast = useSelector((state) => state.weather?.forecasts);
  const isLoading = useSelector((state) => state.weather?.isRequested);
  const time = moment.unix(dateTime.dt).format();
  const offset = dateTime?.offset;
  const currentTime = momenttz.tz(time, offset);

  // border-[hsla(214,34%,38%,1)] dark:border-dark100

  return (
    <div className="relative flex justify-between items-center gap-x-6 h-full">
      <span className="flex z-30 font-light text-sm text-gray-200 w-16 items-center h-full whitespace-pre">
        {isLoading ? (
          <div className="w-full my-auto h-2 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />
        ) : (
          <span>{currentTime.format('h A')}</span>
        )}
      </span>
      <div className="relative flex items-center w-full h-full">
        {!isLoading && currentForecast && (
          <div className=" bg-[#8cb2fb] h-6 z-30 rounded-xl" style={{ width: percent && percent }} />
        )}

        <div
          className={`absolute left-0 top-1 bg-[hsl(212,37%,24%)] 
           rounded-xl z-0 w-full h-6 ${isLoading && 'animate-pulse'}`}
        />
      </div>
      <span className="flex items-center font-light text-sm text-gray-200 w-16 h-full">
        {isLoading ? (
          <div className="w-full my-auto h-2 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />
        ) : (
          percent
        )}
      </span>
    </div>
  );
}

export function RainChance() {
  const items = useSelector((state) => state.weather?.forecasts?.hourly);
  const timezone = useSelector((state) => state.weather?.forecasts?.timezone);
  return (
    <div className="relative flex flex-col gap-y-6">
      <h1 className="text-white">Chance Of Rain</h1>
      <div className="w-full h-full">
        <div className="flex flex-col justify-between min-h-full gap-y-4 h-44">
          <Chart
            percent={`${items && Math.floor(items[0].pop * 100)}%`}
            dateTime={{ dt: items && items[0].dt, offset: timezone && timezone }}
          />
          <Chart
            percent={`${items && Math.floor(items[3].pop * 100)}%`}
            dateTime={{ dt: items && items[3].dt, offset: timezone && timezone }}
          />
          <Chart
            percent={`${items && Math.floor(items[6].pop * 100)}%`}
            dateTime={{ dt: items && items[6].dt, offset: timezone && timezone }}
          />
          <Chart
            percent={`${items && Math.floor(items[9].pop * 100)}%`}
            dateTime={{ dt: items && items[9].dt, offset: timezone && timezone }}
          />
        </div>
      </div>
    </div>
  );
}
