import { Size } from "@/common/utils/responsive/useParentSize";
import { scaleLinear, scaleSequential } from "d3-scale";
import { select } from "d3-selection";
import { zoom } from "d3-zoom";
import { arc, pie, PieArcDatum } from "d3-shape";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { interpolateRainbow } from "d3";

interface DataShape {
  id: number;
  value: number;
}

const Controller = ({
  dounts,
  total,
  mn,
  mx,
  setState,
}: {
  dounts: number;
  total: number;
  mn: number;
  mx: number;
  setState: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 50,
        left: 50,
        display: "flex",
        flexDirection: "column",
        border: "1px dotted black",
        padding: 5,
      }}
    >
      <label>
        <label>圈数 {dounts}</label>
        <input
          type="range"
          value={dounts}
          min={mn}
          max={mx}
          onChange={(e) => setState(parseInt(e.target.value))}
        />
      </label>
      <label>
        <label>总块数 {total}</label>
      </label>
    </div>
  );
};

export const Dount = () => {
  const [dounts, setDounts] = useState(30); // how many dounts in circle
  const totalFn = (n: number) => (n * (6 + (n - 1) * 5)) / 2;
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [sizes, setSizes] = useState<Size>({ width: 0.001, height: 0.001 });
  const rScale = useCallback(() => {
    const { width = 0.001, height = 0.001 } = sizes;
    const radius = Math.min(width, height) / 2;
    return scaleLinear([0, dounts], [0, radius]);
  }, [sizes, dounts]);
  const getArcFn = useCallback(
    (i: number) => {
      return arc<PieArcDatum<DataShape>>()
        .innerRadius(rScale()(i))
        .outerRadius(rScale()(i + 1));
    },
    [rScale, sizes]
  );

  const pieData = useMemo((): Array<Array<PieArcDatum<DataShape>>> => {
    return Array(dounts)
      .fill(null)
      .map<Array<PieArcDatum<DataShape>>>((_, i) => {
        return pie<DataShape>()
          .padAngle(((dounts / (i + 1)) * 0.2 * Math.PI) / 180)
          .value((d) => d.value)(
          new Array(5 * i + 3)
            .fill(null)
            .map((_, i) => ({ id: i * 2 + 1, value: 1 }))
        );
      });
  }, [sizes, rScale, dounts]);

  const color = scaleSequential(interpolateRainbow);
  useEffect(() => {
    setSizes({
      width: ref.current!.clientWidth,
      height: ref.current!.clientHeight,
    });

    select(svgRef.current).call(
      zoom().on("zoom", (event) => setZoomTransform(event.transform)) as any
    );
  }, [ref, svgRef]);
  const [zoomTransform, setZoomTransform] = useState("");

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref}>
      <Controller
        total={totalFn(dounts)}
        dounts={dounts}
        setState={setDounts}
        mn={1}
        mx={100}
      />
      <svg
        ref={svgRef}
        width={sizes.width}
        height={sizes.height}
        viewBox={`${-sizes.width! / 2} ${-sizes.height! / 2} ${sizes.width} ${sizes.height}`}
      >
        <motion.g transform={zoomTransform}>
          {pieData.map((p, i) => {
            return p.map((d) => (
              <motion.path
                fill={color((totalFn(i + 1) * 0.9) / totalFn(dounts))}
                stroke={"black"}
                strokeWidth={1}
                d={getArcFn(i)(d)!}
                opacity={708 / 1000}
              />
            ));
          })}
        </motion.g>
      </svg>
    </div>
  );
};
