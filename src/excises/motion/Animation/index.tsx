import { AnimationProps, DraggableProps, TapHandlers, motion } from "framer-motion";
import { FC } from "react";

export type AnimationDivProps = AnimationProps & DraggableProps & TapHandlers & {
  className?: string;
  whileHover?: any;
  whileTap?: any;
};

export const AnimationDiv: FC<AnimationDivProps> = ({ className, ...rest }) => (
  <>
    <style>
      {`
      .box {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: blue;
      }
    `}
    </style>
    <motion.div className={className} {...rest}  drag />
  </>
);
