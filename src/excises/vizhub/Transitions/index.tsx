import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { main } from "./viz";

const initial = [
  { id: 1, x: 155, y: 384, r: 20, fill: "#0000FF" },
  { id: 2, x: 340, y: 414, r: 52, fill: "#FF0AAE" },
  { id: 4, x: 514, y: 304, r: 147, fill: "#7300FF" },
  { id: 3, x: 531, y: 142, r: 176, fill: "#00E1FF" },
  { id: 5, x: 781, y: 91, r: 61, fill: "#0FFB33" },
  { id: 6, x: 668, y: 207, r: 64, fill: "#D400FF" },
];

const updateFn =
  (
    ref: RefObject<HTMLElement>,
    setData: Dispatch<SetStateAction<typeof initial>>,
    setDelay?: Dispatch<SetStateAction<number>>
  ) =>
  () => {
    if (!ref.current) {
      return;
    }
    const w = ref.current.clientWidth as number;
    const h = ref.current.clientHeight as number;
    setData((prev) =>
      [...prev].map((d) => ({
        ...d,
        r: Math.random() * (w / 10),
        y: Math.random() * h,
        x: Math.random() * w,
      }))
    );
    if (setDelay) {
      setDelay((prev) => (prev == 0.2 ? prev / 10 : prev));
    }
  };

const Styles = () => (
  <style>
    {`
          .transition-ctrl {
              padding: 1rem;
              position: absolute;
              top: 0;
              left: 0;
          }
      `}
  </style>
);
export const TransitionWithD3 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(initial);
  useEffect(() => main(ref, data), [ref, data]);
  const update = useMemo(() => updateFn(ref, setData), [ref, setData]);
  return (
    <>
      <Styles />
      <div ref={ref} style={{ width: "100vw", height: "100vh" }}>
        <div className="transition-ctrl">
          <button onClick={update}>update data</button>
        </div>
      </div>
    </>
  );
};

export const Transition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(initial);
  const [delay, setDelay] = useState(0.2); // initial delay
  const update = useMemo(() => updateFn(ref, setData, setDelay), [ref]);
  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref}>
      <Styles />
      <div className="transition-ctrl">
        <button onClick={update}>update</button>
      </div>
      <svg width={"100%"} height={"100%"}>
        {data.map((d, i) => {
          return (
            <motion.circle
              initial={{ fill: d.fill, r: 0, opacity: 0, cx: d.x, cy: d.y }}
              animate={{
                cx: d.x,
                cy: d.y,
                r: d.r,
                fill: d.fill,
                opacity: 708 / 1000,
              }}
              transition={{
                type: "tween",
                duration: delay == 0.2 ? 2 : 0.5,
                delay: i * delay,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};
