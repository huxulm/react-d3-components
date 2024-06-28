import { motion, useDragControls } from "framer-motion";
import { PointerEventHandler } from "react";

export const Drag = ({ width, height }: any) => {
  const ctrls = useDragControls();
  const startDrag: PointerEventHandler = (e) => {
    ctrls.start(e);
  };
  return (
    <>
      <div
        style={{
          width,
          height,
          background: "#e2e2e2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPointerDown={startDrag}
      >
        <motion.div drag dragControls={ctrls} initial={{ x: 0, y: 0 }}>
          {"Text can be drag to any where"}
        </motion.div>
      </div>
    </>
  );
};
