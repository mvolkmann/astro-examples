import { type FC, useState } from "react";

interface Props {
  label: string | null;
  start: number;
}

const Counter: FC<Props> = ({ label, start }) => {
  const [count, setCount] = useState(start);

  const add = (factor = 1) => {
    setCount(count + factor);
  };

  return (
    <div>
      {label && <div>{label}</div>}
      <button disabled={count <= 0} onClick={() => setCount((c) => c - 1)}>
        -
      </button>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
};

export default Counter;
