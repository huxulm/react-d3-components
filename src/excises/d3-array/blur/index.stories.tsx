import type { Meta, StoryObj } from "@storybook/react";
import { lazy } from "react";
import { blurredWalk, randomWalk } from "./data";
import { Responsive } from "@common/utils/responsive";
const Path = lazy(() => import("."));

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Excises/d3-array/blur",
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
    data: randomWalk,
    blurred: blurredWalk,
  },
};

export const AutoSize: Story = {
  name: "AutoSize",
  args: {
    data: randomWalk,
    blurred: blurredWalk,
  },
  render: (args) => {
    return <div style={{width: "80vw", height: "80vh"}}>
      <Responsive>
        {(props) => {
          return <Path {...args} {...props} />
        }}
      </Responsive>
    </div>
  }
};
