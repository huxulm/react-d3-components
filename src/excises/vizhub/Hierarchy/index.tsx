import { useEffect, useRef } from "react";
import { data } from "./data";
import { main } from "./viz";

export const HierarchyD3 = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => main(ref, data), [ref]);
  return <div style={{ width: "100vw", height: "100vh" }} ref={ref} />;
};
