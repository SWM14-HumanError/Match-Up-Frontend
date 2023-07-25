import SelectBox from "./inputs/SelectBox.tsx";
import {useState} from "react";

function SelectTeamMember() {
  const [count, setCount] = useState<number>(0);
  return (
    <li className='inputs_layout'>
      <SelectBox options={['네이티브 앱', '웹']}/>
      <input type="text" placeholder='검색하기'/>
      <button className='circle' onClick={() => setCount(prev => prev-1)}>-</button>
      <span>{count}</span>
      <button className='circle' onClick={() => setCount(prev => prev+1)}>+</button>
      <button className='stack'>삭제하기</button>
      <button className='stack'>추가하기</button>
    </li>
  );
}

export default SelectTeamMember;