/* eslint-disable consistent-return */
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

  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recent_search') || '[]');
    if (recent) setRecentSearch(recent);
  }, [cities]);

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

  const addLocalEntry = (lat: number, lon: number, name: string) => {
    let existingEntries = JSON.parse(localStorage.getItem('recent_search') || '[]') || [];
    if (!(existingEntries instanceof Array)) existingEntries = [existingEntries];

    const entries = {
      lat,
      lon,
      units: store.getState().weather.units,
      name,
    };

    const entriesDuplicates = existingEntries.some((obj: typeof String) => obj.name === entries.name);

    if (!entriesDuplicates) {
      existingEntries.push(entries);
      return localStorage.setItem('recent_search', JSON.stringify(existingEntries));
    }

    const moveCurrentObject = existingEntries
      .filter((obj: any) => obj.name !== name)
      .concat(existingEntries.filter((obj: any) => obj.name === name));

    setRecentSearch(moveCurrentObject);

    return localStorage.setItem('recent_search', JSON.stringify(moveCurrentObject));
  };

  const removeLocalEntries = () => {
    localStorage.removeItem('recent_search');
    setRecentSearch([]);
  };

  const handleSelect = async (lat: number, lon: number, name: string) => {
    await dispatch(fetchForecast(lat, lon, store.getState().weather.units));
    addLocalEntry(lat, lon, name);
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
    <header className="mt-8 lg:mt-0 mx-2 lg:mx-0 rounded-xl lg:rounded-none p-8 lg:px-16 gap-y-4 gap-x-4 flex flex-col md:flex-row items-start md:items-center justify-between bg-white dark:bg-[#192734]">
      <div className="w-full lg:w-fit">
        {isRequested ? (
          <Loader type="MainDate" />
        ) : (
          <div className="flex flex-col">
            <span className="text-xl md:text-xl font-bold text-gray-700 dark:text-textDarkMain">
              {currentDate.format('MMMM YYYY')}
            </span>
            <span className="text-sm md:text-base text-gray-500 dark:text-textDarkSub">
              {currentDate.format('dddd, MMM DD, YYYY')}
            </span>
          </div>
        )}
      </div>
      <div className="z-30 w-full md:w-[340px]">
        <div className="flex flex-col gap-x-4">
          <Search
            value={value}
            recent={recentSearch}
            handleReset={handleReset}
            handleChange={handleChange}
            setToggle={setToggle}
            toggle={toggle}
            items={cities}
            handleSelect={handleSelect}
            removeLocalEntries={removeLocalEntries}
          />
        </div>
      </div>
    </header>
  );
}
