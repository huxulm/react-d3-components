import { RefObject } from "react";
import { select, Selection } from "d3-selection";
import { scaleLinear, ScaleLinear } from "d3-scale";
import { pointRadial } from "d3-shape";

type SVGSelection = Selection<SVGSVGElement, any, null, undefined>;
type XYScale = ScaleLinear<number, number, never>;
export const viz = (
  container: RefObject<SVGSVGElement>,
  width: number,
  height: number
) => {
  //   const width = container.current!.clientWidth;
  //   const height = container.current!.clientHeight;
  const innerRadius = height / 12;
  const outerRadius = height / 2;
  const svg = select<SVGSVGElement, any>(container.current!);
  svg.attr("viewBox", [-width / 2, -height / 2, width, height]);
  const x = scaleLinear()
    .domain([0, Math.PI * 2])
    .range([0, 360]);
  const y = scaleLinear().range([innerRadius, outerRadius]).domain([0, 20]);
  // axes
  const tickCount = 12;
  xAxes(svg, innerRadius, outerRadius, x, tickCount);
  yAxes(svg, y);
};

export const xAxes = (
  g: SVGSelection,
  innerRadius: number,
  outerRadius: number,
  x: XYScale,
  tickCount: number
) => {
  // xAxis
  const step = (Math.PI * 2) / Math.max(4, tickCount);
  const ticks = Array.from({ length: tickCount }, (_, i) => i * step);
  g.append("g")
    .attr("font-size", 10)
    .attr("font-weight", "bold")
    .call((g) =>
      g
        .selectAll("g")
        .data(ticks)
        .join("g")
        .call((g) =>
          g
            .append("path")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.3)
            .attr(
              "d",
              (d) =>
                `M${pointRadial(d, innerRadius)}L${pointRadial(d, outerRadius)}`
            )
        )
        .call((g) =>
          g
            .append("path")
            .attr("id", (_, i) => `p-${i}`)
            .datum((d) => [d, d + step])
            .attr("fill", "none")
            .attr(
              "d",
              ([a, b]) => `
           M${pointRadial(a, innerRadius)}
           A${innerRadius},${innerRadius} 0,0,1 ${pointRadial(b, innerRadius)}
         `
            )
        )
        .call((g) =>
          g
            .append("text")
            .append("textPath")
            .attr("startOffset", 6)
            .attr("stroke", "red")
            .attr("stoke-width", 1)
            .attr("xlink:href", (_, i) => `#p-${i}`)
            .text((d) => `${Math.ceil(x(d))}°`)
        )
    );
};

const yAxes = (g: SVGSelection, y: XYScale) => {
  g.append("g")
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .call((g) =>
      g
        .selectAll("g")
        .data(y.ticks().reverse())
        .join("g")
        .attr("fill", "none")
        .call((g) =>
          g
            .append("circle")
            .attr("stroke", "#000")
            .attr("stroke-dasharray", "4")
            .attr("stroke-opacity", 0.2)
            .attr("r", y)
        )
    );
};
