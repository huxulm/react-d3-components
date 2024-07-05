import { motion } from "framer-motion";
import { PropsWithChildren, useState } from "react";

const Input = ({
  set,
  max,
  min,
  value,
  children,
}: { set: any; min: number; max: number; value: number } & PropsWithChildren) => {
  return (
    <label>
      <code>{children}</code>
      <input
        onChange={(e) => set(parseFloat(e.target.value))}
        type="range"
        min={min}
        max={max}
      />
      <input value={value} type="number" />
    </label>
  );
};

export const Animation = () => {
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [rotate, setRotate] = useState<number>(0)
  return (
    <>
      <style>{`
          .container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .block {
            border: 5px dotted var(--accent);
            border-radius: 20px;
            width: 200px;
            height: 200px;
          }
          .inputs {
            color: var(--accent);
            display: flex;
            flex-direction: column;
            padding-left:  2rem;
          }
          input {
            accent-color: var(--accent);
          }
          label {
            display: flex;
            align-items: center;
            margin: 10px 0;
          }

          label code {
            width: 100px;
          }
          input[type="number"] {
            border: 0;
            border-bottom: 1px dotted var(--accent);
            color: var(--accent);
            margin-left: 10px;
          }

          input[type="number"]:focus {
            outline: none;
            border-bottom: 2px solid var(--accent);
          }

          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }            
      `}</style>
      <div className="container">
        <motion.div className="block" animate={{ x, y, rotate }} transition={{
          ease: "easeOut",
          type: "spring",
          stiffness: 50,
          duration: 0.1,
        }}/>
        <div className="inputs">
          <Input min={-200} max={200} value={x} set={setX}>x</Input>
          <Input min={-200} max={200} value={y} set={setY}>y</Input>
          <Input min={-180} max={180} value={rotate} set={setRotate}>rotate</Input>
        </div>
      </div>
    </>
  );
};
