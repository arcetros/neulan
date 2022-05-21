import React from 'react';

interface ITableCell {
  children: React.ReactNode;
}

export default function TableRow({ children }: ITableCell) {
  return <tr className="h-16 border border-gray-1 hover:bg-gray-100">{children}</tr>;
}
