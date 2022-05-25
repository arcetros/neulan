import React from 'react';

interface ITableCell {
  children: React.ReactNode;
}

export default function TableRow({ children }: ITableCell) {
  return (
    <div className="flex items-center justify-between h-24 border border-gray-1 hover:bg-gray-100 rounded-lg bg-slate-50">
      {children}
    </div>
  );
}
