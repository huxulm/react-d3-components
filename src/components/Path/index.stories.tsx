import type { Meta, StoryObj } from "@storybook/react";
import { lazy } from "react";
// import { fn } from "@storybook/test";
const Path = lazy(() => import("."));

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Path",
  component: Path,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Path>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        pathStyle: {stroke: 'blue', fill: 'none'},
        close: false,
        points: [{x: 0, y: 0}, {x: 50, y: 50}, {x: 100, y: 0}]
    }
}