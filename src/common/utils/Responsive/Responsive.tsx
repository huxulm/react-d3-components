import { FC } from "react";
import { useParentSize, Size } from "./useParentSize";

type ResponsiveProps = {
  height?: string | number;
  width?: string | number;
  children: (props: Size) => any
};
export const Responsive: FC<ResponsiveProps> = ({
  children,
  width = "100%",
  height = "100%",
}) => {
  const [ref, size] = useParentSize<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        width,
        height,
      }}
    >
      {size.width && size.width > 0 && children(size)}
    </div>
  );
};
