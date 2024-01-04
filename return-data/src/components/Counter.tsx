import { type FC, useEffect, useState } from "react";

interface Props {
  count: number;
  label?: string;
  setCount: (count: number) => void;
}

const Counter: FC<Props> = ({ count = 0, label = "", setCount }) => {
  const [value, setValue] = useState(count);

  useEffect(() => {
    setCount(value);
  }, [value]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {label && <div>{label}</div>}
      <button disabled={value <= 0} onClick={() => setValue((v) => v - 1)}>
        -
      </button>
      <div>{value}</div>
      <button onClick={() => setValue((v) => v + 1)}>+</button>
    </div>
  );
};

export default Counter;
