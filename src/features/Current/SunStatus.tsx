import React from 'react';
import { WiSunset, WiSunrise } from 'react-icons/wi';

interface ISun {
  status: string;
  isWhen: string | React.ReactElement;
  isBeforeAfter: string | React.ReactElement;
}

export function SunStatus({ status, isWhen, isBeforeAfter }: ISun) {
  return (
    <div className="p-3 w-full flex items-center justify-between h-20 bg-[#2b4878] dark:bg-dark100 dark:bg-opacity-50 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
      {status === 'Sunset' ? (
        <WiSunset className="mr-2 w-12 h-12 text-gray-300" />
      ) : (
        <WiSunrise className="mr-2 w-12 h-12 text-gray-300" />
      )}
      <div className="mr-auto flex flex-col justify-evenly h-full">
        <span className="text-sm text-gray-200 font-light">{status}</span>
        <span className="text-base text-gray-200">{isWhen}</span>
      </div>
      <span className="text-gray-200 font-thin text-sm w-1/3 text-right">{isBeforeAfter}</span>
    </div>
  );
}
