import { RefObject } from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";

interface DataShape {
    id: number;
    x: number;
    y: number;
    r: number;
    fill: string;
}

export const main = (container: RefObject<HTMLDivElement>, data: DataShape[]) => {
  const width = container.current?.clientWidth;
  const height = container.current?.clientHeight;
  const svg = select(container.current)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width!)
    .attr("height", height!)
    .style("background", "#f3fff0");

  const slow = transition().duration(2000);
  const fast = transition().duration(500);
  svg
    .selectAll("circle")
    .data(data)
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", 0)
          .call((selection) => {
            selection
              .transition(slow)
              .delay((d, i) => i * 200)
              .attr("r", (d) => d.r);
          }),

      (update) =>
        update.call((selection) => {
          selection
            .transition(fast)
            .delay((d, i) => i * 20)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", (d) => d.r);
        }),

      (exit) => exit.call((selection) => selection.attr("r", 0).remove())
    )
    .attr("fill", (d) => d.fill)
    .attr("opacity", 708 / 1000);
};
