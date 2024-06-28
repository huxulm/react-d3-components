import type { Meta, StoryObj } from "@storybook/react";
import { AnimationDiv } from ".";

const meta = {
  title: "Excises/motion/Animation",
  component: AnimationDiv,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AnimationDiv>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Animation: Story = {
  name: "spring",
  args: {
    className: "box",
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 5,
      type: "spring",
    },
  },
};
export const AnimationTween: Story = {
  name: "tween",
  args: {
    className: "box",
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 5,
      type: "tween",
    },
  },
};

export const AnimationGesture: Story = {
  name: "gesture",
  args: {
    className: "box",
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
};
export const AnimationDrag: Story = {
  name: "drag",
  args: {
    initial: { width: 200, height: 200, background: "orange", borderRadius: 20 },
    drag: true,
    dragConstraints: {
      top: -200,
      left: -200,
      right: 200,
      bottom: 200,
    },
  },
  render: (args) => {
    return <div style={{display: "flex", justifyContent: "center", padding: 200, background: "#dedede", borderRadius: 20 }}>
      <AnimationDiv {...args}/>
    </div>
  }
};
export const Keyframes: Story = {
  args: {
    initial: {
      width: 100,
      height: 100,
      background: "orange",
    },
    animate: {
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    },
    transition: {
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};
