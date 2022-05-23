import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from '../store';
import { fetchCity } from '../store/weather-actions';
import useDebounce from '../hooks/useDebounce';

export default function Header() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const debounce = useDebounce(value, 500);
  const didMountRef = useRef(false);
  const items = useSelector((state) => state.weather.all_cities);
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
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
    <header className="relative z-30 pt-12 bg-secondary">
      <div className="flex gap-x-4 items-center">
        <div className="relative w-full">
          <FiSearch
            className="absolute top-1/2 transform -translate-y-1/2 left-3 w-5 h-auto text-gray-400"
            onClick={() => console.log(items.map((item) => item.name))}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search new place"
            className="w-full lg:w-auto px-0 lg:px-16 py-3 pl-10 rounded-md outline-none placeholder:text-sm"
          />
        </div>
      </div>
    </header>
  );
}
