import { useEffect, useRef, useState } from "react";
import { main, VizProps } from "./viz";

export function BrushD3() {
  const ref = useRef<HTMLDivElement>(null);
  const [highlightedSet, setHighlighted] = useState<VizProps["highlightedSet"]>(
    new Set()
  );
  useEffect(
    () => main(ref, { highlightedSet, setHighlighted }),
    [highlightedSet, ref]
  );
  return <div style={{ width: "100vw", height: "100vh" }} ref={ref}></div>;
}
