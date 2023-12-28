import {type FC} from 'react';
import {useStore} from '@nanostores/react';
import {count} from '../stores.ts';

interface Props {
  label?: string;
}

const Counter: FC<Props> = ({label = ''}) => {
  const $count = useStore(count);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      {label && <div>{label}</div>}
      <button disabled={$count <= 0} onClick={() => count.set($count - 1)}>
        -
      </button>
      <div>{$count}</div>
      <button onClick={() => count.set($count + 1)}>+</button>
    </div>
  );
};

export default Counter;
