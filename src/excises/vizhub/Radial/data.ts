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

export const Mock = (
  origin: Array<Array<DataShape>>,
  range: [number, number],
  valueFn?: (old: number) => number
) => {
  return [
    ...origin.map((a) => {
      return [
        ...a.map((v, j) => {
          const deg = (j * Math.PI * 2) / a.length;
          if (deg < range[0] || deg > range[1]) {
            return v;
          }
          const newV = valueFn
            ? { ...v, value: valueFn(v.value) }
            : { ...v, value: Math.random() };
            console.log(newV.value, v.value)
            return newV
        }),
      ];
    }),
  ];
};
