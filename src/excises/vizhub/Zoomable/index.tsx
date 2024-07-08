import { useEffect, useRef, useState, WheelEventHandler } from "react";
import { motion } from "framer-motion";
import { main, ZoomState } from "./viz";
import { data } from "@/excises/vizhub/Circles/data";

export const ZoomableD3 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ZoomState>({
    transform: "scale(1)",
  });
  useEffect(() => main(ref, { state, setState }), [ref, state]);
  return <div style={{ width: "100vw", height: "100vh" }} ref={ref} />;
};

export const Zoomable = () => {
  const [scale, setScale] = useState<number>(1);
  const onZoom: WheelEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault();
    setScale((prev) => prev + e.deltaY * -0.001);
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <svg
        onWheel={onZoom}
        width={"100%"}
        height={"100%"}
        style={{ background: "#F0FFF4", overscrollBehavior: "contain" }}
      >
        <motion.g
          drag
          dragMomentum={false}
          dragElastic={false}
          animate={{ scale }}
        >
          {data.map((d) => {
            return (
              <circle
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill={d.fill}
                opacity={708 / 1000}
              />
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};
