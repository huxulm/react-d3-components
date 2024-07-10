// TODO Add more layouts and transitions in between
// https://stackoverflow.com/questions/20930401/smooth-transitioning-between-tree-cluster-radial-tree-and-radial-cluster-layo
import { RefObject } from "react";
import { select } from "d3-selection";
import { hierarchy, tree, HierarchyPointNode } from "d3-hierarchy";
import { zoom } from "d3-zoom";
import { linkRadial } from "d3-shape";
import { ascending } from "d3-array";
import { scaleSequential } from "d3-scale";
import { interpolateRainbow } from "d3-scale-chromatic";
import { DataShape } from "./data";

export const main = (container: RefObject<HTMLDivElement>, data: DataShape) => {
  if (!container.current) {
    return;
  }
  const width = container.current.clientWidth;
  const height = container.current.clientHeight;

  const cx = width * 0.5; // adjust as needed to fit
  const cy = height * 0.5; // adjust as needed to fit
  const radius = Math.min(width, height) / 2 - 30;

  const color = scaleSequential(interpolateRainbow);

  const svg = select(container.current)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("viewBox", [-cx, -cy, width, height])
    .attr("width", width)
    .attr("height", height)
    .style("background", "transparent");

  const zoomG = svg.append("g")
  svg.call(
    zoom().on("zoom", (event) => {
      zoomG.attr("transform", event.transform);
    }) as any
  );

  const treeLayout = tree<DataShape>()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
  // create hierarchy
  const root = treeLayout(hierarchy(data)).sort((a, b) =>
    ascending(a.data.data.id, b.data.data.id)
  );

  // Append links.
  const links = root.links();
  zoomG.attr("fill", "none")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
    .selectAll()
    .data(links)
    .join("path")
    .attr("stroke", (_, i) => color(i / links.length))
    .attr(
      "d",
      linkRadial<HierarchyPointNode<DataShape>, any, any>()
        .angle((d) => d.x)
        .radius((d) => d.y) as any
    );

  // Append nodes.
  zoomG.append("g")
    .selectAll()
    .data(root.descendants())
    .join("circle")
    .attr(
      "transform",
      (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
    )
    .attr("fill", (d) => (d.children ? "#555" : "#999"))
    .attr("r", 2.5);

  // Append labels.
  const descendants = root.descendants()
  zoomG.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll()
    .data(descendants)
    .join("text")
    .attr(
      "transform",
      (d) =>
        `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`
    )
    .attr("dy", "0.31em")
    .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
    .attr("text-anchor", (d) =>
      d.x < Math.PI === !d.children ? "start" : "end"
    )
    .attr("paint-order", "stroke")
    .attr("stroke", "white")
    .attr("fill", (_, i) => color(i / descendants.length))
    .text((d) => d.data.data.id);
};
