import { select } from "d3-selection";
import { transition } from "d3-transition";
import { RefObject } from "react";
import { data } from "./data";
type DataShape = (typeof data)[0];
export const main = (container: RefObject<HTMLDivElement>) => {
  if (!container.current) {
    return;
  }
  const width = container.current.clientWidth;
  const height = container.current.clientHeight;

  const xValue = (d: DataShape) =>
    d.name === "Sun" ? -325 : (d.distance * 2217) / 100 + 47;
  const yValue = height / 2;
  const rValue = (d: DataShape) => (d.radius * 322) / 100;
  const yLabelValue = (d: DataShape) =>
    rValue(d) + yValue + 5 + (d.labelOffset ? d.labelOffset : 0);
  const labelValue = (d: DataShape) => d.name;
  const fast = transition().duration(500);
  const svg = select(container.current)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#000000");

  svg
    .selectAll("circle")
    .data(data)
    .join(
      (enter) => {
        return enter
          .append("circle")
          .attr("cx", xValue)
          .attr("cy", yValue)
          .attr("r", 0)
          .attr("fill", (d) => d.fill)
          .call((selection) => {
            selection
              .transition(fast)
              .delay((_, i) => i * 100)
              .attr("r", rValue);
          });
      },
      (update) =>
        update.call((selection) =>
          selection
            .transition(fast)
            .attr("cx", xValue)
            .attr("cy", yValue)
            .attr("r", rValue)
        )
    );

  svg
    .selectAll("text")
    .data(data)
    .join((enter) =>
      enter
        .append("text")
        .attr("x", xValue)
        .attr("y", yLabelValue)
        .attr("opacity", 0)
        .call((selection) =>
          selection
            .transition(fast)
            .delay((_, i) => i * 100)
            .attr("opacity", 1)
        )
    )
    .text(labelValue)
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "hanging");
};
