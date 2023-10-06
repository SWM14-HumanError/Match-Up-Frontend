import {useEffect, useState} from 'react';
import SelectBox from './SelectBox.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import TechStackSelector from './TechStackSelector.tsx';
import {ITechStack} from '../../constant/interfaces.ts';

export const TechListKor = ['선택', '백엔드', '프론트엔드', '풀스택', '인공지능', '디자인'];
export const TechListEng = ['', 'BACK', 'FRONT', 'FULL', 'AI', 'DESIGN'];

export interface IData {
  techIndex: number;
  count: number;
}

interface IProps {
  allData: IData[];
  index: number;
  data: IData;
  setData: (data: IData) => void
  deleteStack: () => void;
}

function SelectStackLevel({allData, index, data, setData, deleteStack}: IProps) {
  const [TechList, setTechList] = useState<string[]>(TechListKor);
  const [selectedStacks, setSelectedStacks] = useState<ITechStack[]>([]);

  useEffect(() => {
    setTechList(TechListKor.filter((_, i) => {
      return !allData.some((value) => value.techIndex === i && value !== data);
    }));
  }, [allData, allData[index].techIndex, index]);

  return (
    <li className='inputs_layout'>
      <SelectBox options={TechList}
                 value={TechListKor[data.techIndex]}
                 hasDefault={data.techIndex === 0}
                 onChange={value => setData({
                   ...data,
                   techIndex: TechListKor.indexOf(value)
                 })} />

      <TechStackSelector selectedStacks={selectedStacks.map(v => v.tagName)} setSelectedStacks={setSelectedStacks} />
      
      <button className='circle'
              onClick={() => setData({
                ...data,
                count: Math.max(data.count-1, 0)
              })}>-</button>
      <TierSvg width={15} height={20} tier={data.count}/>
      <button className='circle'
              onClick={() => setData({
                ...data,
                count: Math.min(data.count+1, 5)
              })}>+</button>

      { data.techIndex !== 0 && (
        <button className='stack' onClick={deleteStack}>삭제하기</button>
      )}
    </li>
  );
}

export default SelectStackLevel;