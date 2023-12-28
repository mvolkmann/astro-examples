import {type FC} from 'react';
import {useStore} from '@nanostores/react';
import {count} from '../stores.ts';

interface Props {
  label?: string;
}

const Counter: FC<Props> = ({label = ''}) => {
  const value = useStore(count);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      {label && <div>{label}</div>}
      <button disabled={value <= 0} onClick={() => count.set(value - 1)}>
        -
      </button>
      <div>{value}</div>
      <button onClick={() => count.set(value + 1)}>+</button>
    </div>
  );
};

export default Counter;
