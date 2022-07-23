import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import momenttz from 'moment-timezone';
import { useDispatch, useSelector, store } from '@/store';
import { fetchCity, fetchForecast } from '@/store/weather-actions';
import { useDebounce, useToggle } from '@/hooks';
import { Search } from './Search';
import { Loader } from '@/components/Element/Loader';

export function Header() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [toggle, setToggle] = useToggle(false);
  const debounce = useDebounce(value, 500);
  const didMountRef = useRef(false);
  const { cities, isRequested, forecasts } = useSelector((state) => state.weather);

  const handleChange = async (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) {
      setValue(event.currentTarget.value);
    } else {
      setValue('');
    }
  };

  const handleReset = () => {
    setValue('');
  };

  const handleSelect = async (lat: number, lon: number) => {
    await dispatch(fetchForecast(lat, lon, store.getState().weather.units));
    handleReset();
  };

  useEffect(() => {
    if (didMountRef.current) {
      dispatch(fetchCity(value));
    }
    didMountRef.current = true;
  }, [debounce]);

  const now = moment();
  const offset = forecasts?.timezone;
  const currentDate = momenttz.tz(now, offset);

  return (
    <header className="w-full p-8 lg:px-16 gap-y-4 gap-x-4 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray bg-white">
      <div className="w-1/3">
        {isRequested ? (
          <Loader type="MainDate" />
        ) : (
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-gray-700">{currentDate.format('MMMM YYYY')}</span>
            <span className="text-sm md:text-base text-gray-500">{currentDate.format('dddd, MMM DD, YYYY')}</span>
          </div>
        )}
      </div>
      <div className="z-30 w-full md:w-2/3">
        <div className="flex flex-col gap-x-4">
          <Search
            value={value}
            handleReset={handleReset}
            handleChange={handleChange}
            setToggle={setToggle}
            toggle={toggle}
            items={cities}
            handleSelect={handleSelect}
          />
        </div>
      </div>
    </header>
  );
}
