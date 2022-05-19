import React, { MouseEventHandler } from 'react';

interface ITab {
  children: React.ReactNode;
  onClick: MouseEventHandler;
  active: Boolean;
}

export default function Tab({ children, active, onClick }: ITab) {
  return (
    <span
      className={`relative flex-col text-lg cursor-pointer font-primary text-gray-700 font-normal capitalize opacity-50 ${
        active && 'opacity-100'
      }`}
      onClick={onClick}
      aria-hidden
    >
      {children}
      {active && <div className="mx-auto w-2 h-2 mt-1 rounded-full bg-gray-700" />}
    </span>
  );
}
