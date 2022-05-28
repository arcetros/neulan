import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { useDispatch, useSelector } from '../store';
import { fetchCity, fetchWeather } from '../store/weather-actions';
import useDebounce from '../hooks/useDebounce';
import useToggle from '../hooks/useToggle';

export default function Header() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [toggle, setToggle] = useToggle(false);
  const debounce = useDebounce(value, 500);
  const didMountRef = useRef(false);
  const items = useSelector((state) => state.weather.all_cities);

  const handleChange = async (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) {
      setValue(event.currentTarget.value);
    } else {
      setValue('');
    }
  };

  const handleSelect = async (lat: number, lon: number) => {
    await dispatch(fetchWeather(lat, lon));
  };

  const handleReset = () => {
    setValue('');
  };

  // TODO: Change this to navigator.geolocation later or else use random params
  // for dispatch
  useEffect(() => {
    if (didMountRef.current) {
      dispatch(fetchCity(value));
    }
    didMountRef.current = true;
  }, [debounce]);

  return (
    <header className="z-30 pt-12 bg-secondary">
      <div className="flex flex-col gap-x-4">
        <div className="relative w-full md:w-96">
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
            className="w-full px-0 lg:px-11 py-3 pl-10 rounded-t-md outline-none placeholder:text-sm"
            value={value}
            onFocus={setToggle}
            onBlur={setToggle}
          />
        </div>
        {toggle && (
          <ul className="bg-white border border-gray-100 w-full rounded-b-lg mt-0.5">
            {items?.map((item, id) => (
              <li
                key={id}
                className="flex items-center gap-x-4 px-3 py-1.5 border-b-1 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                onMouseDown={() => handleSelect(item.lat, item.lon)}
                aria-hidden
              >
                <FaMapMarkerAlt className="text-gray-400  w-4 h-4" />

                <span className="text-gray-800 text-sm font-light">
                  {item.name}, {item.state}, {item.country}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
