import { Dispatch, RefObject, SetStateAction } from "react";
import { select } from "d3-selection";
import { brush } from "d3-brush";
import { data } from "../Circles/data";
type DataShape = typeof data & { id: number };

export interface VizProps {
  highlightedSet: Set<DataShape["id"]>;
  setHighlighted: Dispatch<SetStateAction<Set<DataShape["id"]>>>;
}
export const main = (
  containerRef: RefObject<HTMLDivElement>,
  { highlightedSet, setHighlighted }: VizProps
) => {
  if (!containerRef.current) {
    return;
  }
  const container = containerRef.current;
  const width = container.clientWidth;
  const height = container.clientHeight;
  data.forEach((d, i) => (d.id = i));
  const svg = select(container)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#F0FFF4");
  svg
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .attr("fill", (d) => d.fill)
    .attr("stroke", (d) => {
      return highlightedSet.has(d.id) ? "black" : "none";
    })
    .attr("stroke-width", 5)
    .attr("opacity", 708 / 1000);

  const brushBehavior = brush()
    .on("brush", (event) => {
      const [[x0, y0], [x1, y1]]: Iterable<Iterable<number>> = event.selection;
      const newHighlightedSet = new Set<number>();
      for (const d of data) {
        if (d.x >= x0 && d.x <= x1 && d.y >= y0 && d.y <= y1) {
          newHighlightedSet.add(d.id);
        }
      }
      setHighlighted(newHighlightedSet);
    })
    .on("end", (event) => {
      if (!event.selection) {
        setHighlighted(new Set());
      }
    });

  svg
    .selectAll("g.brush")
    .data([null])
    .join("g")
    .attr("class", "brush")
    .call(brushBehavior as any);
};
