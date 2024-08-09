import {useEffect, useState} from 'react';
import SelectStackLevel, {getTechListEng, getTechListKor, IData, TechListKor} from './SelectStackLevel.tsx';
import {ITechStack, IUserTagPosition} from '@constant/interfaces.ts';
import TechStacks from '@constant/stackList.ts';
import dataGen from '@constant/dateGen.tsx';

interface IProps {
  className?: string;
  value: IUserTagPosition[] | null | undefined;
  setData: (data: IUserTagPosition[]) => void;
}

const EmptyData: IData = {techType: TechListKor[0], stacks: [], typeLevel: 0};

function SelectStackLevelList({className='', value, setData}: IProps) {
  const [techStacks, setTechStacks] = useState<IData[]>([{...EmptyData}]);
  const [availableTechTypes, setAvailableTechTypes] = useState<string[]>([...TechListKor]);

  useEffect(() => {
    const data = value ? value.map(v => ({
      techType: getTechListKor(v.type),
      stacks: dataGen.getUniqueStrings(v.tags).map((v: string) => dataGen.getTechStack(v)),
      typeLevel: v.typeLevel,
    })) : [];

    setTechStacks(data);
  }, [value]);

  useEffect(() => {
    // Empty 데이터 제거
    let updatedTechStacks = techStacks.filter((v) => v.techType !== TechListKor[0]);
    updatedTechStacks.push({...EmptyData});

    const prevTechStackLength = techStacks.length;
    const updatedTechStackLength = updatedTechStacks.length;
    if (prevTechStackLength === updatedTechStackLength) return;

    // 기술 스택 string에서 ITechStack으로 변환
    updatedTechStacks = updatedTechStacks.map(v => ({
      ...v, stacks: stringArray2TechStacks(v.stacks.map(v => v.tagName))
    }));

    setTechStacks(updatedTechStacks);
  }, [techStacks]);

  // data 변환
  useEffect(() => {
    let result: IUserTagPosition[] = [];
    techStacks.forEach((stack) => {
      if (stack.techType !== TechListKor[0])
        result.push({
          type: getTechListEng(stack.techType),
          tags: stack.stacks.map(v => v.tagName),
          typeLevel: stack.typeLevel,
        });
    });
    setData(result);

    // 사용 가능한 기술 스택 타입
    setAvailableTechTypes(TechListKor.filter(v => !techStacks.some(stack => stack.techType === v)));
  }, [techStacks]);

  function stringArray2TechStacks(stacks: string[]): ITechStack[] {
    return stacks.map(v => string2TechStack(v)).filter(v => v) as ITechStack[];
  }

  function string2TechStack(stack: string): ITechStack | null {
    const result = TechStacks.find(v => v.tagName === stack);
    return result ? result : null;
  }
  
  function deleteStack(index: number) {
    setTechStacks(prev => [...prev.filter((_, i) => i !== index)]);
  }

  function setStack(index: number, data: IData) {
    setTechStacks(prev => [...prev.map((value, i) => i === index ? data : value)]);
  }

  return (
    <ul className={className}>
      {techStacks.map((value, index) => (
        <SelectStackLevel key={index}
                          data={value}
                          setData={data => setStack(index, data)}
                          availableTechTypes={availableTechTypes}
                          deleteStack={() => deleteStack(index)}/>
      ))}
    </ul>
  );
}

export default SelectStackLevelList;