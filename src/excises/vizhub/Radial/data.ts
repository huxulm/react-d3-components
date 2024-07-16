export interface DataShape {
  id: number;
  value: number;
}

export const dataFn = (
  dounts: number,
  counts: number[],
  valueFn?: () => number
): Array<Array<DataShape>> => {
  let id = -1;
  return Array.from<any, Array<DataShape>>({ length: dounts }, (_, i) => {
    return Array.from<any, DataShape>({ length: counts[i] }, () => {
      id++;
      return { id, value: !valueFn ? Math.random() : valueFn() };
    });
  });
};
