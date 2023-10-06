import {useEffect, useState} from 'react';
import SelectStackLevel, {IData, TechListEng} from './SelectStackLevel.tsx';
import {IAdditionalInfoRequest} from '../../constant/interfaces.ts';

interface IProps {
  className?: string;
  value: IAdditionalInfoRequest['userPositionLevels'];
  setData: (data: IAdditionalInfoRequest['userPositionLevels']) => void;
}

function SelectStackLevelList({className='', value, setData}: IProps) {
  const [techStacks, setTechStacks] = useState<IData[]>([]);

  useEffect(() => {
    let updatedTechStacks: IData[] = [];
    Object.keys(value).forEach((key) => {
      const techIndex = TechListEng.indexOf(key);
      if (techIndex !== -1)
        updatedTechStacks.push({techIndex, count: value[key] as number || 0});
    });
    updatedTechStacks.push({techIndex: 0, count: 0});
    updateStack(techStacks, updatedTechStacks);
  }, [value]);

  useEffect(() => {
    let updatedTechStacks = techStacks.filter((value) => value.techIndex !== 0);
    updatedTechStacks.push({techIndex: 0, count: 0});
    updateStack(techStacks, updatedTechStacks);
    
    let result: IAdditionalInfoRequest['userPositionLevels'] = {};
    
    techStacks.forEach((stack) => {
      if (stack.techIndex !== 0)
        result[TechListEng[stack.techIndex]] = stack.count;
    });
    setData(result);
    
  }, [techStacks]);

  function updateStack(prev: IData[], updated: IData[]) {
    const prevTechStackLength = prev.length;
    const updatedTechStackLength = updated.length;

    if (prevTechStackLength !== updatedTechStackLength)
      setTechStacks(updated);
  }

  function deleteStack(index: number) {
    setTechStacks(prev => prev.filter((_, i) => i !== index));
  }

  function setStack(index: number, data: IData) {
    setTechStacks(prev => prev.map((value, i) => i === index ? data : value));
  }

  return (
    <ul className={className}>
      {techStacks.map((value, index) => (
        <SelectStackLevel key={index}
                          allData={techStacks}
                          index={index}
                          data={value}
                          setData={data => setStack(index, data)}
                          deleteStack={() => deleteStack(index)}/>
      ))}
    </ul>
  );
}

export default SelectStackLevelList;