import { motion } from "framer-motion";
import { FC } from "react";

export interface AxisLineProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: string;
  orientation?: "horizontal" | "vertical";
  width: number;
  height: number;
}

export const AxisLine: FC<Partial<AxisLineProps>> = ({ width, height, orientation, strokeColor = "#202f34", strokeWidth = 1 }) => {
  return (
    <motion.line
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      x1={0}
      y1={0}
      x2={orientation === "horizontal" ? width : 0}
      y2={orientation === "horizontal" ? 0 : height}
    />
  );
};
