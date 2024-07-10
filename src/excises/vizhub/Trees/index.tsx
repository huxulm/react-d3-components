import { hierarchy, tree } from "d3-hierarchy";
import { data, DataShape } from "./data";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { main } from "./viz";

export const Trees = () => {
  const ref = useRef<HTMLDivElement>(null);
  const radialTreeFn = useCallback(
    (container: RefObject<HTMLDivElement>) => {
      if (!container.current) {
        return [null, null];
      }
      const width = container.current?.clientWidth;
      const height = container.current?.clientHeight;
      const radius = Math.min(width, height) / 2;
      const layout = tree<DataShape>()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

      const nodes = layout(hierarchy<DataShape>(data));
      return [nodes.descendants(), nodes.links()];
    },
    [ref]
  );
  
  useEffect(() => {
    const [nodes, links] = radialTreeFn(ref)
    main(ref, { nodes: nodes as any, links: links as any })}, [ref]);
  return <div style={{ width: "100vw", height: "100vh" }} ref={ref} />;
};
