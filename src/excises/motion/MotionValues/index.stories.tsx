import type { Meta, StoryObj } from "@storybook/react";
import { MotionValues } from ".";
import { Responsive } from "@/common/utils/responsive/Responsive";

const meta = {
  title: "Excises/motion/MotionValues",
  component: MotionValues,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MotionValues>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <>
        <style>
          {`
.example-container {
  width: 100%;
  height: 100%;
}

.box {
  background: white;
  border-radius: 30px;
  width: 150px;
  height: 150px;
  position: absolute;
  top: calc(50% - 150px / 2);
  left: calc(50% - 150px / 2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-icon {
  width: 80%;
  height: 80%;
}

.refresh {
  padding: 10px;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}        
        `}
        </style>
        <div
          style={{
            width: "50vw",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Responsive>
            {(props) => <MotionValues {...args} {...props} />}
          </Responsive>
        </div>
      </>
    );
  },
};
