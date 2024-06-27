import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function distance(p1: any, p2: any) {
  const xDelta = Math.abs(p1.x - p2.x);
  const yDelta = Math.abs(p1.y - p2.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}

const grid = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];
const size = 60;
const gap = 10;

const Square = ({ active, setActive, colIndex, rowIndex, x, y }: any) => {
  const isDragging = colIndex === active.col && rowIndex === active.row;
  const diagonalIndex = (360 / 6) * (colIndex + rowIndex);
  const d = distance(
    { x: active.col, y: active.row },
    { x: colIndex, y: rowIndex }
  );
  const springConfig = {
    stiffness: Math.max(700 - d * 120, 0),
    damping: 20 + d * 5,
  };
  const dx = useSpring(x, springConfig);
  const dy = useSpring(y, springConfig);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 20 }}
      dragElastic={1}
      onDragStart={() => setActive({ row: rowIndex, col: colIndex })}
      style={{
        background: `hsla(calc(var(--base-hue) + ${diagonalIndex}), 80%, 60%, 1)`,
        width: size,
        height: size,
        top: rowIndex * (size + gap),
        left: colIndex * (size + gap),
        position: "absolute",
        borderRadius: "50%",
        x: isDragging ? x : dx,
        y: isDragging ? y : dy,
        zIndex: isDragging ? 1 : 0,
      }}
    />
  );
};

function Example() {
  const [active, setActive] = useState({ row: 0, col: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      animate={{ "--base-hue": 360 } as any}
      initial={{ "--base-hue": 0 } as any}
      transition={{ duration: 10, loop: Infinity, ease: "linear" }}
      style={{ width: "100%", height: "100%" }}
    >
      <motion.div
        style={{
          display: "flex",
          width: (size + gap) * 4 - gap,
          height: (size + gap) * 4 - gap,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "relative",
          perspective: 500,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((_item, colIndex) => (
            <Square
              x={x}
              y={y}
              active={active}
              setActive={setActive}
              rowIndex={rowIndex}
              colIndex={colIndex}
              key={rowIndex + colIndex}
            />
          ))
        )}
      </motion.div>
    </motion.div>
  );
}

export default Example;
