import {useEffect, useState} from 'react';
import SelectStackLevel, {IData} from './SelectStackLevel.tsx';
import {IAdditionalInfoRequest} from '../../constant/interfaces.ts';

interface IProps {
  className?: string;
  setData: (data: IAdditionalInfoRequest['userPositionLevels']) => void;
}

const TechListEng = ['', 'BACK', 'FRONT', 'FULL', 'AI', 'DESIGN'];

function SelectStackLevelList({className='', setData}: IProps) {
  const [techStacks, setTechStacks] = useState<IData[]>([]);
  
  useEffect(() => {
    let updatedTechStacks = techStacks.filter((value) => value.techIndex !== 0);
    updatedTechStacks.push({techIndex: 0, count: 0});

    const prevTechStackLength = techStacks.length;
    const updatedTechStackLength = updatedTechStacks.length;

    if (prevTechStackLength !== updatedTechStackLength)
      setTechStacks(updatedTechStacks);
    
    let result: IAdditionalInfoRequest['userPositionLevels'] = {};
    
    techStacks.forEach((stack) => {
      if (stack.techIndex !== 0)
        result[TechListEng[stack.techIndex]] = stack.count;
    });
    setData(result);
    
  }, [techStacks]);

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
                          data={value}
                          setData={data => setStack(index, data)}
                          deleteStack={() => deleteStack(index)}/>
      ))}
    </ul>
  );
}

export default SelectStackLevelList;