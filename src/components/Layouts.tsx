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
    <div className="relative flex flex-col mx-auto w-full md:w-full lg:max-w-[120rem] overflow-x-hidden flex-1">
      <main className="flex flex-col gap-y-8">{children}</main>
    </div>
  );
}
