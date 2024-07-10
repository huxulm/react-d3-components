import { useCallback, useEffect, useRef, useState } from "react";
import { DragHandlers, motion, useMotionValue } from "framer-motion";
import { interpolateRainbow } from "d3-scale-chromatic";
import { scaleSequential } from "d3-scale";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { Delaunay } from "d3-delaunay";
import { main } from "./vis";
import { data, DataShape } from "./data";
import { Voronoi } from "d3";

export const VoronoiD3 = () => {
  const [state, setState] = useState<DataShape[]>(data);
  const ref = useRef(null);
  useEffect(() => main(ref, { state, setState }), [ref, state]);
  return <div style={{ width: "100vw", height: "100vh" }} ref={ref}></div>;
};

export const VoronoiDragWithMotion = () => {
  const [state, setState] = useState<DataShape[]>(data);
  const ref = useRef<HTMLDivElement>(null);
  const color = scaleSequential(interpolateRainbow);
  const getVoronoi = useCallback(
    (data: DataShape[]) => {
      if (!ref.current) {
        return null;
      }
      const width = ref.current!.clientWidth;
      const height = ref.current!.clientHeight;
      const delaunay = Delaunay.from(data.map((d) => [d.x, d.y]));
      const voronoi = delaunay.voronoi([0, 0, width, height]);
      return voronoi;
    },
    [state]
  );

  const voronoi = getVoronoi(state);

  const RenderCircle = (d: DataShape, i: number) => {
    const [x, y] = [useMotionValue(d.x), useMotionValue(d.y)];
    const onCircleDrag: DragHandlers["onDrag"] = (event, info) => {
      const curId = (event.target as SVGCircleElement).getAttribute("data-id");
      setState((prev) => {
        return prev.map((d) =>
          d.id == parseInt(curId ? curId : "-1")
            ? {
                ...d,
                x: info.point.x,
                y: info.point.y,
              }
            : d
        );
      });
    };
    return (
      <motion.circle
        drag
        {...{ "data-id": d.id }}
        onDrag={onCircleDrag}
        onDragEnd={onCircleDrag}
        dragMomentum={false}
        dragElastic={false}
        cx={x}
        cy={y}
        r={d.r}
        transition={{ duration: 0, type: "tween" }}
        fill={d.fill || color(i / state.length)}
      />
    );
  };
  const RenderPath = (_: DataShape, i: number) => (
    <motion.path
      stroke={color(0.85)}
      strokeWidth={5}
      fill={"none"}
      opacity={508 / 1000}
      d={voronoi!.renderCell(i)}
    />
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref}>
      <svg width={"100%"} height={"100%"} style={{ background: "#F0F3F4" }}>
        {state.map(RenderCircle)}
        {voronoi && state.map(RenderPath)}
      </svg>
    </div>
  );
};

export const VoronoiDragWithD3 = () => {
  const [state, setState] = useState<DataShape[]>(data);
  const ref = useRef<HTMLDivElement>(null);
  const color = scaleSequential(interpolateRainbow);
  const getVoronoi = (data: DataShape[]) => {
    if (!ref.current) {
      return null;
    }
    const width = ref.current!.clientWidth;
    const height = ref.current!.clientHeight;
    const delaunay = Delaunay.from(data.map((d) => [d.x, d.y]));
    const voronoi = delaunay.voronoi([0, 0, width, height]);
    return voronoi;
  };

  const [voronoi, setVoronoi] = useState<Voronoi<Delaunay.Point> | null>(null);
  useEffect(() => setVoronoi(getVoronoi(state)), [state]);

  const RenderCircle = (d: DataShape, i: number) => {
    const ref = useRef<SVGCircleElement>(null);
    const handleDrag = drag().on("drag", function (event) {
      const id = select(this).attr("data-id");
      setState((prev) =>
        prev.map((d) =>
          d.id == parseInt(id || "-1") ? { ...d, x: event.x, y: event.y } : d
        )
      );
    });
    useEffect(() => handleDrag(select(ref.current) as any), [ref]);
    return (
      <circle
        ref={ref}
        {...{ "data-id": d.id }}
        cx={d.x}
        cy={d.y}
        r={d.r}
        fill={d.fill || color(i / state.length)}
      />
    );
  };
  const RenderPath = (_: DataShape, i: number) => (
    <motion.path
      stroke={color(0.85)}
      strokeWidth={5}
      fill={"none"}
      opacity={508 / 1000}
      d={voronoi!.renderCell(i)}
    />
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref}>
      <svg width={"100%"} height={"100%"} style={{ background: "#F0F3F4" }}>
        {state.map(RenderCircle)}
        {voronoi && state.map(RenderPath)}
      </svg>
    </div>
  );
};
