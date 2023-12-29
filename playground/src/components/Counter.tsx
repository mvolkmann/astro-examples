import {type FC, useState} from 'react';

interface Props {
  label?: string;
  start?: number;
}

const Counter: FC<Props> = ({label = '', start = 0}) => {
  const [count, setCount] = useState(start);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      {label && <div>{label}</div>}
      <button disabled={count <= 0} onClick={() => setCount(c => c - 1)}>
        -
      </button>
      <div>{count}</div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
};

export default Counter;
