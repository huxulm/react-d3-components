import { useEffect, useState } from "react";
import { star, heart, hand, plane, lightning, note } from "./paths";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { schemeCategory10 } from "d3";

import { interpolate } from "flubber";
// import { interpolatePath as interpolate } from "d3-interpolate-path"
// import { interpolate } from "d3-interpolate"

const getIndex = (_: any, index: number) => index;
const paths = [star, heart, hand, plane, lightning, note];
const colors = schemeCategory10.slice(0, paths.length);
export const MotionPath = (props: any) => {
  const { height = 500, width = 500 } = props;
  const [pathIndex, setPathIndex] = useState<number>(0);
  const progress = useMotionValue(pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  const d = useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, {maxSegmentLength: 0.1}),
  });

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 1,
      ease: "easeInOut",
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          progress.set(0);
          setPathIndex(1);
        } else {
          setPathIndex(pathIndex + 1);
        }
      },
    });

    return () => animation.stop();
  }, [pathIndex, progress]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g transform="scale(10 10)">
        <motion.path d={d} fill={fill} />
      </g>
    </svg>
  );
};
