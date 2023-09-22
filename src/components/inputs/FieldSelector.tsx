import {IRecruitmentInfo} from '../../constant/interfaces.ts';

interface IFieldSelector extends IRecruitmentInfo{
  selected: boolean;
  onClick?: () => void;
}

function FieldSelector({role, stacks, maxCount, count, selected, onClick}: IFieldSelector) {
  return (
    <li className={count >= maxCount ? 'disabled' : selected ? 'selected' : ''}
        onClick={onClick}>
      <div className='field_header'>
        <h5>{role}</h5>
        <span>
          { stacks.map((stack, index) => (
            <span key={index}>#{stack} </span>
          ))}
        </span>
      </div>
      <span className='num_layout'>
        {count >= maxCount ? '마감' : `${count}/${maxCount}`}
      </span>
    </li>
  );
}

export default FieldSelector;