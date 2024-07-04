import { Meta, StoryObj } from "@storybook/react"
import { Axis, AxisLine } from "."

export default {
    title: "Components/Axis",
    parameters: {
        layout: "centered"
    }
} satisfies Meta

export const XYAxis: StoryObj<typeof Axis> = {
    args: {
        width: 500,
        height: 500,
        orientation: "horizontal",
        position: "end",
    },
    render: (args) => {
        return <svg width={args.width!} height={args.height!}>
            <Axis {...args} axisLine={<AxisLine />} />
            <Axis {...args} orientation="vertical" position="start" axisLine={<AxisLine />} />
        </svg>
    }
}

