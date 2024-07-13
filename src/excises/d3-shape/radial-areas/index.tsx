import { useEffect, useRef } from "react";
import { main } from "./viz";

export const RadialArea = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current && main(ref);
  }, []);
  return <div ref={ref} style={{ width: "100vw", height: "100vh" }} />;
};
