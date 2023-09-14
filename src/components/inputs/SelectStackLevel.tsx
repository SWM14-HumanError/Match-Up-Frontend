import SelectBox from './SelectBox.tsx';
import TierSvg from '../svgs/Tier/TierSvg.tsx';

export const TechListKor = ['선택', '백엔드', '프론트엔드', '풀스택', '인공지능', '디자인'];

export interface IData {
  techIndex: number;
  count: number;
}

interface IProps {
  data: IData;
  setData: (data: IData) => void
  deleteStack: () => void;
}

function SelectStackLevel({data, setData, deleteStack}: IProps) {
  return (
    <li className='inputs_layout'>
      <SelectBox options={TechListKor}
                 value={TechListKor[data.techIndex]}
                 onChange={value => setData({
                   ...data,
                   techIndex: TechListKor.indexOf(value)
                 })}
                 hasDefault={false}/>
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