import React from 'react';
import { useSelector } from '../../store';
import Weekly from '../Weekly';

function DetailedInfo() {
  const { forecasts } = useSelector((state) => state.weather);

  return (
    <div className="min-h-[400px] mx-2 md:mx-8">
      <Weekly items={forecasts && forecasts} />
    </div>
  );
}

export default DetailedInfo;
