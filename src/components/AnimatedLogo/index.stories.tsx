import { Meta, StoryObj } from "@storybook/react";
import { TextLogo } from ".";

export default {
  title: "Components/AnimatedLogo",
  component: TextLogo,
} satisfies Meta<typeof TextLogo>;

export const Default: StoryObj<typeof TextLogo> = {
  args: {
    width: 300,
    height: 100,
    duration: 3.5,
    g: {
      colors: [
        "rgba(244, 67, 54, 0.76)",
        "rgba(139, 192, 74, 1)",
        "rgba(103, 58, 183, 0.74)",
        "rgba(76, 175, 80, 1)",
        "rgba(0, 188, 212, 0.72)",
        "rgba(244, 67, 54, 1)",
        "rgba(255, 235, 59, 0.72)",
        "rgba(205, 220, 57, 1)",
        "rgba(238, 130, 238, 0.77)",
      ],
      style: {
        skewX: "-20deg",
        stroke: "white",
        fill: "black",
        strokeWidth: 10,
        strokeLinecap: "round",
      },
      animate: {},
    },
    t1: {
      initial: {
        cx: 50,
        cy: 50,
        rx: 25,
        ry: 40,
        pathLength: 0,
      },
      style: {
        strokeWidth: 5,
      },
      animate: {},
      transition: {},
    },
    t2: {
      initial: {
        cx: 100,
        cy: 50,
        rx: 25,
        ry: 40,
        pathLength: 0,
      },
      style: {
        strokeWidth: 5,
      },
      animate: {},
      transition: {},
    },
    line1: {
      style: {
        strokeWidth: 5,
      },
      animate: {},
    },
    line2: {
      style: {
        strokeWidth: 5,
      },
      animate: {},
    },
  },
  render: (args) => {
    const { width, height } = args;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "2rem",
        }}
      >
        {new Array(10).fill(null).map((_, i) => {
          const ratio = 0.25 * (i + 1);
          return (
            <TextLogo
              {...args}
              width={ratio * (width as number)}
              height={ratio * (height as number)}
              spring
            />
          );
        })}
      </div>
    );
  },
};
