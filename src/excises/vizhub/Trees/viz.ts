import { RefObject } from "react";
import { HierarchyPointNode, HierarchyPointLink } from "d3-hierarchy";
import { linkRadial } from "d3-shape";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import { scaleSequential } from "d3-scale";
import { DataShape } from "./data";
import { interpolateRainbow } from "d3-scale-chromatic";

interface VizProps {
  links: HierarchyPointLink<DataShape>[];
  nodes: HierarchyPointNode<DataShape>[];
}

export const main = (
  container: RefObject<HTMLDivElement>,
  { links, nodes }: VizProps
) => {
  if (!container.current) {
    return;
  }
  const width = container.current.clientWidth;
  const height = container.current.clientHeight;
  const cx = width * 0.5; // adjust as needed to fit
  const cy = height * 0.5; // adjust as needed to fit
  const svg = select(container.current)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("viewBox", [-cx, -cy, width, height])
    .attr("width", width)
    .attr("height", height);

  // add zoom
  const zoomG = svg.append("g");
  svg.call(
    zoom().on("zoom", (event) => {
      zoomG.attr("transform", event.transform);
    }) as any
  );

  // color fn
  const colorScale = scaleSequential(interpolateRainbow);
  const colorFn = (n: number) => (_: any, i: number) => colorScale(i / n);

  // append links
  zoomG
    .append("g")
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("stroke", colorFn(links.length))
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr(
      "d",
      linkRadial<HierarchyPointNode<DataShape>, any, any>()
        .angle((d) => d.x)
        .radius((d) => d.y) as any
    );

  // append nodes
  zoomG
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr(
      "transform",
      (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y}, 0)`
    )
    .attr("fill", "black")
    .attr("r", 2.5);
};
