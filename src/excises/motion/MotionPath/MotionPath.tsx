import { MotionProps, motion } from "framer-motion";
type MotionPathProps = MotionProps;
export const MotionPath = (props: MotionPathProps) => {
  return <motion.path {...props} />;
};
