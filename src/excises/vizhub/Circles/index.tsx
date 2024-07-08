import { Size } from "@/common/utils/responsive/useParentSize";
import { data } from "./data";

export const CirclesWithD3 = ({ width, height }: Size) => {
  return (
    <svg width={width} height={height} style={{ background: "#f0fff4" }}>
      {data.map((d) => {
        return (
          <circle
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.fill}
            opacity={708 / 1000}
          />
        );
      })}
    </svg>
  );
};
