import { FC, useCallback, useEffect, useRef, useState } from "react";
import { VizWrapper } from "./VizWrapper";
import { Responsive } from "@/common/utils/responsive/Responsive";
import { dataFn, DataShape } from "./data";
import {
  curveBasis,
  curveBasisClosed,
  curveBundle,
  curveCardinal,
  curveCardinalClosed,
  curveCatmullRomClosed,
  curveLinearClosed,
  curveStep,
  curveStepAfter,
} from "d3-shape";

const easeFns = [
  curveBasis,
  curveBasisClosed,
  curveBundle,
  curveCardinal,
  curveCardinalClosed,
  curveCatmullRomClosed,
  curveLinearClosed,
  curveStep,
  curveStepAfter,
];

interface RadialProps {
  // Total number of dounts
  initDounts?: number;
  // Inner start dount
  initOffsetDount?: number;
}

const DefaultDataFetchDuration = 1000;

type RadialStatus = {
  init: boolean;
  data: DataShape[][];
  duration: number;
  curve: any;
};
export const Radial: FC<RadialProps> = ({
  initDounts,
  initOffsetDount,
}: RadialProps) => {
  const [dounts] = useState<number>(initDounts || 20);
  const [offsetDount] = useState<number>(initOffsetDount || 0);
  const [status, setStatus] = useState<RadialStatus>({
    init: true,
    duration: DefaultDataFetchDuration,
    curve: curveBasisClosed,
    data: dataFn(
      dounts,
      Array.from({ length: dounts }, (_, i) => 5 * i + 3),
      () => 0
    ),
  });

  const update = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      init: false,
      data: dataFn(
        dounts,
        Array.from({ length: dounts }, (_, i) => 5 * i + 3)
      ),
    }));
  }, [dounts]);

  const reset = () => {
    setStatus({
      init: false,
      duration: DefaultDataFetchDuration,
      curve: curveBasisClosed,
      data: dataFn(
        dounts,
        Array.from({ length: dounts }, (_, i) => 5 * i + 3),
        () => 0
      ),
    });
  };

  const ref = useRef<HTMLDivElement>(null);
  const [it, setIt] = useState(null);
  useEffect(() => {}, [dounts, offsetDount]);
  useEffect(() => {
    if (it) {
      clearInterval(it);
    }
    const t = setInterval(update, status.duration);
    setIt(it);
    return () => clearInterval(t);
  }, [status.duration]);
  const eases = [
    "curveBasis",
    "curveBasisClosed",
    "curveBundle",
    "curveCardinal",
    "curveCardinalClosed",
    "curveCatmullRomClosed",
    "curveLinearClosed",
    "curveStep",
    "curveStepAfter",
  ];

  return (
    <div ref={ref} style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <button onClick={update}>start randomize</button>
        <button onClick={reset}>reset</button>
        <label>
          <label>过渡时常</label>
          <input
            type="range"
            value={status.duration}
            min={0}
            max={2000}
            step={100}
            onChange={(e) =>
              setStatus({ ...status, duration: parseInt(e.target.value) })
            }
          />
          <label>{`${status.duration / 1000}s`}</label>
        </label>
        <label>
          <select
            onChange={(e) => {
              const i = parseInt(e.target.value);
              setStatus({ ...status, curve: easeFns[i] });
            }}
          >
            {eases.map((eas, i) => (
              <option value={i}>{eas}</option>
            ))}
          </select>
        </label>
      </div>
      <Responsive>
        {({ width, height }) =>
          width &&
          height && (
            <VizWrapper
              width={width}
              height={height}
              data={status.data}
              init={status.init}
              updateDuration={status.duration}
              curve={status.curve}
            />
          )
        }
      </Responsive>
    </div>
  );
};
