import { useEffect, useRef, useState } from "react";
import { data, DataShape } from "./data";
import { main } from "./vis";

export function Voronoi() {
  const [state, setState] = useState<DataShape[]>(data);
  const ref = useRef(null);
  useEffect(() => main(ref, { state, setState }), [ref, state]);
  return <div style={{ width: "100vw", height: "100vh" }} ref={ref}></div>;
}
