import { SVGMotionProps, Variants, motion } from "framer-motion";
import { useId } from "react";
type TextLogoProps = {
  width?: number | string;
  height?: number | string;
  spring?: boolean;
  duration?: number;
  g?: SVGMotionProps<SVGGElement> & { colors?: string[] };
  t1?: SVGMotionProps<SVGEllipseElement>;
  t2?: SVGMotionProps<SVGEllipseElement>;
  line1?: SVGMotionProps<SVGEllipseElement>;
  line2?: SVGMotionProps<SVGEllipseElement>;
};

const variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (v) => {
    const { delay, duration } = v;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        opacity: { delay, duration: 0.01 },
        pathLength: {
          type: "tween",
          delay: delay,
          duration,
        },
      },
    };
  },
} as Variants;
export const TextLogo = (props: TextLogoProps) => {
  const { duration: total = 3 } = props;
  const step = total / 3.5;
  const maskId = useId();
  const bgId = useId();
  return (
    <>
      <motion.svg
        {...props}
        viewBox={`0 0 300 100`}
        custom={{ delay: 0, duration: 15 }}
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id={bgId} x1="0%" y1="50%" x2="100%" y2="50%">
            {props.g?.colors &&
              props.g.colors.map((c, i) => (
                <stop
                  offset={`${Math.ceil((i * 100) / props.g!.colors!.length)}%`}
                  stopColor={c}
                  stopOpacity={1}
                />
              ))}
          </linearGradient>
        </defs>
        <motion.mask id={maskId}>
          <motion.g
            style={{ ...props.g?.style }}
            initial={{ strokeLinecap: "round" }}
          >
            <motion.ellipse
              key={"char_1"}
              initial={props.t1!.initial}
              variants={variants}
              custom={{ delay: 0, duration: step }}
            />
            <motion.path
              variants={variants}
              custom={{ delay: step * 0.75, duration: step * 0.25 }}
              d="M 60,60 l25,25"
            />
            <motion.path
              d="M 120,10 H180"
              variants={variants}
              custom={{ delay: step * 1, duration: step * 0.5 }}
            />
            <motion.path
              variants={variants}
              custom={{ delay: step * 1.5, duration: step * 0.5 }}
              d="M 150,10 V90"
            />
            <motion.path
              variants={variants}
              custom={{ delay: step * 2, duration: step * 0.5 }}
              d="M 220,10 H280"
            />
            <motion.path
              variants={variants}
              custom={{ delay: step * 2.5, duration: step * 0.5 }}
              d="M 250,10 V90"
            />
          </motion.g>
        </motion.mask>
        <motion.rect
          mask={`url(#${maskId})`}
          x={0}
          y={0}
          width={300}
          height={100}
          fill={`url(#${bgId})`}
        />
      </motion.svg>
    </>
  );
};
