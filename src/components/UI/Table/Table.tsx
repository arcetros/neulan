import React from 'react';

interface ITable {
  children: React.ReactNode;
  active: Boolean;
}

export default function Table({ children, active }: ITable) {
  return (
    active && (
      <div className="mt-4 overflow-auto">
        <table className="w-full whitespace-nowrap table-auto">
          <tbody className="block md:table-row-group overflow-y-auto w-screen">{children}</tbody>
        </table>
      </div>
    )
  );
}
