import React from 'react';

interface ILayout {
  children: React.ReactNode;
}

export function CurrentForecastLayout({ children }: ILayout) {
  return (
    <div className="order-first lg:order-last relative lg:sticky right-0 h-full w-full lg:w-[25rem] bg-gradient-to-t from-[#0b2a63] via-[#0f2746] to-[#324968] overflow-y-hidden lg:overflow-y-auto">
      {children}
    </div>
  );
}

export function OverviewLayout({ children }: ILayout) {
  return (
    <div className="relative flex flex-col mx-auto w-full md:w-full lg:max-w-[120rem] overflow-x-hidden flex-1 justify-between">
      <main className="flex flex-col gap-y-8">{children}</main>
      <footer className="py-8">
        <span className="flex mx-auto justify-center items-center w-full">
          Powered by{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://openweathermap.org/api"
            className="flex items-center hover:underline cursor-pointer"
          >
            <img src="/openweathermap.png" alt="openweathermap" width={50} height={50} /> OpenWeatherMap
          </a>
        </span>
        <p className="text-center text-sm text-gray-500 mt-1">
          Made by arcetros —{' '}
          <a target="_blank" rel="noreferrer" href="https://github.com/arcetros/Neulan" className="underline">
            Github Repo
          </a>
        </p>
      </footer>
    </div>
  );
}
