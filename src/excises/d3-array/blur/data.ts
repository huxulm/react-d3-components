import { cumsum, blur } from "d3-array";
export const randomWalk = cumsum<number>(
  new Array(401),
  () => Math.random() - 0.5
);
export const blurredWalk = blur(randomWalk.slice(), 3) as Float64Array;
export default {};
