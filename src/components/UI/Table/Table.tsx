import React from 'react';

interface ITable {
  children: React.ReactNode;
  active: Boolean;
}

export default function Table({ children, active }: ITable) {
  return active && <div className="flex flex-col gap-y-2 mt-4 w-full">{children}</div>;
}
