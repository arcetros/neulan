import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { useDispatch, useSelector } from '../store';
import { fetchCity, fetchWeather, fetchForecast } from '../store/weather-actions';
import useDebounce from '../hooks/useDebounce';
import useToggle from '../hooks/useToggle';
import { SelectedCity } from '../types';
import { weatherActions } from '../store/weather-slice';

export default function Header() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [toggle, setToggle] = useToggle(false);
  const debounce = useDebounce(value, 500);
  const didMountRef = useRef(false);
  const items = useSelector((state) => state.weather.cities);

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

  const handleSelect = async (lat: number, lon: number, item: SelectedCity) => {
    await dispatch(fetchWeather(lat, lon));
    await dispatch(fetchForecast(lat, lon));
    dispatch(weatherActions.selectCity(item));
    handleReset();
  };

  useEffect(() => {
    if (didMountRef.current) {
      dispatch(fetchCity(value));
    }
    didMountRef.current = true;
  }, [debounce]);

  return (
    <header className="z-30">
      <div className="flex flex-col gap-x-4">
        <div className="relative w-full">
          <FiSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 w-5 h-auto text-gray-400" />
          {value && (
            <HiX
              className="absolute top-1/2 transform -translate-y-1/2 right-3 w-5 h-auto text-gray-400 cursor-pointer"
              onClick={handleReset}
            />
          )}
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search new place"
            className={`w-full bg-[#1f114c] text-gray-200 px-0 lg:px-11 py-3 pl-10 outline-none placeholder:text-sm ${
              toggle ? 'rounded-t-xl' : 'rounded-xl'
            }`}
            value={value}
            onFocus={setToggle}
            onBlur={setToggle}
          />
          {toggle && (
            <ul className="absolute bg-[#1f114c] w-full rounded-b-xl -mt-0.8">
              {items?.map((item, id) => (
                <li
                  key={id}
                  className="flex items-center gap-x-4 px-3 py-1.5 relative cursor-pointer "
                  onMouseDown={() => handleSelect(item.lat, item.lon, item)}
                  aria-hidden
                >
                  <FaMapMarkerAlt className="text-gray-400  w-4 h-4" />

                  <span className="text-gray-200 text-sm font-light">
                    {item.name}
                    {item.state && `, ${item.state}`}
                    {item.country && `, ${item.country}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
