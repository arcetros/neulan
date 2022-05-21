import React from 'react';

interface ITableCell {
  children: React.ReactNode;
  align?: string;
  className?: string;
}

export default function TableCell({ children, align, className }: ITableCell) {
  return (
    <th
      className={`font-medium text-gray-500 table-cell w-2/12 px-4 ${
        align === 'right' ? 'cell-right' : 'cell-left'
      } ${className}`}
    >
      {children}
    </th>
  );
}
