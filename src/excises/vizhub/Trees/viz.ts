import { RefObject } from "react";
import { HierarchyPointNode, HierarchyPointLink } from "d3-hierarchy";
import { linkRadial } from "d3-shape";
import { zoom } from "d3-zoom";
import { select, Selection } from "d3-selection";
import { scaleSequential } from "d3-scale";
import { DataShape } from "./data";
import { interpolateRainbow } from "d3-scale-chromatic";

export interface Sizes {
  width: number;
  height: number;
  radius: number;
}
interface VizProps {
  links: HierarchyPointLink<DataShape>[];
  nodes: HierarchyPointNode<DataShape>[];
  sizes: Sizes;
}
export type MainSelection = Selection<
  SVGGElement,
  null,
  HTMLDivElement | null,
  unknown
> | null;
export type NodesSelection = Selection<
  SVGCircleElement,
  HierarchyPointNode<DataShape>,
  SVGGElement,
  null
> | null;
export type LinksSelection = Selection<
  SVGPathElement,
  HierarchyPointLink<DataShape>,
  SVGGElement,
  null
> | null;

export const radialDiagonal = linkRadial<HierarchyPointNode<DataShape>, any, any>()
  .angle((d) => d.x)
  .radius((d) => d.y) as any;

// color fn
export const colorScale = scaleSequential(interpolateRainbow);
export const colorFn = (n: number) => (_: any, i: number) => colorScale(i / n);

export const main = (
  container: RefObject<HTMLDivElement>,
  { links, nodes, sizes }: VizProps
): [MainSelection, NodesSelection, LinksSelection] => {
  const { width, height } = sizes;
  const cx = width * 0.5; // adjust as needed to fit
  const cy = height * 0.5; // adjust as needed to fit
  const svg = select(container.current)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${cx}, ${cy})`);

  // add zoom
  const zoomG = svg.append("g");
  const zoomBehavior = zoom().on("zoom", (event) => {
    zoomG.attr("transform", event.transform)
  });

  svg.call(zoomBehavior as any);

  // append links
  const Links = zoomG
    .append("g")
    .selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr("stroke", colorFn(links.length))
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("d", radialDiagonal as any);

  // append nodes
  const Nodes = zoomG
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr(
      "transform",
      (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y}, 0)`
    )
    .attr("fill", "white")
    .attr("stroke", colorFn(links.length))
    .attr("r", 20);
  return [
    svg as MainSelection,
    Nodes as NodesSelection,
    Links as LinksSelection,
  ];
};

export function transitionToRadialTree(
  fn: () => [
    HierarchyPointNode<DataShape>[],
    HierarchyPointLink<DataShape>[],
    Sizes,
  ],
  mainG: MainSelection,
  nodesG: NodesSelection,
  linksG: LinksSelection,
  duration: number
) {
  const [nodes, links, sizes] = fn();
  mainG!
    .transition()
    .duration(duration)
    .attr(
      "transform",
      "translate(" + sizes.width / 2 + "," + sizes.height / 2 + ")"
    );
  // set appropriate translation (origin in middle of svg)

  linksG!
    .data(links)
    .transition()
    .duration(duration)
    .style("stroke", colorFn(links.length))
    .attr("d", radialDiagonal as any); //get the new radial path

  nodesG!
    .data(nodes)
    .transition()
    .duration(duration)
    .attr(
      "transform",
      (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y}, 0)`
    );

  nodesG!
    .select("circle")
    .transition()
    .duration(duration)
    .style("stroke", "#984ea3");
}

export function transitionToRadialCluster(
  fn: () => [
    HierarchyPointNode<DataShape>[],
    HierarchyPointLink<DataShape>[],
    Sizes,
  ],
  mainG: MainSelection,
  nodesG: NodesSelection,
  linksG: LinksSelection,
  duration: number
) {
  const [nodes, links, sizes] = fn();
  mainG!
    .transition()
    .duration(duration)
    .attr(
      "transform",
      "translate(" + sizes.width / 2 + "," + sizes.height / 2 + ")"
    );
  // set appropriate translation (origin in middle of svg)

  linksG!
    .data(links)
    .transition()
    .duration(duration)
    .style("stroke", colorFn(links.length))
    .attr("d", radialDiagonal as any); //get the new radial path

  nodesG!
    .data(nodes)
    .transition()
    .duration(duration)
    .attr(
      "transform",
      (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y}, 0)`
    );

  nodesG!
    .select("circle")
    .transition()
    .duration(duration)
    .style("stroke", "#4daf4a");
}
