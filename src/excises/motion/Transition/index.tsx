import "./styles.css";
import { useState } from "react";
import { motion } from "framer-motion";

interface InputProps {
    children: string;
    value: number;
    set: (newValue: number) => void;
    min?: number;
    max?: number;
  }
  
  export function Input({
    value,
    children,
    set,
    min = -200,
    max = 200
  }: InputProps) {
    return (
      <label>
        <code>{children}</code>
        <input
          value={value}
          type="range"
          min={min}
          max={max}
          onChange={(e) => set(parseFloat(e.target.value))}
        />
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => set(parseFloat(e.target.value) || 0)}
        />
      </label>
    );
  }
  

export const TransitionExample = ()=> {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div className="example">
      <div>
        <motion.div
          className="tbox"
          animate={{ x, y, rotate }}
          transition={{ type: "spring" }}
        />
      </div>
      <div className="inputs">
        <Input value={x} set={setX}>
          x
        </Input>
        <Input value={y} set={setY}>
          y
        </Input>
        <Input value={rotate} set={setRotate} min={-180} max={180}>
          rotate
        </Input>
      </div>
    </div>
  );
}
