import { FC } from "react";

export interface MarkerProps {
  id: string;
  color: string;
}

export const Marker: FC<Partial<MarkerProps>> = ({ id, color }) => {
  return (
    <marker
      viewBox="0 -5 10 10"
      id={`marker-${id}`}
      orient={"auto"}
      markerWidth={6}
      markerHeight={6}
      refX={15}
      refY={-0.5}
    >
      <path d="M0,-5L10,0L0,5" fill={color}></path>
    </marker>
  );
};
