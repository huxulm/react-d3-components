import type { Meta, StoryObj } from "@storybook/react";
import { RadialArea } from "./radial-areas";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Excises/d3-shape",
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleRadialArea: Story = {
  name: "RadialArea (d3)",
  render: () => <RadialArea />,
};
