import {useState} from 'react';
import TechStackSelector from './TechStackSelector.tsx';
import {ITechStack} from "../../constant/interfaces.ts";

const RecuritFieldArr = ['선택', '기획', 'UI/UX', '프론트엔드', '백엔드', '앱', '게임', 'AI', '기타'];

function SelectTeamMember() {
  const [count, setCount] = useState<number>(0);
  const [selectedStacks, setSelectedStacks] = useState<ITechStack[]>([]);

  return (
    <li className='inputs_layout'>
      <select defaultValue={RecuritFieldArr[0]}>
        {RecuritFieldArr.map((option, index) => (
          <option key={index}
                  value={option}>
            {option}
          </option>
        ))}
      </select>

      <TechStackSelector selectedStacks={selectedStacks} setSelectedStacks={setSelectedStacks}/>
      <button className='circle' onClick={() => setCount(prev => Math.max(0, prev-1))}>-</button>
      <span>{count}명</span>
      <button className='circle' onClick={() => setCount(prev => prev+1)}>+</button>
      <button className='stack'>삭제하기</button>
      <button className='stack'>추가하기</button>
    </li>
  );
}

export default SelectTeamMember;