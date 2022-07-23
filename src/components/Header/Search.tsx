import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { CityModel } from '@/types';

interface ISearch {
  value: string;
  handleReset: () => void;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => Promise<void>;
  toggle: boolean;
  setToggle: () => void;
  items: CityModel[];
  handleSelect: (lat: number, lon: number) => Promise<void>;
}

export function Search({ value, handleReset, handleChange, setToggle, toggle, items, handleSelect }: ISearch) {
  return (
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
        placeholder="Search location here"
        className={`w-full bg-gray-50 text-gray-600 px-0 lg:px-11 py-3 pl-10 outline-none placeholder:text-sm ${
          toggle ? 'rounded-t' : 'rounded'
        }`}
        value={value}
        onFocus={setToggle}
        onBlur={setToggle}
      />
      {toggle && (
        <ul className="absolute bg-gray-50 w-full rounded-b -mt-0.8">
          {items?.map((item, id) => (
            <li
              key={id}
              className="flex items-center gap-x-4 px-3 py-1.5 relative cursor-pointer "
              onMouseDown={() => handleSelect(item.lat, item.lon)}
              aria-hidden
            >
              <FaMapMarkerAlt className="text-gray-400  w-4 h-4" />

              <span className="text-gray-600 text-sm font-light">
                {item.name}
                {item.state && `, ${item.state}`}
                {item.country && `, ${item.country}`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
