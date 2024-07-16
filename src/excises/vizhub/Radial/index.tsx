import { FC, useEffect, useMemo, useRef, useState } from "react";
import { VizWrapper } from "./VizWrapper";
import { Responsive } from "@/common/utils/responsive/Responsive";
import { dataFn, DataShape } from "./data";

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
  const [dounts] = useState<number>(initDounts || 20);
  const [offsetDount] = useState<number>(initOffsetDount || 0);
  const data = useMemo<DataShape[][]>(
    () =>
      dataFn(
        dounts,
        Array.from({ length: dounts }, (_, i) => 5 * i + 3)
      ),
    [dounts]
  );
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {}, [dounts, offsetDount]);
  return (
    <div ref={ref} style={{ width: "100vw", height: "100vh" }}>
      <Responsive>
        {({ width, height }) =>
          width &&
          height && <VizWrapper width={width} height={height} data={data} />
        }
      </Responsive>
    </div>
  );
};
