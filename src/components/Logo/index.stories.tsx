import { Meta, StoryObj } from "@storybook/react";
import { Logo } from ".";

export default {
  title: "Components/Logo",
  parameters: {
    layout: "centered",
  },
  component: Logo,
} satisfies Meta<typeof Logo>;

export const Default: StoryObj<typeof Logo> = {
  args: {
    width:500,
    height: 500,
    strokeWidth: 12
  },
};
