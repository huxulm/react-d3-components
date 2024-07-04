// @ts-ignore
import { data } from "@/excises/vizhub/data/daily-surface-air-temperature";
import { useEffect } from "react";
import { select } from "d3-selection";
import { viz, DataShape } from "./viz";
import { useResizeObserver } from "reaviz";

export const MultipleLines = () => {
  const [ref, size] = useResizeObserver<HTMLDivElement>();
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const svg = select<any, DataShape[]>(ref.current)
      .selectAll("svg")
      .data([null])
      .join<any, DataShape[]>("svg")
      .attr("width", size.width as any)
      .attr("height", size.height as any);

    viz(svg as any, {
      data,
      xValue: (d: DataShape) => d.day_of_year,
      xAxisLabelText: "Day of Year",
      xAxisLabelOffset: 38,
      yValue: (d: DataShape) => d.airTemp,
      lineValue: (d: DataShape) => d.year,
      yAxisLabelText: "Air Temperature",
      yAxisLabelOffset: 17,
      innerRectFill: "#E8E8E8",
      lineOpacity: 416 / 1000,
      marginTop: 20,
      marginBottom: 50,
      marginLeft: 54,
      marginRight: 20,
      width: size.width as any,
      height: size.height as any,
    });
  }, [ref, size]);
  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};
