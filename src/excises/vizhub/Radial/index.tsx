import { FC, useCallback, useEffect, useRef, useState } from "react";
import { VizWrapper } from "./VizWrapper";
import { Responsive } from "@/common/utils/responsive/Responsive";
import { dataFn, DataShape, Mock } from "./data";
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

import "./index.css";

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
  initStart?: boolean;
  initDuration?: number;
  initMockConfig?: MockConfig;
}

const DefaultDataFetchDuration = 200;

type MockConfig = {
  id: number;
  range: [number, number];
  valueFn?: (val: number) => number;
};

type RadialStatus = {
  init: boolean;
  start: boolean;
  data: DataShape[][];
  duration: number;
  curve: any;
  mockConfig: MockConfig;
};

const mockRanges = [["[0, 360]", [0, Math.PI * 2]]].concat(
  Array.from({ length: 8 }, (_, i) => {
    const step = 360 / 8;
    return [
      `[${i * step}, ${(i + 1) * step}${i == 7? ']': ')'}`,
      [(i * Math.PI) / 4, ((i + 1) * Math.PI) / 4],
    ];
  })
);

export const Radial: FC<RadialProps> = ({
  initDounts,
  initOffsetDount,
  initMockConfig,
  initDuration,
  initStart,
}: RadialProps) => {
  const [dounts] = useState<number>(initDounts || 20);
  const [offsetDount] = useState<number>(initOffsetDount || 0);
  const [status, setStatus] = useState<RadialStatus>({
    init: true,
    start: initStart || false,
    duration: initDuration || DefaultDataFetchDuration,
    curve: curveCardinalClosed,
    mockConfig: initMockConfig || {
      id: 0,
      range: mockRanges[0][1] as [number, number],
    },
    data: dataFn(
      dounts,
      Array.from({ length: dounts }, (_, i) => 5 * i + 3),
      () => 0
    ),
  });

  const update = useCallback(() => {
    console.log("updating...");
    setStatus((prev) => ({
      ...prev,
      init: false,
      data: Mock(prev.data, prev.mockConfig.range, prev.mockConfig.valueFn),
    }));
  }, [dounts]);

  const reset = () => {
    setStatus({
      init: false,
      start: false,
      duration: DefaultDataFetchDuration,
      curve: curveCardinalClosed,
      mockConfig: { id: 0, range: [0, Math.PI * 2] },
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
    let t: any = null;
    setTimeout(() => {
      if (status.start) {
        t = setInterval(update, status.duration);
        setIt(it);
      }
    }, 500);
    return () => t && clearInterval(t);
  }, [status.duration, status.start]);
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

  const onSelectMock = (id: number) => {
    setStatus((prev) => ({
      ...prev,
      mockConfig: {
        ...prev.mockConfig,
        id: id,
        range: mockRanges[id][1] as [number, number],
      },
    }));
  };

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          position: "relative",
          top: 50,
          left: 50,
          display: "flex",
          width: "25%",
          maxWidth: 200,
          height: 0,
          gap: 10,
          flexDirection: "column",
        }}
      >
        <button
          onClick={() => {
            if (it) {
              clearInterval(it);
            }
            setStatus((prev) => ({ ...prev, start: !prev.start }));
          }}
        >
          {!status.start ? "启动模拟" : "停止"}
        </button>
        <button onClick={reset}>重置</button>
        <label>
          <label>频率</label>
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
        <div>
          <label>模拟数据范围</label>
          {mockRanges.map((conf, i) => (
            <label>
              <code>{conf[0] as string}</code>
              <input
                type="radio"
                checked={status.mockConfig?.id === i}
                onChange={() => onSelectMock(i)}
              />
            </label>
          ))}
        </div>
        <div>
          <label>选择范围</label>
          <label>
            <input
              type="range"
              min={0}
              max={360}
              value={status.mockConfig.range[0] * 180 / Math.PI}
              onChange={(e) => {
                setStatus((prev) => ({
                  ...prev,
                  mockConfig: {
                    ...prev.mockConfig,
                    range: [
                      parseFloat(e.target.value) * Math.PI/180,
                      prev.mockConfig.range[1],
                    ],
                  },
                }));
              }}
            />
            <label>{Math.ceil(status.mockConfig.range[0] * 180 / Math.PI)}°</label>
          </label>
          <label>
            <input
              type="range"
              min={0}
              max={360}
              value={status.mockConfig.range[1] * 180 / Math.PI}
              onChange={(e) => {
                setStatus((prev) => ({
                  ...prev,
                  mockConfig: {
                    ...prev.mockConfig,
                    range: [
                      prev.mockConfig.range[0],
                      parseFloat(e.target.value) * Math.PI/180,
                    ],
                  },
                }));
              }}
            />
            <label>{Math.ceil(status.mockConfig.range[1] * 180 / Math.PI)}°</label>
          </label>
        </div>
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
