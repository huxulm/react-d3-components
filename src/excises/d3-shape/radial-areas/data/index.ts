import { rollup, mean, min, max, ascending } from "d3-array";
import { autoType } from "d3-dsv";
// @ts-ignore
import raw from "./sfo-temperature.csv";

export interface DataShape {
    date: Date;
    avg: number;
    min: number;
    max: number;
    minmin: number;
    maxmax: number;
}

const data = Array.from(rollup(
    raw.map(autoType), 
    (v: any[]) => ({
      date: new Date(Date.UTC(2000, v[0].DATE.getUTCMonth(), v[0].DATE.getUTCDate())),
      avg: mean(v, d => d.TAVG || NaN),
      min: mean(v, d => d.TMIN || NaN),
      max: mean(v, d => d.TMAX || NaN),
      minmin: min(v, d => d.TMIN || NaN),
      maxmax: max(v, d => d.TMAX || NaN)
    }), 
    d => `${d.DATE.getUTCMonth()}-${d.DATE.getUTCDate()}`
  ).values())
    .sort((a, b) => ascending(a.date, b.date)) as DataShape[]

export { data };
