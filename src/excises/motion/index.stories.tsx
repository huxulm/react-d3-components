import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Animation as ExampleAnimation } from "./Animation";
import { KeyFrames as ExampleKeyFrames } from "./KeyFrames";
import { Variants as ExampleVaraints } from "./Variants";
import { Gesture as ExampleGesture } from "./Gesture";
import { Refresh } from "./Refresh";
import { MotionProps } from "framer-motion";
import { DragExample } from "./Drag";
import { ExampleMotionValues } from "./MotionValues";
import { LineDrawExample } from "./LineDraw";
import { TransitionExample } from "./Transition";

const meta = {
  title: "Excises/motion",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>;
export default meta;

export const Animation: StoryObj = {
  args: {},
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <>
        <Refresh onClick={() => setCount(count + 1)} />
        <ExampleAnimation key={count} />
      </>
    );
  },
};

export const KeyFrames: StoryObj<MotionProps> = {
  name: "KeyFrames",
  args: {
    animate: {
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 180, 180, 0, 0],
      borderRadius: ["0%", "0%", "50%", "50%", 0],
    },
    transition: {
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
  render: (motionProps) => {
    const [count, setCount] = useState(0);
    return (
      <>
        <Refresh onClick={() => setCount(count + 1)} />
        <ExampleKeyFrames key={count} {...motionProps} />
      </>
    );
  },
};

export const Variants: StoryObj = {
  args: {},
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={{ width: "100vw" }}>
        <ExampleVaraints />
      </div>
    );
  },
};

export const Gesture: StoryObj<MotionProps> = {
  args: {
    whileHover: {
      scale: 1.2,
    },
    whileTap: {
      scale: 0.8,
    },
  },
  render: (args) => {
    return (
      <div className="gesture-container">
        <ExampleGesture {...args} />
      </div>
    );
  },
};

export const Drag: StoryObj = {
  args: {},
  render: () => {
    return <DragExample />;
  },
};

export const MotionValues: StoryObj = {
  args: {},
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return <ExampleMotionValues />;
  },
};

export const LineDraw: StoryObj<{width: number, height: number}> = {
  args: {
    width: 200,
    height: 200,
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => {
    return <LineDrawExample {...args}/>;
  },
};

export const Transition: StoryObj = {
  render: () => <TransitionExample />
}

