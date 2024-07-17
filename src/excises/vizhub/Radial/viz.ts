import { RefObject } from "react";
import { select, Selection } from "d3-selection";
import { scaleLinear, ScaleLinear, scaleSequential } from "d3-scale";
import { interpolateRainbow } from "d3-scale-chromatic";
import { pointRadial, lineRadial, curveLinearClosed } from "d3-shape";
import { zoom } from "d3-zoom";
import { transition } from "d3-transition";
import { easeLinear as easeFn } from "d3-ease";

import { DataShape } from "./data";
import { BaseType } from "d3";

type SVGSelection = Selection<SVGGElement, any, null, undefined>;
export type DountsSelection = Selection<
  SVGPathElement,
  DataShape[],
  SVGGElement,
  null
>;
export type PointsSelection = Selection<
  BaseType | SVGGElement,
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
): [DountsSelection, PointsSelection] => {
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

  const y = scaleLinear()
    .range([innerRadius, outerRadius])
    .domain([0, data.length]);

  // render x Axis
  xAxes(g, innerRadius, outerRadius, x, xTickCount);

  //  render y Axis
  yAxes(g, y, data.length + 1);

  const line = lineRadial<DataShape>().curve(curveLinearClosed);

  // render dounts
  let dountsG: DountsSelection;
  let pointsG: PointsSelection;
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
    })
    .call((g) => {
      pointsG = g
        .selectAll("g")
        .data(data)
        .join("g")
        .call((g) =>
          g
            .selectAll<SVGCircleElement, DataShape[]>("circle")
            .data((d) => d)
            .enter()
            .append("circle")
            .attr("fill", (v) => color((v.dount + 1) / data.length))
            .attr("opacity", 0)
            .attr("stroke-width", 1)
            .attr("stroke", "#82203E")
            .attr(
              "cx",
              (v, j) =>
                pointRadial(
                  (j * Math.PI * 2) / data[v.dount].length,
                  y(v.dount + v.value)
                )[0]
            )
            .attr(
              "cy",
              (v, j) =>
                pointRadial(
                  (j * Math.PI * 2) / data[v.dount].length,
                  y(v.dount + v.value)
                )[1]
            )
            .attr("r", 3)
            .call((selection) =>
              selection
                .transition(slow)
                .delay((d) => (d.dount * 1000) / Math.max(1, data.length))
                .attr("opacity", 1)
            )
        );
    });
  return [dountsG!, pointsG!];
};

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
            .attr("class", "x-axis")
            .attr("stroke-width", 1.5)
            .attr("stroke-dasharray", "4 4")
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
           M${pointRadial(a, innerRadius - 10)}
           A${innerRadius - 10},${innerRadius - 10} 0,0,1 ${pointRadial(b, innerRadius - 10)}
         `
            )
        )
        .call((g) =>
          g
            .append("text")
            .append("textPath")
            .attr("class", "x-axis")
            .attr("startOffset", 0)
            .attr("stoke-width", 1)
            .attr("xlink:href", (_, i) => `#p-${i}`)
            .text((d, i) => (i % 3 === 0 ? `${Math.ceil(x(d))}°` : ""))
        )
        .call((g) =>
          g
            .append("path")
            .attr("id", (_, i) => `po-${i}`)
            .datum((d) => [d, d + step])
            .attr("fill", "none")
            .attr(
              "d",
              ([a, b]) => `
           M${pointRadial(a, outerRadius + 20)}
           A${outerRadius + 20},${outerRadius + 20} 0,0,1 ${pointRadial(b, outerRadius + 20)}
         `
            )
        )
        .call((g) =>
          g
            .append("text")
            .append("textPath")
            .attr("class", "x-axis")
            .attr("startOffset", 6)
            .attr("font-size", 16)
            .attr("stoke-width", 1)
            .attr("xlink:href", (_, i) => `#po-${i}`)
            .text((d) => `${Math.ceil(x(d))}°`)
        )
    );
};

const yAxes = (g: SVGSelection, y: XYScale, tickCount: number) => {
  g.append("g")
    .attr("text-anchor", "middle")
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
            .attr("class", "y-axis")
            .attr("stroke-dasharray", "4")
            .attr("r", y)
        )
    );
};

export function transitionDounts(
  g: DountsSelection,
  data: DataShape[][],
  getDountScale: (i: number) => ScaleLinear<number, number, never>,
  duration: number,
  curve: any
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
export function transitionPoints(
  g: PointsSelection,
  data: DataShape[][],
  duration: number,
  innerRadius: number,
  outerRadius: number
) {
  const fast = transition().duration(duration).ease(easeFn);
  const y = scaleLinear()
    .range([innerRadius, outerRadius])
    .domain([0, data.length]);
  g.data(data).call((selection) => {
    selection
      .selectAll("circle")
      .data((d) => d)
      .transition(fast)
      .attr(
        "cx",
        (v, j) =>
          pointRadial(
            (j * Math.PI * 2) / data[v.dount].length,
            y(v.dount + v.value)
          )[0]
      )
      .attr(
        "cy",
        (v, j) =>
          pointRadial(
            (j * Math.PI * 2) / data[v.dount].length,
            y(v.dount + v.value)
          )[1]
      );
  });
}
