/* eslint-disable react/button-has-type */
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
  recent: any[];
  handleSelect: (lat: number, lon: number, name: string) => Promise<void>;
  removeLocalEntries: () => void;
}

export function Search({
  value,
  handleReset,
  handleChange,
  setToggle,
  toggle,
  items,
  handleSelect,
  recent,
  removeLocalEntries,
}: ISearch) {
  return (
    <div className="relative w-full font-light">
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
        placeholder="Search location"
        className={`font-light w-full bg-gray-50 dark:bg-dark300 text-gray-600 dark:text-gray-200 px-0 lg:px-11 py-3 pl-10 outline-none placeholder:text-sm ${
          toggle ? 'rounded-t' : 'rounded'
        }`}
        value={value}
        onFocus={setToggle}
        onBlur={setToggle}
      />
      {toggle && (
        <ul className="absolute bg-gray-50 dark:bg-dark300 w-full rounded-b -mt-0.8 shadow">
          {items?.map((item, id) => (
            <li
              key={id}
              className="flex items-center gap-x-4 px-3 py-1.5 relative cursor-pointer "
              onMouseDown={() =>
                handleSelect(item.lat, item.lon, `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`)
              }
              aria-hidden
            >
              <FaMapMarkerAlt className="text-gray-400 dark:text-100 w-4 h-4" />

              <span className="text-gray-600 dark:text-gray-300 text-sm font-light">
                {item.name}
                {item.state && `, ${item.state}`}
                {item.country && `, ${item.country}`}
              </span>
            </li>
          ))}
          <div className="px-3 mt-3">
            <h1 className="text-gray-400 dark:text-100 mb-2">Your recent search</h1>
            {recent &&
              recent
                .slice(-5)
                .reverse()
                .map((item, id) => (
                  <li
                    className="flex items-center gap-x-4 py-1.5 relative cursor-pointer"
                    key={id}
                    onMouseDown={() => handleSelect(item.lat, item.lon, item.name)}
                    aria-hidden
                  >
                    <FaMapMarkerAlt className="text-gray-400 dark:text-100 w-4 h-4" />

                    <span className="text-gray-600 dark:text-gray-300 text-sm font-light">{item.name}</span>
                  </li>
                ))}
            <button
              className="float-right my-2 text-gray-600 dark:text-gray-300 hover:underline text-sm cursor-pointer z-50"
              onMouseDown={() => removeLocalEntries()}
              aria-hidden
            >
              Clear search history
            </button>
          </div>
        </ul>
      )}
    </div>
  );
}
