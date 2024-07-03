import { motion, Variants } from "framer-motion";

const variants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      pathLength: {
        type: "spring",
        duration: 2,
        repeat: Infinity,
      },
    },
  },
} as Variants;
export const Logo = (props: any) => {
  return (
    <motion.svg
      viewBox={"0 0 200 200"}
      initial="hidden"
      animate="visible"
      {...props}
    >
      <motion.path
        stroke={"red"}
        fill={"none"}
        d="M 130.79539,98.634696 C 130.45844,118.36155 125.24087,142.04801 106.65344,152.44448 86.776493,161.57084 69.891829,137.35462 67.188158,120.01983 61.49704,93.879907 64.338239,57.144457 91.283361,43.82642 c 21.329759,-5.893777 34.484659,18.620478 37.603059,36.09452 1.29025,6.148273 1.90675,12.433257 1.90897,18.713756 z m 9.51588,-0.440605 c -0.23258,22.755649 -6.99662,48.504159 -26.85132,61.916899 -21.26826,14.26543 -47.097389,-7.18731 -52.444767,-28.62024 -10.9324,-31.87702 -7.552905,-75.28083 22.26742,-95.873906 21.188657,-12.871502 43.920027,7.109378 50.413437,26.894759 4.54983,11.300371 6.59699,23.527215 6.61523,35.682488 z"
        transform="translate(0.73062725,-2.1918819)"
        variants={variants}
      />
    </motion.svg>
  );
};
