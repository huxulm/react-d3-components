import type { Meta, StoryObj } from "@storybook/react";
import { lazy } from "react";
const Example = lazy(() => import("."));

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Excises/motion/useSpring",
  component: Example,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div
        style={{
          display: "flex",
          textAlign: "center",
          placeContent: "center",
          placeItems: "center",
          width: "90vw",
          height: "90vh",
          margin: 0,
          padding: 0,
          perspective: 1000
        }}
      >
        <Example {...args} />
      </div>
    );
  },
};
