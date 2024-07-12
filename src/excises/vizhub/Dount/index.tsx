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
  color: string;
}

const Controller = ({
  offsetDount,
  dounts,
  borderWidth,
  total,
  mn,
  mx,
  setState,
  setOffsetState,
  setBorderWidth,
}: {
  dounts: number;
  offsetDount: number;
  borderWidth: number;
  setBorderWidth: Dispatch<SetStateAction<number>>;
  total: number;
  mn: number;
  mx: number;
  setState: Dispatch<SetStateAction<number>>;
  setOffsetState: Dispatch<SetStateAction<number>>;
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
        <label>外圈 {dounts}</label>
        <input
          type="range"
          value={dounts}
          min={mn}
          max={mx}
          onChange={(e) => setState(parseInt(e.target.value))}
        />
      </label>
      <label>
        <label>起始圈 {offsetDount}</label>
        <input
          type="range"
          value={offsetDount}
          min={mn}
          max={dounts - 1}
          onChange={(e) => setOffsetState(parseInt(e.target.value))}
        />
      </label>
      <label>
        <label>块-边宽 {borderWidth}</label>
        <input
          type="range"
          value={borderWidth}
          min={0}
          max={5}
          onChange={(e) => setBorderWidth(parseInt(e.target.value))}
        />
      </label>
      <label>
        <label>总块数 {total}</label>
      </label>
    </div>
  );
};

export const Dount = () => {
  const [dounts, setDounts] = useState(15); // how many dounts in circle
  const [offsetDount, setOffsetDount] = useState(0); // how many dounts in circle
  const totalFn = (n: number) => (n * (6 + (n - 1) * 5)) / 2;
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [sizes, setSizes] = useState<Size>({ width: 0.001, height: 0.001 });
  const color = scaleSequential(interpolateRainbow); // color scale
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
    return (
      Array(dounts)
        .fill(null)
        // .splice(offsetDount, dounts) // dounts in domain
        .map<Array<PieArcDatum<DataShape>>>((_, i) => {
          if (i < offsetDount) {
            return [];
          }
          return (
            pie<DataShape>()
              // .padAngle(((dounts / (i + 1)) * 0.2 * Math.PI) / 180)
              .value((d) => d.value)(
              new Array(5 * i + 3).fill(null).map((_, i) => ({
                id: i * 2 + 1,
                value: 1,
                color: color(Math.random()),
              })) // radom color for ease mocking
            )
          );
        })
    );
  }, [sizes, rScale, dounts, offsetDount]);

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
  const [borderWidth, setBorderWidth] = useState(1);

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref}>
      <Controller
        total={totalFn(dounts)}
        dounts={dounts}
        offsetDount={offsetDount}
        borderWidth={borderWidth}
        setBorderWidth={setBorderWidth}
        setState={setDounts}
        setOffsetState={setOffsetDount}
        mn={0}
        mx={50}
      />
      <motion.svg
        ref={svgRef}
        width={sizes.width}
        height={sizes.height}
        viewBox={`${-sizes.width! / 2} ${-sizes.height! / 2} ${sizes.width} ${sizes.height}`}
      >
        <motion.g transform={zoomTransform}>
          {pieData.map((p, i) => {
            return p.map((d) => (
              <motion.path
                // fill={color((totalFn(i + 1) * 0.9) / totalFn(dounts))}
                fill={d.data.color}
                stroke={"#FFF"}
                strokeLinecap={"round"}
                strokeWidth={borderWidth}
                initial={{ d: "", opacity: 0, rotate: 10 }}
                animate={{
                  d: getArcFn(i)(d)!,
                  opacity: 890 / 1000,
                  rotate: 0,
                }}
                transition={{ duration: 0.2, delay: (i * 5) / totalFn(dounts) }}
              />
            ));
          })}
        </motion.g>
      </motion.svg>
    </div>
  );
};
