import { extent, scaleLinear } from "d3";
import { FC } from "react";
import { motion } from "framer-motion";
import {
  LinearAxisProps,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries,
  getXScale,
  getYScale,
} from "reaviz";
import { CloneElement } from "reablocks";
interface ScatterPlotProps {
  width?: number;
  height?: number;
  margin?: number | [number, number] | [number, number, number, number];
  data: any[];
  pointStyle?: any;
  animate?: boolean;
}

const ScatterPlot: FC<ScatterPlotProps> = (props) => {
  const {
    data,
    width = 100,
    height = 100,
    margin = [25, 25, 25, 25],
    pointStyle = {},
    animate = true,
  } = props;
  let marginLeft = 0,
    marginRight = 0,
    marginTop = 0,
    marginBottom = 0;
  if (typeof margin == "number") {
    marginLeft = margin;
    marginRight = margin;
    marginTop = margin;
    marginBottom = margin;
  } else if (margin instanceof Array) {
    if (margin.length == 2) {
      marginLeft = margin[0];
      marginRight = margin[0];
      marginTop = margin[1];
      marginBottom = margin[1];
    } else {
      marginLeft = margin[0];
      marginRight = margin[1];
      marginTop = margin[2];
      marginBottom = margin[3];
    }
  }
  const chartHeight = height - marginTop - marginBottom;
  const chartWidth = width - marginLeft - marginRight;
  const xDomains = extent(data, (d) => d.x) as [number, number];
  const yDomains = extent(data, (d) => d.y) as [number, number];
  const xScale = scaleLinear<any>()
    .domain(xDomains).nice()
    .range([marginLeft, chartWidth + marginLeft]);
  const yScale = scaleLinear<any>()
    .domain(yDomains).nice()
    .range([chartHeight + marginBottom, marginBottom]);
  let initialFn = (d: any) => ({ r: animate ? 0 : 10 }),
    animateFn = (d: any) => ({ r: 10 });
  const XAxis = (
    <LinearXAxis
      type="value"
      position="center"
      height={chartHeight}
      tickSeries={
        <LinearXAxisTickSeries
          line={<LinearXAxisTickLine position="center" />}
          label={<LinearXAxisTickLabel padding={3} />}
        />
      }
    />
  );
  const YAxis = (
    <LinearYAxis
      type="value"
      position="center"
      width={chartWidth}
      tickSeries={
        <LinearYAxisTickSeries
          line={<LinearYAxisTickLine position="center" />}
          label={<LinearYAxisTickLabel padding={3} />}
        />
      }
    />
  );
  return (
    <svg
      width={width}
      height={height}
      style={{
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
        overflow: "visible",
      }}
    >
      {/* X axis */}
      <CloneElement<LinearAxisProps>
        element={XAxis}
        width={width}
        height={height}
        scale={getXScale({
          width: width,
          type: "value",
          roundDomains: false,
          data: data,
          domain: xDomains,
        })}
      />
      {/* Y axis */}
      <CloneElement<LinearAxisProps>
        element={YAxis}
        width={width}
        height={height}
        scale={getYScale({
          height: height,
          type: "value",
          roundDomains: false,
          data: data,
          domain: yDomains,
        })}
      />
      {data.map((d) => {
        return (
          <motion.circle
            initial={initialFn(d)}
            animate={animateFn(d)}
            cx={xScale(d.x)}
            cy={yScale(d.y)}
            style={pointStyle}
          />
        );
      })}
    </svg>
  );
};
export default ScatterPlot;
