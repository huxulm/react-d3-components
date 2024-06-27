import { RefObject, useEffect, useRef, useState } from "react";

export type Size = {
  width: number | undefined;
  height: number | undefined;
};

export const useParentSize = <T extends HTMLElement>(): [
  RefObject<T>,
  Size,
] => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({width: undefined, height: undefined});
  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }
    if (!ref.current) {
      return;
    }
    const resizer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        setSize({ width, height });
        return;
      }
    });
    resizer.observe(target);
    return () => {
        resizer.unobserve(target);
    };
  }, []);
  return [ref, size];
};
