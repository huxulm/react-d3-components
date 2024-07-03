import {
  Variant,
  Variants,
  motion
} from "framer-motion";
const variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
    fill: "none",
  },
  visible: (v) => {
    const delay = 1 + v * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      fill: "none",
      strokeWidth: 10,
      stroke: "black",
      strokeLinecap: "round",
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    } as Variant;
  },
} as Variants;
export const LineDrawExample = (props: any) => {
  return (
    <>
      <motion.svg
        {...props}
        viewBox={"0 0 200 200"}
        initial="hidden"
        animate="visible"
      >
        <motion.circle cx={50} cy={50} r={40} custom={0} variants={variants} />
        <motion.circle cx={50} cy={150} r={40} custom={1} variants={variants} />
        <motion.rect
          x={110}
          y={10}
          rx={5}
          width={80}
          height={80}
          variants={variants}
          custom={2}
        />
        <motion.rect
          x={110}
          y={110}
          rx={5}
          width={80}
          height={80}
          variants={variants}
          custom={3}
        />
      </motion.svg>
    </>
  );
};
