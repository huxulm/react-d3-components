import {
  SVGAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dispatch, RefObject, SetStateAction } from "react";
import { hierarchy, tree, cluster } from "d3-hierarchy";
import { HierarchyPointLink, HierarchyPointNode } from "d3-hierarchy";
import { select } from "d3-selection";
import { zoom } from "d3-zoom";
import { motion } from "framer-motion";

import { data, DataShape } from "./data";
import {
  colorFn,
  main,
  radialDiagonal,
  transitionToRadialCluster,
  transitionToRadialTree,
} from "./viz";
import { LinksSelection, MainSelection, NodesSelection, Sizes } from "./viz";

type LayoutType = "radial tree" | "radial cluster" | null;

const Controller = ({
  duration,
  mn,
  mx,
  setDuration,
  layoutType,
  changeToRadial,
  changeToRadialCluster,
}: {
  duration: number;
  mn: number;
  mx: number;
  setDuration: Dispatch<SetStateAction<number>>;
  layoutType: LayoutType;
  changeToRadial: () => void;
  changeToRadialCluster: () => void;
}) => {
  return (
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
        <label>过渡时间{`(${mn}~${mx})s`}</label>
        <input
          type="range"
          value={duration}
          min={mn}
          max={mx}
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
  );
};

export const D3Trees = () => {
  const ref = useRef<HTMLDivElement>(null);
  // selections
  const mainRef = useRef<MainSelection>(null);
  const nodesRef = useRef<NodesSelection>(null);
  const linksRef = useRef<LinksSelection>(null);

  // transition druation
  const [duration, setDuration] = useState(1);
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
      duration * 1000 // to mills
    );
  };
  const changeToRadial = () => {
    setLayoutType("radial tree");
    transitionToRadialTree(
      radialTreeFn,
      mainRef.current,
      nodesRef.current,
      linksRef.current,
      duration * 1000 // to mills
    );
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref}>
      <Controller
        duration={duration}
        mn={0}
        mx={10}
        setDuration={setDuration}
        changeToRadial={changeToRadial}
        changeToRadialCluster={changeToRadialCluster}
        layoutType={layoutType}
      />
    </div>
  );
};

export const Trees = () => {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [duration, setDuration] = useState(2);

  const [layoutType, setLayoutType] = useState<LayoutType>(null);

  const changeToRadial = () => {
    setLayoutType("radial tree");
  };

  const getSize = useCallback(
    (ref: RefObject<HTMLDivElement>): Sizes => {
      if (!ref.current) {
        return { width: 0, height: 0, radius: 0 };
      }
      const width = ref.current!.clientWidth;
      const height = ref.current!.clientHeight;
      return { width, height, radius: Math.min(width, height) / 2 };
    },
    [ref]
  );

  const [sizes, setSizes] = useState<Sizes>(getSize(ref));
  useEffect(() => {
    setSizes(getSize(ref));
    setLayoutType("radial tree");
  }, [ref]);

  const changeToRadialCluster = () => {
    setLayoutType("radial cluster");
  };

  const radialTreeFn = useCallback((): [
    HierarchyPointNode<DataShape>[],
    HierarchyPointLink<DataShape>[],
    Sizes,
  ] => {
    // const sizes = getSize(ref);
    const layout = tree<DataShape>()
      .size([2 * Math.PI, sizes.radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
    const nodes = layout(hierarchy<DataShape>(data));
    return [nodes.descendants(), nodes.links(), sizes];
  }, [ref, sizes]);

  const radialTreeClusterFn = useCallback((): [
    HierarchyPointNode<DataShape>[],
    HierarchyPointLink<DataShape>[],
    Sizes,
  ] => {
    // const sizes = getSize(ref);
    const layout = cluster<DataShape>()
      .size([2 * Math.PI, sizes.radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
    const nodes = layout(hierarchy<DataShape>(data));
    return [nodes.descendants(), nodes.links(), sizes];
  }, [ref, sizes]);

  const svgProps = useMemo(() => {
    // const sizes = getSize(ref);
    return {
      width: sizes.width,
      height: sizes.height,
    } satisfies SVGAttributes<SVGSVGElement>;
  }, [ref, sizes]);

  const transform = useMemo(() => {
    const { width, height } = getSize(ref);
    return `translate(${width / 2}, ${height / 2})`;
  }, [ref, layoutType, sizes]);

  // add zoom listener
  const [zoomTransform, setZoomTransform] = useState<string>("");
  useEffect(() => {
    select(svgRef.current).call(
      zoom().on("zoom", (event) => {
        setZoomTransform(event.transform);
      }) as any
    );
  }, [svgRef]);

  const [nodes, links] = useMemo<
    [
      HierarchyPointNode<DataShape>[] | null,
      HierarchyPointLink<DataShape>[] | null,
    ]
  >(() => {
    if (!ref.current) {
      return [null, null];
    }
    let nodes: HierarchyPointNode<DataShape>[];
    let links: HierarchyPointLink<DataShape>[];
    if (layoutType === "radial tree") {
      [nodes, links] = radialTreeFn();
    } else {
      [nodes, links] = radialTreeClusterFn();
    }
    return [nodes, links];
  }, [ref, getSize, layoutType]);

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={ref}>
      <Controller
        duration={duration}
        mn={0}
        mx={10}
        setDuration={setDuration}
        changeToRadial={changeToRadial}
        changeToRadialCluster={changeToRadialCluster}
        layoutType={layoutType}
      />
      <motion.svg {...svgProps}>
        <motion.g transform={transform} ref={svgRef}>
          <motion.g transform={zoomTransform}>
            {/* render links */}
            {links &&
              links.map((d, i) => {
                return (
                  <motion.path
                    animate={{ d: radialDiagonal(d, i) }}
                    transition={{
                      delay: (i * duration) / links.length,
                      // duration: duration,
                    }}
                    fill={"none"}
                    stroke={colorFn(links.length)(d, i)}
                    strokeWidth={2}
                  />
                );
              })}
            {/* render nodes */}
            {nodes &&
              nodes.map((d, i) => {
                return (
                  <motion.g
                    transform={`rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y}, 0)`}
                  >
                    <motion.circle
                      initial={{ r: 0 }}
                      animate={{ r: 10 }}
                      fill={"white"}
                      stroke={colorFn(nodes.length)(d, i)}
                      strokeWidth={2}
                    />
                  </motion.g>
                );
              })}
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
};
