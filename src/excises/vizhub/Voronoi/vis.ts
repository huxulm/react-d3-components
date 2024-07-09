import { Dispatch, RefObject, SetStateAction } from "react";
import { select } from "d3-selection";
import { Delaunay } from "d3-delaunay";
import { drag } from "d3-drag";
import { interpolateRainbow } from "d3-scale-chromatic";
import { scaleSequential } from "d3-scale";
import { DataShape } from "./data";

export function main(
  container: RefObject<HTMLDivElement>,
  {
    state,
    setState,
  }: {
    state: DataShape[];
    setState: Dispatch<SetStateAction<DataShape[]>>;
  }
) {
  if (!container.current) {
    return;
  }
  const width = container.current.clientWidth;
  const height = container.current.clientHeight;
  const dragBehavior = drag<Element, DataShape>().on(
    "drag",
    (event, draggedDatum) => {
      setState((prev) => {
        return prev.map((d) =>
          d.id == draggedDatum.id ? { ...d, x: event.x, y: event.y } : d
        );
      });
    }
  );
  const svg = select(container.current)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#F0F3F4");

  const delaunay = Delaunay.from(state.map((d) => [d.x, d.y]));
  const voronoi = delaunay.voronoi([0, 0, width, height]);
  const color = scaleSequential(interpolateRainbow);
  svg
    .selectAll("circle")
    .data(state)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .attr("fill", (d, i) => d.fill || color(i / state.length))
    .call(dragBehavior as any);

  svg
    .selectAll("path")
    .data(state)
    .join("path")
    .attr("fill", "none")
    .attr("stroke", color(0.85))
    .attr("opacity", 508 / 1000)
    .attr("stroke-width", 5)
    .attr("d", (_, i) => voronoi.renderCell(i));
}
