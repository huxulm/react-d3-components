import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { hierarchy, tree, cluster } from "d3-hierarchy";
import { HierarchyPointLink, HierarchyPointNode } from "d3-hierarchy";
import { data, DataShape } from "./data";
import {
  LinksSelection,
  main,
  MainSelection,
  NodesSelection,
  Sizes,
  transitionToRadialCluster,
  transitionToRadialTree,
} from "./viz";

type LayoutType = "radial tree" | "radial cluster";
export const Trees = () => {
  const ref = useRef<HTMLDivElement>(null);
  // selections
  const mainRef = useRef<MainSelection>(null);
  const nodesRef = useRef<NodesSelection>(null);
  const linksRef = useRef<LinksSelection>(null);

  // transition druation
  const [duration, setDuration] = useState(1000);

  const [layoutType, setLayoutType] = useState<LayoutType>("radial tree");
  const getSize = useCallback(
    (ref: RefObject<HTMLDivElement>): Sizes => {
      const width = ref.current!.clientWidth;
      const height = ref.current!.clientHeight;
      return { width, height, radius: Math.min(width, height) / 2 };
    },
    [ref]
  );
  const radialTreeFn = useCallback((): [
    HierarchyPointNode<DataShape>[],
    HierarchyPointLink<DataShape>[],
    Sizes,
  ] => {
    const sizes = getSize(ref);
    const layout = tree<DataShape>()
      .size([2 * Math.PI, sizes.radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
    const nodes = layout(hierarchy<DataShape>(data));
    return [nodes.descendants(), nodes.links(), sizes];
  }, [ref, getSize]);

  const radialTreeClusterFn = useCallback((): [
    HierarchyPointNode<DataShape>[],
    HierarchyPointLink<DataShape>[],
    Sizes,
  ] => {
    const sizes = getSize(ref);
    const layout = cluster<DataShape>()
      .size([2 * Math.PI, sizes.radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
    const nodes = layout(hierarchy<DataShape>(data));
    return [nodes.descendants(), nodes.links(), sizes];
  }, [ref, getSize]);

  // 初始化
  useEffect(() => {
    const [nodes, links, sizes] = radialTreeFn();
    const [MainSelection, NodesSelection, LinksSelection] = main(ref, {
      nodes,
      links,
      sizes,
    });
    mainRef.current = MainSelection;
    nodesRef.current = NodesSelection;
    linksRef.current = LinksSelection;
  }, [ref]);
  const changeToRadialCluster = () => {
    setLayoutType("radial cluster");
    transitionToRadialCluster(
      radialTreeClusterFn,
      mainRef.current,
      nodesRef.current,
      linksRef.current,
      duration
    );
  };
  const changeToRadial = () => {
    setLayoutType("radial tree");
    transitionToRadialTree(
      radialTreeFn,
      mainRef.current,
      nodesRef.current,
      linksRef.current,
      duration
    );
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref}>
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          display: "flex",
          flexDirection: "column",
          border: "1px dotted black",
          padding: 5,
        }}
      >
        <label>
          <label>过渡时间(0~2s)</label>
          <input
            type="range"
            value={duration}
            min={0}
            max={2000}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
          />
        </label>
        <label onClick={changeToRadial}>
          <input
            type="radio"
            id="radial tree"
            checked={layoutType === "radial tree"}
            value={"radial tree"}
          />
          <label>径向树</label>
        </label>
        <label onClick={changeToRadialCluster}>
          <input
            type="radio"
            checked={layoutType === "radial cluster"}
            value={"radial cluster"}
          />
          <label>径向聚类树</label>
        </label>
      </div>
    </div>
  );
};
