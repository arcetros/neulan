import React, { MouseEventHandler } from 'react';

interface ITab {
  children: React.ReactNode;
  onClick: MouseEventHandler;
  active: Boolean;
}

export default function Tab({ children, active, onClick }: ITab) {
  return (
    <span
      className={`relative flex flex-col text-sm md:text-lg cursor-pointer font-primary text-gray-700 font-normal capitalize opacity-50 pointer ${
        active && 'opacity-100'
      }`}
      onClick={onClick}
      aria-hidden
    >
      {children}
      {active && <div className="absolute w-full -bottom-1 h-1 mt-1 bg-primary" />}
    </span>
  );
}
