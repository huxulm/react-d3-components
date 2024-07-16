import { RefObject } from "react";
import { select, Selection } from "d3-selection";
import { scaleLinear, ScaleLinear, scaleSequential } from "d3-scale";
import { interpolateRainbow } from "d3-scale-chromatic";
import { pointRadial, lineRadial, curveLinearClosed } from "d3-shape";
import { zoom } from "d3-zoom";
import { transition } from "d3-transition";
import { easeLinear as easeFn } from "d3-ease";

import { DataShape } from "./data";

type SVGSelection = Selection<SVGGElement, any, null, undefined>;
export type DountsSelection = Selection<
  SVGPathElement,
  DataShape[],
  SVGGElement,
  null
>;
type XYScale = ScaleLinear<number, number, never>;
export const viz = (
  container: RefObject<SVGSVGElement>,
  width: number,
  height: number,
  innerRadius: number,
  outerRadius: number,
  data: DataShape[][],
  getDountScale: (i: number) => ScaleLinear<number, number, never>,
  xTickCount: number
): DountsSelection => {
  //   const width = container.current!.clientWidth;
  //   const height = container.current!.clientHeight;
  //   const innerRadius = height / 12;
  //   const outerRadius = height / 2;

  // clear
  // selectAll("svg > g").remove();

  // color
  const color = scaleSequential(interpolateRainbow);

  const slow = transition().duration(750).ease(easeFn);
  const svg = select<SVGSVGElement, any>(container.current!);
  svg.attr("viewBox", [-width / 2, -height / 2, width, height]);

  const g = svg.append("g");
  const zoomBehavior = zoom().on("zoom", (event) =>
    g.attr("transform", event.transform)
  );
  svg.call(zoomBehavior as any);

  const x = scaleLinear()
    .domain([0, Math.PI * 2])
    .range([0, 360]);

  const y = scaleLinear().range([innerRadius, outerRadius]).domain([0, 20]);

  // render x Axis
  xAxes(g, innerRadius, outerRadius, x, xTickCount);

  //  render y Axis
  yAxes(g, y, data.length + 1);

  const line = lineRadial<DataShape>().curve(curveLinearClosed);

  // render dounts
  let dountsG: DountsSelection;
  g.append("g")
    .data([null])
    .join("g")
    .call((g) => {
      dountsG = g
        .append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", (_, i) => color((i + 1) / data.length))
        .attr("d", (d, i) => {
          return line
            .angle((_, j) => (j * Math.PI * 2) / d.length)
            .radius((v) => getDountScale(i)(v.value))(d);
        })
        .attr("stroke-opacity", 0)
        .call((selection) =>
          selection
            .transition(slow)
            .delay((_, i) => (i * 1000) / Math.max(1, data.length))
            .attr("stroke-opacity", 1)
        );
    });
  return dountsG!;
};

export function transitionDounts(
  g: DountsSelection,
  data: DataShape[][],
  getDountScale: (i: number) => ScaleLinear<number, number, never>,
  duration: number,
  curve: any,
) {
  const fast = transition().duration(duration).ease(easeFn);
  const line = lineRadial<DataShape>().curve(curve);
  g.data(data).call((selection) => {
    selection
      .transition(fast)
      .attr("stroke-opacity", 1)
      .attr("d", (d, i) => {
        return line
          .angle((_, j) => (j * Math.PI * 2) / d.length)
          .radius((v) => getDountScale(i)(v.value))(d);
      });
  });
}

export const xAxes = (
  g: SVGSelection,
  innerRadius: number,
  outerRadius: number,
  x: XYScale,
  tickCount: number
) => {
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
            .attr("stroke-opacity", 0.2)
            .attr(
              "d",
              (d) =>
                `M${pointRadial(d, innerRadius)}L${pointRadial(d, outerRadius + 50)}`
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
            .attr("stroke", "steelblue")
            .attr("stoke-width", 1)
            .attr("xlink:href", (_, i) => `#p-${i}`)
            .text((d) => `${Math.ceil(x(d))}°`)
        )
    );
};

const yAxes = (g: SVGSelection, y: XYScale, tickCount: number) => {
  g.append("g")
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .call((g) =>
      g
        .selectAll("g")
        .data(y.ticks(tickCount).reverse())
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
