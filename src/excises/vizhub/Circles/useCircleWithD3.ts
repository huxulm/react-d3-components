import { RefObject, useEffect } from "react";
import { data } from "./data";
import { select } from "d3-selection";

export const useCircleWithD3 = (containerRef: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const svg = select(containerRef.current)
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", containerRef.current.clientWidth)
      .attr("height", containerRef.current.clientHeight)
      .style("background", "#f0fff4");

    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.r)
      .attr("fill", (d) => d.fill)
      .attr("opacity", 708 / 1000);
  }, [containerRef]);
  return null;
};
