import moment from 'moment';
import momenttz from 'moment-timezone';
import { Loader } from '@/components/Element/Loader';

export const getSunStatus = (status: number, time: string, isLoading: boolean, offset: string) => {
  if (status && time === 'when') {
    if (isLoading) {
      return <Loader type="SunCard" />;
    }

    const formatUnix = moment.unix(status).format();
    const formattedTime = momenttz.tz(formatUnix, offset);
    return formattedTime.format('LT');
  }

  if (status && time === 'calendar') {
    if (isLoading) {
      return <Loader type="SunCard" />;
    }
    const formatUnix = moment.unix(status).format();
    const formattedTime = momenttz.tz(formatUnix, offset);
    return formattedTime.fromNow();
  }

  return <div className="w-full my-auto h-2 bg-gray-500 bg-opacity-20 rounded-full animate-pulse" />;
};
