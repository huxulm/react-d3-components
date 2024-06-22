import type { Meta, StoryObj } from "@storybook/react";
import { lazy } from "react";
// import { fn } from "@storybook/test";
import { NodeData } from "reaflow";
// import { FlowChart } from ".";
const FlowChart = lazy(() => import("."))

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/FlowChart",
  component: FlowChart,
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
} satisfies Meta<typeof FlowChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultIcon1 = {
  url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzExM18xNDQ3KSI+CjxwYXRoIGQ9Ik0xMi41IDYuMjVDMTcuNjEgNi4yNSAyMS43NSAxMC4zOSAyMS43NSAxNS41VjE4LjI1SDMuMjVWMTUuNUMzLjI1IDEwLjM5IDcuMzkgNi4yNSAxMi41IDYuMjVaIiBzdHJva2U9IiMxMjEzMzEiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMTIuNSIgY3k9IjE0Ljc1IiByPSIxLjI1IiBmaWxsPSIjMTIxMzMxIi8+CjxwYXRoIGQ9Ik0xMi41IDguMzFWNi4yNSIgc3Ryb2tlPSIjMTIxMzMxIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik01LjQ5OTc5IDEyLjg3OTlMMy43Nzk3OSAxMi40MTk5IiBzdHJva2U9IiMxMjEzMzEiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTIxLjIyIDEyLjQxOTlMMTkuNSAxMi44Nzk5IiBzdHJva2U9IiMxMjEzMzEiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTkuMjUgMTMuNzVMMTIuNDk5OSAxNC43NTAxIiBzdHJva2U9IiMxMjEzMzEiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xMTNfMTQ0NyI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuNSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
  height: 40,
  width: 40,
};
function generateNodes(n: number) {
  const nodes: NodeData[] = [];
  for (let i = 0; i < n; i++) {
    nodes.push({
      id: `n-${i + 1}`,
      text: `N ${i + 1}`,
      width: 50,
      height: 50,
      icon: defaultIcon1,
    });
  }
  return nodes;
}
// function generateEdges(n: number, m: number) {
//   let s = new Set<string>();
//   let edges: EdgeData[] = [];
//   for (let i = 0; i < m; i++) {
//     let from = 0;
//     let to = 0;
//     let edge = `${from - to}`;
//     let cnt = 0;
//     while (from <= to || s.has(edge)) {
//       from = Math.floor(Math.random() * n);
//       to = Math.floor(Math.random() * n);
//       edge = `${from - to}`;
//       cnt++;
//       if (cnt > m) {
//         break;
//       }
//     }
//     if (cnt <= m) {
//       s.add(edge);
//       edges.push({ id: `e-${i + 1}`, from: `${from + 1}`, to: `${to + 1}` });
//     }
//   }
//   return edges;
// }
const DEFAULT_15_EDGES = [
  {
    id: "n-3-n-4",
    from: "n-3",
    to: "n-4",
  },
  {
    id: "n-3-n-5",
    from: "n-3",
    to: "n-5",
  },
  {
    id: "n-3-n-6",
    from: "n-3",
    to: "n-6",
  },
  {
    id: "n-3-n-7",
    from: "n-3",
    to: "n-7",
  },
  {
    id: "n-2-n-8",
    from: "n-2",
    to: "n-8",
  },
  {
    id: "n-8-n-9",
    from: "n-8",
    to: "n-9",
  },
  {
    id: "n-2-n-10",
    from: "n-2",
    to: "n-10",
  },
  {
    id: "n-9-n-11",
    from: "n-9",
    to: "n-11",
  },
  {
    id: "n-10-n-12",
    from: "n-10",
    to: "n-12",
  },
  {
    id: "n-10-n-13",
    from: "n-10",
    to: "n-13",
  },
  {
    id: "n-10-n-14",
    from: "n-10",
    to: "n-14",
  },
  {
    id: "n-14-n-15",
    from: "n-14",
    to: "n-15",
  },
  {
    id: "n-7-n-11",
    from: "n-7",
    to: "n-11",
  },
  {
    id: "n-6-n-11",
    from: "n-6",
    to: "n-11",
  },
  {
    id: "n-5-n-11",
    from: "n-5",
    to: "n-11",
  },
  {
    id: "n-4-n-11",
    from: "n-4",
    to: "n-11",
  },
  {
    id: "n-13-n-15",
    from: "n-13",
    to: "n-15",
  },
  {
    id: "n-12-n-15",
    from: "n-12",
    to: "n-15",
  },
  {
    id: "n-11-n-15",
    from: "n-11",
    to: "n-15",
  },
  {
    id: "n-7-n-9",
    from: "n-7",
    to: "n-9",
  },
  {
    id: "n-1-n-3",
    from: "n-1",
    to: "n-3",
  },
  {
    id: "n-1-n-2",
    from: "n-1",
    to: "n-2",
  },
  {
    id: "n-9-n-12",
    from: "n-9",
    to: "n-12",
  },
];
export const Default: Story = {
  args: {
    width: 500,
    dir: "RIGHT",
    nodes: generateNodes(15),
    edges: DEFAULT_15_EDGES,
  },
};
