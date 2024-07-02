import { motion } from "framer-motion";
import { useRef } from "react";

export const DragExample = () => {
  const constraintsRef = useRef(null);
  return (
    <>
      <div className="drag-container">
        <motion.div className="drag-area" ref={constraintsRef} />
        <motion.div drag dragConstraints={constraintsRef} dragElastic={1}/>
      </div>
    </>
  );
};
