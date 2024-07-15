import { RefObject } from "react";
import { select, Selection } from "d3-selection";
import { scaleRadial, ScaleRadial } from "d3-scale";
import { pointRadial } from "d3-shape";

type SVGSelection = Selection<SVGSVGElement, any, null, undefined>;
type XScale = ScaleRadial<number, number, never>
export const viz = (container: RefObject<SVGSVGElement>, width: number, height: number) => {
//   const width = container.current!.clientWidth;
//   const height = container.current!.clientHeight;
  const innerRadius = height / (2 * 5);
  const outerRadius = height / 2;
  const svg = select<SVGSVGElement, any>(container.current!);
  svg.attr("viewBox", [-width / 2, -height / 2, width, height]);
  const x = scaleRadial().domain([0, Math.PI * 2]).range([0, Math.PI * 2])
  // axes
  axes(svg, innerRadius, outerRadius, x);
};

export const axes = (
  g: SVGSelection,
  innerRadius: number,
  outerRadius: number,
  x: XScale
) => {
  // xAxis
  g.selectAll("g")
    .data(x.ticks())
    .join("g")
    .call((g) => {
      g.append("path")
        .attr("stroke", "#5e5e5e")
        .attr("stroke-opacity", 0.5)
        .attr(
          "d",
          (d) =>
            `M${pointRadial(d, innerRadius)}L${pointRadial(d, outerRadius)}`
        );
    });
};
