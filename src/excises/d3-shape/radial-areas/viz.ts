import { RefObject } from "react";
import { min, max } from "d3-array";
import { select } from "d3-selection";
import { scaleLinear, scaleUtc } from "d3-scale";
import { lineRadial, curveLinearClosed, areaRadial } from "d3-shape";
import { zoom } from "d3-zoom";

import { data, DataShape } from "./data";

export const main = (container: RefObject<HTMLDivElement>) => {
  const width = container.current!.clientWidth;
  const height = container.current!.clientHeight;
  const margin = 50;
  const innerRadius = height / 2 - 4 * margin;
  const outerRadius = height / 2 - margin;
  const x = scaleUtc()
    .domain([Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 1) - 1])
    .range([0, 2 * Math.PI]);
  const y = scaleLinear()
    .domain([
      min(data, (d) => d.minmin),
      max(data, (d) => d.maxmax),
    ] as Iterable<number>)
    .range([innerRadius, outerRadius]);
  const svg = select(container.current)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const line = lineRadial<DataShape>()
    .curve(curveLinearClosed)
    .angle((d) => x(d.date));

  const area = areaRadial<DataShape>()
    .curve(curveLinearClosed)
    .angle((d) => x(d.date));

  const g = svg.append("g");

  const zoomBehavior = zoom().on("zoom", (event) => {
    g.attr("transform", event.transform);
  });

  svg.call(zoomBehavior as any);

  g.append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1)
    .attr("d", line.radius((d) => y(d.avg))(data));

  g.append("path")
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.2)
    .attr(
      "d",
      area.innerRadius((d) => y(d.minmin)).outerRadius((d) => y(d.maxmax))(data)
    );

  g.append("path")
    .attr("fill", "steelblue")
    .attr("fill-opacity", 0.2)
    .attr(
      "d",
      area.innerRadius((d) => y(d.min)).outerRadius((d) => y(d.max))(data)
    );
};
