import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { Responsive } from "@/common/utils/responsive/Responsive";
import { useCircleWithD3 } from "./Circles/useCircleWithD3";
import { CirclesWithD3 } from "./Circles";
import { MultipleLines } from "./MultipleLines";
import { TransitionWithD3, Transition } from "./Transitions";
import { Zoomable, ZoomableD3 } from "./Zoomable";
import { BrushD3 } from "./Brush";
import { SolarSystemdD3 } from "./SolarSystem";
import { VoronoiD3, VoronoiDragWithD3 } from "./Voronoi";
import { HierarchyD3 } from "./Hierarchy";
import { Trees, D3Trees } from "./Trees";
import { Dount, DountNoFramerMotion } from "./Dount";
import { Radial } from "./Radial";

export default {
  title: "Excises/vizhub",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export const ExampleCircleWithD3: StoryObj = {
  name: "CircleWithD3",
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    useCircleWithD3(ref);
    return <div ref={ref} style={{ width: "100vw", height: "100vh" }}></div>;
  },
};

export const ExampleCircleWithD3_1: StoryObj = {
  name: "CircleWithD3_1",
  render: () => {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Responsive>{(props) => <CirclesWithD3 {...props} />}</Responsive>
      </div>
    );
  },
};

export const ExampleMulitpleLines: StoryObj = {
  name: "MulipleLines",
  render: () => {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <MultipleLines />
      </div>
    );
  },
};

export const ExampleD3Transition: StoryObj = {
  name: "Transition (d3-transition)",
  render: () => <TransitionWithD3 />,
};

export const ExampleD3Transition_1: StoryObj = {
  name: "Transition (only React)",
  render: () => <Transition />,
};

export const ExampleD3Zoomable: StoryObj = {
  name: "Zoomable (d3-zoom)",
  render: () => <ZoomableD3 />,
};

export const ExampleZoomable: StoryObj = {
  name: "Zoomable (only React)",
  render: () => <Zoomable />,
};

export const ExampleD3Brush: StoryObj = {
  name: "Brush (d3-brush)",
  render: () => <BrushD3 />,
};

export const ExampleSolarySystem: StoryObj = {
  name: "SolarSystem (d3)",
  render: () => <SolarSystemdD3 />,
};

export const ExampleD3Voronoi: StoryObj = {
  name: "Voronoi (d3)",
  render: () => <VoronoiD3 />,
};

export const ExampleVoronoi: StoryObj = {
  name: "Voronoi (react)",
  render: () => <VoronoiDragWithD3 />,
};

export const ExampleHierarchyD3: StoryObj = {
  name: "Hierarchy (d3)",
  render: () => <HierarchyD3 />,
};

export const ExampleHierarchyTreesD3: StoryObj = {
  name: "HierarchyTrees (d3)",
  render: () => <D3Trees />,
};

export const ExampleHierarchyTrees: StoryObj = {
  name: "HierarchyTrees (react)",
  render: () => <Trees />,
};

export const ExampleDounts: StoryObj = {
  name: "Dounts (react + motion)",
  render: () => <Dount />,
};

export const ExampleDountsWithoutMotion: StoryObj = {
  name: "Dounts (react no motion)",
  render: () => <DountNoFramerMotion />,
};

export const ExampleRadial: StoryObj = {
  name: "Radial (d3)",
  render: () => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Radial />
    </div>
  ),
};

export const ExampleGridsRadial: StoryObj = {
  name: "Radial Grids (d3)",
  render: () => {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <div style={{ height: "50vh", width: "100vw", display: "flex" }}>
          <div style={{ height: "100%", width: "50vw" }}>
            <Radial initDounts={5}/>
          </div>
          <div style={{ height: "100%", width: "50vw" }}>
            <Radial initDounts={10}/>
          </div>
        </div>
        <div style={{ height: "50vh", width: "100vw", display: "flex" }}>
          <div style={{ height: "100%", width: "50vw" }}>
            <Radial initDounts={20}/>
          </div>
          <div style={{ height: "100%", width: "50vw" }}>
            <Radial initDounts={30}/>
          </div>
        </div>
      </div>
    );
  },
};
