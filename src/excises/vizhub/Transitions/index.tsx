import { useEffect, useRef, useState } from "react";
import { main } from "./viz";

export const TransitionWithD3 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState([
    { id: 1, x: 155, y: 384, r: 20, fill: "#0000FF" },
    { id: 2, x: 340, y: 414, r: 52, fill: "#FF0AAE" },
    { id: 4, x: 514, y: 304, r: 147, fill: "#7300FF" },
    { id: 3, x: 531, y: 142, r: 176, fill: "#00E1FF" },
    { id: 5, x: 781, y: 91, r: 61, fill: "#0FFB33" },
    { id: 6, x: 668, y: 207, r: 64, fill: "#D400FF" },
  ]);
  useEffect(() => main(ref, data), [ref, data]);
  const update = () => {
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
  };
  return (
    <>
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
      <div ref={ref} style={{ width: "100vw", height: "100vh" }}>
        <div className="transition-ctrl">
          <button onClick={update}>update data</button>
        </div>
      </div>
    </>
  );
};
