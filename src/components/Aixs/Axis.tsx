import { motion } from "framer-motion";
import { FC, ReactElement, useMemo } from "react";
import { AxisLine, AxisLineProps } from "./AxisLine";
import { CloneElement } from "@/utils/CloneElement";

export interface AxisProps {
  label?: string;
  domain?: Iterable<number | string | Date>;
  width?: number;
  height?: number;
  position?: "start" | "end" | "center";
  orientation?: "horizontal" | "vertical";
  className?: string;
  axisLine?: ReactElement<AxisLineProps, typeof AxisLine>;
}

export const Axis: FC<AxisProps> = ({
  className,
  orientation,
  position = "end",
  width = 0,
  height = 0,
  axisLine,
}) => {
  // compute translate
  const [translateX, translateY] = useMemo(() => {
    let translateX = 0,
      translateY = 0;
    if (orientation === "horizontal") {
      if (position === "end") {
        translateY = height;
      } else if (position == "center") {
        translateY = height / 2;
      }
    } else {
      if (position === "end") {
        translateX = width;
      } else if (position == "center") {
        translateX = width / 2;
      }
    }
    return [translateX, translateY];
  }, [width, height]);
  return (
    <motion.g
      className={className}
      transform={`translate(${translateX}, ${translateY})`}
    >
      {axisLine && (
        <CloneElement<AxisLineProps>
          element={axisLine}
          width={width}
          height={height}
          orientation={orientation}
        ></CloneElement>
      )}
    </motion.g>
  );
};
