import { FC, useCallback } from "react";

import { randomWalk, blurredWalk } from "./data";
import { curveBasis, extent, line, scaleLinear } from "d3";

interface BlurProps {
  height?: number;
  width?: number;
}
const Blur: FC<BlurProps> = (props) => {
  const { width = 800, height = 200 } = props;
  const xScale = scaleLinear().domain([0, randomWalk.length]).range([0, width]);
  const yScale = scaleLinear()
    .domain(extent(randomWalk, (v) => v) as [number, number])
    .range([height, 0]);
  const getPath = useCallback(
    (points: Float64Array) => {
      const l = line<number>(
        (_, index) => xScale(index),
        (v) => yScale(v)
      );
      return l.curve(curveBasis)(points);
    },
    [xScale, yScale]
  );
  return (
    <svg width={width} height={height}>
      <path d={getPath(randomWalk) as string} stroke="red" fill="none" className="p1"></path>
      <path d={getPath(blurredWalk) as string} stroke="orange" fill="none" className="p2"></path>
    </svg>
  );
};

export default Blur;
