import React from 'react';

interface ISideLayout {
  children: React.ReactNode;
}

export function SideLayout({ children }: ISideLayout) {
  return (
    <div className="order-first lg:order-last relative lg:sticky right-0 h-full w-full lg:w-[25rem] bg-gradient-to-t from-[#0b2a63] via-[#0f2746] to-[#324968] overflow-y-hidden lg:overflow-y-auto">
      {children}
    </div>
  );
}
