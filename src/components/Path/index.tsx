import { scaleLinear } from "d3-scale";
import { path } from "d3-path";
import { extent } from "d3-array";
import { FC } from "react";
import { Target, Transition, motion } from "framer-motion";
interface PathProps {
  width: number;
  height: number;
  points?: any[];
  close?: boolean;
  pathStyle?: any;
}

const Path: FC<PathProps> = ({
  width,
  height,
  points = [
    { x: 0, y: 0 },
    { x: 7, y: 13 },
    { x: 10, y: 9 },
  ],
  close = false,
  pathStyle = {},
}) => {
  const xScale = scaleLinear()
    .domain(extent(points, (p) => p.x) as [number, number])
    .range([0, width]);
  const yScale = scaleLinear()
    .domain(extent(points, (p) => p.y) as [number, number])
    .range([height, 0]);
  const p = path();
  let cpx = 0,
    cpy = 0;
  for (let i = 0; i < points.length; i++) {
    if (i == 0) {
      cpx = xScale(points[i].x);
      cpy = yScale(points[i].y);
      p.moveTo(cpx, cpy);
    } else {
      const x = xScale(points[i].x),
        y = yScale(points[i].y);
      p.quadraticCurveTo(cpx, cpy, x, y);
      (cpx = x), (cpy = y);
    }
    if (close && i == points.length - 1) {
      p.closePath();
    }
  }
  const initial = {
    rotate: 0,
    scale: 0,
  } as Target;
  const animate = {
    // rotate: 45,
    scale: 1,
  };
  const transition = {
    type: "spring",
    duration: 5,
  } as Transition;
  return (
    <svg width={width} height={height}>
      <motion.path
        initial={initial}
        animate={animate}
        transition={transition}
        exit={{scaleY: 0}}
        style={{ transformOrigin: "start" }}
        {...pathStyle}
        d={p.toString()}
      >
      </motion.path>
    </svg>
  );
};

export default Path;
