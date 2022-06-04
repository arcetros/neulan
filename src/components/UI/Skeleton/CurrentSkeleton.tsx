import React from 'react';

export function Date() {
  return (
    <>
      <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-lg" />
      <div className="flex flex-col gap-y-1 w-24">
        <div className="h-1 w-24 bg-gray-300 animate-pulse" />
        <div className="h-1 w-8 bg-gray-300 animate-pulse" />
      </div>
    </>
  );
}

export function Temperature() {
  return (
    <>
      <div className="w-24 h-24 bg-gray-300 rounded-lg animate-pulse" />
      <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse" />
    </>
  );
}

export function Location() {
  return (
    <>
      <div className="flex justify-center gap-x-1 w-full mt-4">
        <div className="w-12 h-1 bg-gray-300 rounded-lg animate-pulse" />
        <div className="w-24 h-1 bg-gray-300 rounded-lg animate-pulse" />
      </div>
      <div className="flex justify-center gap-x-1 w-full mt-4">
        <div className="w-36 h-1 bg-gray-300 rounded-lg animate-pulse" />
        <div className="w-36 h-1 bg-gray-300 rounded-lg animate-pulse" />
      </div>
    </>
  );
}
