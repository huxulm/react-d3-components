import { MotionProps, motion } from "framer-motion";
export const KeyFrames = (props: MotionProps) => {
  return (
    <motion.div
      className="box-keyframes"
      {...props}
    />
  );
};
