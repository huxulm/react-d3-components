import type { Meta, StoryObj } from "@storybook/react";
import { MotionPath } from "./MotionPath";
const meta = {
  title: "Excises/motion/MotionPath",
  component: MotionPath,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof MotionPath>;
export default meta;
export const Default: StoryObj<any> = {
  args: {
    width: "80vw",
    height: "80vw",
  },
  render: (args) => {
    return (
      <div style={{ ...args }}>
        <MotionPath width={500} height={500} />
      </div>
    );
  },
};
