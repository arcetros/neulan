type Temps = {
  lowest: number;
  highest: number;
  units?: string;
}[];

function difference(patokan: number, temp: number, isMetric: RegExpMatchArray | null) {
  const current = Math.abs(patokan - temp);
  const total = patokan + current;
  const diff = Math.floor((current / total) * (isMetric ? 100 : 152));
  if (temp < patokan) {
    if (diff > 100) {
      return (100 / diff) * diff;
    }
    return diff;
  }
  if (temp > patokan) {
    if (diff > 100) {
      return (100 / diff) * diff;
    }
    return diff;
  }
  return 0;
}

export function getTempsPercent(lowest: number, highest: number, units: string): Temps {
  const isMetric = units.match(/metric/i);

  if (isMetric ? lowest < 20 : lowest < 68) {
    if (isMetric ? lowest < 20 : lowest < 68) {
      return [{ lowest: difference(isMetric ? 20 : 68, lowest, isMetric), highest: 0 }];
    }
    return [
      {
        lowest: difference(isMetric ? 20 : 68, lowest, isMetric),
        highest: difference(isMetric ? 20 : 68, highest, isMetric),
      },
    ];
  }
  if (isMetric ? lowest > 20 : lowest > 68) {
    return [{ lowest: 0, highest: difference(isMetric ? 20 : 68, highest, isMetric) }];
  }
  return [{ highest: 0, lowest: 0 }];
}
