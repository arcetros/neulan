import moment from 'moment';
import momenttz from 'moment-timezone';

export function getLocalTime(dateTime: number, timezone: string) {
  const time = moment.unix(dateTime).format();
  const currentTime = momenttz.tz(time, timezone);

  return currentTime;
}
