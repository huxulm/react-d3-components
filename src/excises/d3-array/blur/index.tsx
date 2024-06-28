import { FC, useCallback } from "react";

import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import { line, curveBasis } from "d3-shape";
import { motion } from "framer-motion";

export interface BlurProps {
  height?: number;
  width?: number;
  data?: Float64Array;
  blurred?: Float64Array;
}
const Blur: FC<BlurProps> = (props) => {
  const {
    width = 800,
    height = 200,
    data = new Float64Array(),
    blurred = new Float64Array(),
  } = props;
  const xScale = scaleLinear().domain([0, data.length]).range([0, width]);
  const yScale = scaleLinear()
    .domain(extent(data, (v) => v) as [number, number])
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
      <motion.path
        d={getPath(data) as string}
        stroke="red"
        fill="none"
        className="p1"
      />
      <motion.path
        d={getPath(blurred) as string}
        stroke="orange"
        fill="none"
        className="p2"
      />
    </svg>
  );
};

export default Blur;
