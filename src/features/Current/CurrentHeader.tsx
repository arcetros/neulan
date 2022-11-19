import moment from 'moment';
import momenttz from 'moment-timezone';
import { Loader } from '@components/Element/Loader';

import { getName } from 'country-list';
import { CurrentWeather } from 'type/forecast';

interface ICurrentHeader {
  isRequested: boolean;
  data: CurrentWeather;
  offset: string;
}

function CurrentHeader({ isRequested, data, offset }: ICurrentHeader) {
  const now = moment();
  const currentDate = momenttz.tz(now, offset);

  return (
    <div className="flex items-center gap-x-4">
      <div className={`flex flex-col w-[70%] ${isRequested && 'gap-y-8'} `}>
        <span className="text-xl md:text-2xl text-gray-200">{isRequested ? <Loader type="Name" /> : data?.name}</span>

        <span className="text-sm md:text-base text-gray-300 font-thin">
          {isRequested ? <Loader type="Country" /> : data && getName(data?.sys?.country)}
        </span>
      </div>
      <span className="text-right text-lg md:text-xl text-gray-200 w-[30%]">
        {isRequested ? <Loader type="Date" /> : data && currentDate.format('HH:mm A')}
      </span>
    </div>
  );
}

export default CurrentHeader;
