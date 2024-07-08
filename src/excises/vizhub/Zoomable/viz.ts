import { select } from "d3-selection";
import { zoom } from "d3-zoom";
import { Dispatch, RefObject, SetStateAction } from "react";
import { data } from "@/excises/vizhub/Circles/data";
export interface ZoomState {
  transform: string;
}

export const main = (
  containerRef: RefObject<HTMLDivElement>,
  {
    state,
    setState,
  }: {
    state: ZoomState;
    setState: Dispatch<SetStateAction<ZoomState>>;
  }
) => {
  const width = containerRef.current!.clientWidth;
  const height = containerRef.current!.clientHeight;

  const svg = select(containerRef.current)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#F0FFF4");

  const zoomBehavior = zoom<SVGGElement, any[]>().on("zoom", (event) => {
    setState((state) => ({
      ...state,
      transform: event.transform,
    }));
  });

  svg.call(zoomBehavior as any);

  const { transform } = state;

  const g = svg.selectAll("g").data([null]).join("g");

  g.attr("transform", transform);

  g.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .attr("fill", (d) => d.fill)
    .attr("opacity", 708 / 1000);
};
