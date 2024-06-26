import * as d3 from "d3";
export const randomWalk = d3.cumsum<number>(
  new Array(401),
  () => Math.random() - 0.5
);
export const blurredWalk = d3.blur(randomWalk.slice(), 3) as Float64Array;
export default {};
