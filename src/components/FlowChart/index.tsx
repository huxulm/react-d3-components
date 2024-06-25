import { FC, useState } from "react";
import { scaleOrdinal, schemeCategory10 } from "d3";
import {
  Canvas,
  EdgeData,
  NodeData,
  CanvasDirection,
  Node,
  Edge,
  MarkerArrow,
  hasLink,
  Icon,
} from "reaflow";

export interface FlowChartProps {
  width: number;
  height: number;
  nodes: NodeData[];
  edges: EdgeData[];
  dir: CanvasDirection;
  animate?: boolean;
}

const FlowChart: FC<Partial<FlowChartProps>> = (props) => {
  const {
    nodes = [],
    edges = [],
    height = 500,
    width = 500,
    dir = "RIGHT",
    animate = true,
  } = props;
  const [_nodes] = useState<NodeData[]>(nodes);
  const [selections, setSelections] = useState<string[]>(["1", "1-2"]);
  const [_edges, setEdges] = useState<EdgeData[]>(edges);
  const color = scaleOrdinal(schemeCategory10).domain(nodes.map((v) => v.id));
  const getColor = (id?: string) => {
    const seed = Math.ceil(Math.random() * schemeCategory10.length);
    if (id) {
      return color(id);
    }
    return color(seed + "");
  };

  const arrowColor = getColor();

  return (
    <div
      style={{
        position: "absolute",
        minWidth: width,
        minHeight: height,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <style>
        {`
        .edge {
          stroke: #b1b1b7;
          stroke-dasharray: 5;
          stroke-width: 1;
        }
        .edge.start {
          animation: dashdraw .2s linear infinite;
        }
        .edge.stop {
          animation: none;
        }
        @keyframes dashdraw {
          0% { stroke-dashoffset: 10; }
        }
        `}
      </style>
      <Canvas
        direction={dir}
        nodes={_nodes}
        selections={selections}
        node={(props) => (
          <Node
            // {...props}
            style={{ fill: getColor(props.id), "stroke-width": 0 }}
            icon={<Icon />}
          ></Node>
        )}
        edges={_edges}
        arrow={
          <MarkerArrow
            size={4}
            style={{ stroke: arrowColor, fill: arrowColor }}
          />
        }
        edge={(props) => {
          return (
            <Edge
              onClick={(event, edge) => {
                console.log("Selecting Edge", event, edge);
                setSelections([edge.id]);
              }}
              onRemove={(event, edge) => {
                console.log("Removing Edge", event, edge);
                setEdges(_edges.filter((e) => e.id !== edge.id));
                setSelections([]);
              }}
              className={`edge ${animate ? "start" : "stop"}`}
              style={{
                "stroke-width": 2,
                stroke: getColor(props.properties?.from),
              }}
            />
          );
        }}
        onNodeLinkCheck={(_event, from: NodeData, to: NodeData) => {
          if (from.id === to.id) {
            return false;
          }
          if (hasLink(_edges, from, to)) {
            return false;
          }
          return true;
        }}
        onNodeLink={(_event, from: NodeData, to: NodeData) => {
          const id = `${from.id}-${to.id}`;
          setEdges([
            ..._edges,
            {
              id,
              from: from.id,
              to: to.id,
              parent: to.parent,
            },
          ]);
        }}
      ></Canvas>
    </div>
  );
};
export default FlowChart;
