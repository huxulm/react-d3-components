import { useEffect, useRef } from "react";
import { viz } from "./viz";
interface VizWrapperProps {
  width?: number;
  height?: number;
}
export const VizWrapper = ({ width, height }: VizWrapperProps) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    viz(ref, width!, height!);
  }, [width, height]);
  return <svg width={width} height={height} ref={ref} />;
};
