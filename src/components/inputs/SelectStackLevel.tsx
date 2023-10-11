import {useEffect, useState} from 'react';
import SelectBox from './SelectBox.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';
import TechStackSelector from './TechStackSelector.tsx';
import {ITechStack} from '../../constant/interfaces.ts';
import {BigTechTypeEn, BigTechTypeKo} from "../../constant/selectOptions.ts";

export const TechListKor = ['선택', ...BigTechTypeKo];
export const TechListEng = ['', ...BigTechTypeEn];

export interface IData {
  techType: string;
  stacks: ITechStack[];
  typeLevel: number;
}

interface IProps {
  data: IData;
  setData: (data: IData) => void
  deleteStack: () => void;
  availableTechTypes: string[];
}

function SelectStackLevel({data, setData, deleteStack, availableTechTypes}: IProps) {
  const [TechList, setTechList] = useState<string[]>(TechListKor);

  useEffect(() => {
    const list = new Set<string>([...availableTechTypes, data.techType, TechListKor[0]]);
    setTechList(TechListKor.filter(v => list.has(v)));
  }, [availableTechTypes]);

  return (
    <li className='inputs_layout'>
      <SelectBox options={TechList}
                 value={data.techType}
                 hasDefault={data.techType === TechListKor[0]}
                 onChange={v => setData({...data, techType: v})} />

      <TechStackSelector selectedStacks={data.stacks.map(v => v.tagName)}
                         setSelectedStacks={getPrev => setData({
                           ...data,
                            stacks: getPrev(data.stacks)
                         })} />
      
      <button className='circle'
              onClick={() => setData({
                ...data,
                typeLevel: Math.max(data.typeLevel-1, 0)
              })}>-</button>
      <TierSvg width={15} height={20} tier={data.typeLevel}/>
      <button className='circle'
              onClick={() => setData({
                ...data,
                typeLevel: Math.min(data.typeLevel+1, 4)
              })}>+</button>

      { data.techType !== TechListKor[0] && (
        <button className='stack' onClick={deleteStack}>삭제하기</button>
      )}
    </li>
  );
}

export function getTechListEng(techKor: string): string {
  const index = TechListKor.indexOf(techKor);
  return TechListEng[index === -1 ? 0 : index]
}

export function getTechListKor(techEng: string): string {
  const index = TechListEng.indexOf(techEng);
  return TechListKor[index === -1 ? 0 : index];
}


export default SelectStackLevel;