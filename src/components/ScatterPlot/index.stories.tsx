import type { Meta, StoryObj } from "@storybook/react";
import { lazy, useState } from "react";
const ScatterPlot = lazy(() => import("."));
const meta = {
  title: "Components/ScatterPlot",
  component: ScatterPlot,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    width: 500,
    height: 500,
  },
} satisfies Meta<typeof ScatterPlot>;

export default meta;
type Story = StoryObj<typeof meta>;

function generateData(n: number) {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      x: Math.ceil(Math.random() * 1000),
      y: Math.ceil(Math.random() * 1000),
      r: Math.max(2, Math.ceil(Math.random() * 20))
    });
  }
  return data;
}

const ScatterPlotWithController = (props: any) => {
  const { data: _data, ...others } = props;
  const [data, setData] = useState<any[]>(_data);
  const [cnt, setCnt] = useState(0)
  const refreshData = () => {
    setCnt(cnt + 1)
    setData(generateData(Math.ceil(Math.random() * 100)));
  };
  const clear = () => setData([]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        <button onClick={refreshData}>Refresh Data</button>
        <button onClick={clear}>Clear</button>
        <p>count: {data.length}</p>
      </div>
      <ScatterPlot key={cnt} {...others} data={data} />
    </div>
  );
};

export const Default: Story = {
  args: {
    width: 800,
    height: 800,
    data: generateData(100),
    margin: 50,
    pointStyle: {
      fill: "rgba(233, 204, 252, 0.47)",
      stroke: "red",
      "stroke-width": 2,
      cursor: "pointer",
    },
  },
  render: (args) => {
    return <ScatterPlot {...args} />;
  },
};
export const ScatterWithController: Story = {
  name: "With controller",
  args: {
    width: 800,
    height: 800,
    data: generateData(100),
    margin: 50,
    pointStyle: {
      fill: "rgba(233, 204, 252, 0.47)",
      stroke: "red",
      "stroke-width": 2,
      cursor: "pointer",
    },
  },
  render: (args) => {
    return <ScatterPlotWithController {...args} />;
  },
};
