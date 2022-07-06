import React from 'react';
import { useSelector } from '../../store';

interface ICard {
  children: React.ReactNode;
}

export default function Card({ children }: ICard) {
  const isLoading = useSelector((state) => state.weather?.isRequested);
  return (
    <div
      className={`bg-[#f8f7f7] px-8 w-full flex items-center justify-between h-24 rounded-md ${
        isLoading && 'animate-pulse'
      }`}
    >
      {!isLoading && children}
    </div>
  );
}
