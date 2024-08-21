import {useEffect, useState} from 'react';
import SelectBox from '@components/inputs/SelectBox.tsx';
import TierSvg from '@components/svgs/Tier/TierSvg.tsx';
import TechStackSelector from '@components/inputs/TechStackSelector.tsx';
import {ITechStack} from '@constant/interfaces.ts';
import {BigTechTypeEn, BigTechTypeKo} from '@constant/selectOptions.ts';
import {getTechStack} from '@constant/SearchTeckStacks.ts';

export const TechListKor = ['직무 전체', ...BigTechTypeKo];
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
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    const list = new Set<string>([...availableTechTypes, data.techType, TechListKor[0]]);
    setTechList(TechListKor.filter(v => list.has(v)));
  }, [availableTechTypes]);

  return (
    <li className='inputs_layout'>
      <SelectBox options={TechList}
                 value={data.techType}
                 hasDefault={data.techType === TechListKor[0]}
                 onChange={v => setData({...data, techType: v})}/>

      <TechStackSelector value={data.stacks.map(v => v.tagName)}
                         allowCustomInput={true}
                         onChange={
                            stacks => setData({
                              ...data,
                              stacks: stacks.map(v => (getTechStack(v)))
                            })
                         }/>

      <div className='stepper_layout'>
        <button className='circle'
                onClick={() => setData({
                  ...data,
                  typeLevel: Math.max(data.typeLevel - 1, 0)
                })}>-
        </button>
        <div className='tool_tip_container'
             onMouseOver={() => setShowTooltip(true)}
             onMouseLeave={() => setShowTooltip(false)}>
          <TierSvg width={20} height={20} tier={data.typeLevel}/>
          {showTooltip && (
            <span className='tool_tip'>
            랭킹은
              {Array.from({length: 5}, (_, i) => i).map(i => (
                <TierSvg key={i} width={14} height={14} tier={i}/>
              ))}
              순으로 높아집니다
          </span>
          )}
        </div>

        <button className='circle'
                onClick={() => setData({
                  ...data,
                  typeLevel: Math.min(data.typeLevel + 1, 4)
                })}>+
        </button>
      </div>

      {data.techType !== TechListKor[0] && (
        <button className='stack' onClick={deleteStack}>삭제하기</button>
      )}
    </li>
  );
}

export function getTechListEng(techKor: string): string {
  if (techKor === '리더')
    return 'LEADER';

  const index = TechListKor.indexOf(techKor);
  return TechListEng[index === -1 ? 0 : index]
}

export function getTechListKor(techEng: string): string {
  if (techEng === 'LEADER')
    return '리더';

  const index = TechListEng.indexOf(techEng);
  return TechListKor[index === -1 ? 0 : index];
}


export default SelectStackLevel;