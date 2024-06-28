import type { Meta, StoryObj } from "@storybook/react";
import { Drag } from ".";

const meta = {
  title: "Excises/motion/Drag",
  component: Drag,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Drag>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  render: () => {
    return (
        <div
          style={{
            width: "10vw",
            height: "10vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Drag width="100%" height="100%" />
        </div>
    );
  },
};
