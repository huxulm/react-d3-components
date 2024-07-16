import { useCallback, useEffect, useMemo, useRef } from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { DountsSelection, transitionDounts, viz } from "./viz";
import { DataShape } from "./data";
interface VizWrapperProps {
  width: number;
  height: number;
  updateDuration: number;
  data?: DataShape[][];
  init?: boolean;
  curve: any;
}
export const VizWrapper = ({ width, height, data = [], init = true, updateDuration, curve }: VizWrapperProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const refDountsSelection = useRef<DountsSelection | null>(null);
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius / 8;
  const outerRadius = radius;

  const rScale = useMemo(() => {
    return scaleLinear()
      .domain([0, data.length])
      .range([innerRadius, outerRadius]);
  }, [width, height, data]);

  const getDountScale = useCallback(
    (i: number) => {
      return scaleLinear()
        .range([rScale(i), rScale(i + 1)])
        .domain(extent(data[i], (d) => d.value) as Iterable<number>);
    },
    [rScale]
  );

  useEffect(() => {
    if (!refDountsSelection.current) {
      refDountsSelection.current = viz(
        ref,
        width,
        height,
        innerRadius,
        outerRadius,
        data,
        getDountScale,
        12
      );
    }
  }, [width, height, data]);
  useEffect(() => {
    if (refDountsSelection.current && !init) {
      transitionDounts(refDountsSelection.current, data, getDountScale, updateDuration, curve);
    }
  }, [data, init, updateDuration]);
  return <svg width={width} height={height} ref={ref} />;
};
