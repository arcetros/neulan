import React from 'react';

interface IHeading {
  children: React.ReactNode;
}

export default function Header({ children }: IHeading) {
  return <h1 className="font-thin text-2xl md:text-4xl text-gray-700">{children}</h1>;
}
