import moment from 'moment';
import momenttz from 'moment-timezone';
import { Forecasts } from 'type';

interface IRainChart {
  percent: string;
  dateTime: { dt: number; offset: string };
  isRequested: boolean;
  currentForecast: Forecasts;
}

export function RainChart({ percent, dateTime, isRequested, currentForecast }: IRainChart) {
  const time = moment.unix(dateTime.dt).format();
  const offset = dateTime?.offset;
  const currentTime = momenttz.tz(time, offset);

  return (
    <div className="relative flex justify-between items-center gap-x-6 h-full">
      <span className="flex z-30 font-light text-sm text-gray-200 w-16 items-center h-full whitespace-pre">
        {isRequested ? (
          <div className="w-full my-auto h-2 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />
        ) : (
          <span>{currentTime.format('h A')}</span>
        )}
      </span>
      <div className="relative flex items-center w-full h-full">
        {!isRequested && currentForecast && (
          <div className=" bg-[#8cb2fb] h-6 z-30 rounded-xl" style={{ width: percent && percent }} />
        )}

        <div
          className={`absolute left-0 top-1 bg-[hsl(212,37%,24%)] 
           rounded-xl z-0 w-full h-6 ${isRequested && 'animate-pulse'}`}
        />
      </div>
      <span className="flex items-center font-light text-sm text-gray-200 w-16 h-full">
        {isRequested ? (
          <div className="w-full my-auto h-2 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />
        ) : (
          percent
        )}
      </span>
    </div>
  );
}
