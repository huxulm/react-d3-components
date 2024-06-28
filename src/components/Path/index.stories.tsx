import type { Meta, StoryObj } from "@storybook/react";
import { lazy } from "react";
import { Responsive } from "@/common/utils/Responsive/Responsive";
const Path = lazy(() => import("."));

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Path",
  component: Path,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Path>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pathStyle: { stroke: "blue", fill: "none" },
    close: false,
    width: 500,
    height: 500,
    points: [
      { x: 0, y: 0 },
      { x: 50, y: 50 },
      { x: 100, y: 0 },
    ],
  },
};

export const AutoSize: Story = {
  args: {
    pathStyle: { stroke: "blue", fill: "none" },
    close: false,
    width: 0,
    height: 0,
    points: [
      { x: 0, y: 0 },
      { x: 50, y: 50 },
      { x: 100, y: 0 },
    ],
  },
  render: (args) => {
    return (
      <div style={{ width: "50vw", height: "50vh" }}>
        <Responsive>{({width, height}) => <Path {...args} width={width as number} height={height as number} />}</Responsive>
      </div>
    );
  },
};
