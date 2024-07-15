import { Size } from "@/common/utils/responsive/useParentSize";
import { FC, useEffect, useRef, useState } from "react";
import { VizWrapper } from "./VizWrapper";

interface RadialProps {
  // Total number of dounts
  initDounts?: number;
  // Inner start dount
  initOffsetDount?: number;
}

export const Radial: FC<RadialProps> = ({
  initDounts,
  initOffsetDount,
}: RadialProps) => {
  const [dounts] = useState<number>(initDounts || 0);
  const [offsetDount] = useState<number>(initOffsetDount || 0);

  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  useEffect(() => {
    setSize({
      width: ref.current!.clientWidth,
      height: ref.current!.clientHeight,
    });
  }, [dounts, offsetDount]);
  return (
    <div ref={ref} style={{ width: "100vw", height: "100vh" }}>
      <VizWrapper width={size.width} height={size.height} />
    </div>
  );
};
