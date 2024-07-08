import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { Responsive } from "@/common/utils/responsive/Responsive";
import { useCircleWithD3 } from "./CirclesWithD3/useCircleWithD3";
import { CirclesWithD3 } from "./CirclesWithD3";
import { MultipleLines } from "./MultipleLines";
import { TransitionWithD3, Transition } from "./Transitions";

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
  name: "Transition",
  render: () => <TransitionWithD3 />,
};

export const ExampleD3Transition_1: StoryObj = {
  name: "Transition_1",
  render: () => <Transition />,
};
