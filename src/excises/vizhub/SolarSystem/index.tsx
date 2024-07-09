import { useEffect, useRef } from "react";
import { main } from "./viz";

export function SolarSystemdD3() {
  const ref = useRef(null);
  useEffect(() => main(ref), [ref]);
  return <div style={{ width: "100vw", height: "100vh" }} ref={ref}></div>;
}
