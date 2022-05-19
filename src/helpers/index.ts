type Temps = {
  lowest: number;
  highest: number;
}[];

function difference(patokan: number, temp: number) {
  const current = Math.abs(patokan - temp);
  const total = patokan + current;
  const diff = Math.floor((current / total) * 150);
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

export default function getTemps(lowest: number, highest: number): Temps {
  if (lowest < 20) {
    if (highest < 20) {
      return [{ lowest: difference(20, lowest), highest: 0 }];
    }
    return [{ lowest: difference(20, lowest), highest: difference(20, highest) }];
  }
  if (lowest > 20) {
    return [{ lowest: 0, highest: difference(20, highest) }];
  }
  return [{ highest: 0, lowest: 0 }];
}
