import { useCallback, useEffect, useMemo, useRef } from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { viz } from "./viz";
import { DataShape } from "./data";
interface VizWrapperProps {
  width: number;
  height: number;
  data?: DataShape[][];
}
export const VizWrapper = ({ width, height, data = [] }: VizWrapperProps) => {
  const ref = useRef<SVGSVGElement>(null);
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
    viz(ref, width, height, radius / 8, radius, data, getDountScale, 12);
  }, [width, height]);
  return <svg width={width} height={height} ref={ref} />;
};
