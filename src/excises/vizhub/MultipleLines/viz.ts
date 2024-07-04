import { scaleLinear, scaleSequential } from "d3-scale";
import { extent, flatGroup } from "d3-array";
import { line } from "d3-shape";
import { Selection } from "d3-selection";
import { interpolatePlasma } from "d3-scale-chromatic";
export type VizProps = {
  data: DataShape[];
  xValue: any;
  xAxisLabelText: any;
  xAxisLabelOffset: any;
  yValue: any;
  yAxisLabelText: any;
  yAxisLabelOffset: any;
  lineValue: any;
  marginLeft: any;
  marginTop: any;
  marginRight: any;
  marginBottom: any;
  width: any;
  height: any;
  innerRectFill: any;
  lineOpacity: any;
};

export type DataShape = {
  day_of_year: number;
  year: number;
  airTemp: number | null;
  value: string;
};
export const viz = (
  svg: Selection<SVGElement, DataShape[], any, any>,
  {
    data,
    xValue,
    yValue,
    lineValue,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    width,
    height,
    lineOpacity,
  }: VizProps
) => {
  const xScale = scaleLinear(extent(data, xValue) as Iterable<number>, [
    marginLeft,
    width - marginRight,
  ]);
  const yScale = scaleLinear(extent(data, yValue) as Iterable<number>, [
    height - marginBottom,
    marginTop,
  ]);

  const colorScale = scaleSequential(
    extent(data, lineValue).reverse() as Iterable<number>,
    interpolatePlasma
  );

  //   const innerWidth = width - marginLeft - marginRight;
  //   const innerHeight = height - marginTop - marginBottom;

  const lineGenerator = line(
    (d) => xScale(xValue(d)),
    (d) => yScale(yValue(d))
  ).defined(yValue);

  const dataGrouped = flatGroup(data, lineValue);

  // Multiple lines, one for each group
  svg
    .selectAll("path.mark")
    .data(dataGrouped)
    .join("path")
    .attr("class", "mark")
    .attr("fill", "none")
    .attr("stroke-linecap", "round")
    .attr("stroke", "black")
    .attr("opacity", (d) => (d[0] === 2024 ? 1 : lineOpacity))
    .attr("stroke-width", (d) => {
      if (d[0] === 2024) return 6;
      return 1;
    })
    .attr("stroke", (d) => {
      // `d` here has the following structure:
      // [year, arrayOfValues[]]
      if (d[0] === 2024) return "red";
      return colorScale(d[0] as number);
    })
    .attr("d", (d) => lineGenerator(d[1] as Iterable<[number, number]>));
};
