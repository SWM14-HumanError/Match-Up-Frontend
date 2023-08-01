import {useState} from 'react';
import SelectBox from './SelectBox.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';

function SelectStackLevel() {
  const [count, setCount] = useState<number>(0);

  return (
    <li className='inputs_layout'>
      <SelectBox options={['네이티브 앱', '웹']}/>
      <button className='circle' onClick={() => setCount(prev => prev-1)}>-</button>
      <TierSvg width={15} height={20} tier={count}/>
      <button className='circle' onClick={() => setCount(prev => prev+1)}>+</button>
      <button className='stack'>삭제하기</button>
      <button className='stack'>추가하기</button>
    </li>
  );
}

export default SelectStackLevel;