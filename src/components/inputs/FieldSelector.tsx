interface IFieldSelector {
  title: string;
  subtitle: string;
  currNum: number;
  maxNum: number;
  selected: boolean;
  onClick?: () => void;
}

function FieldSelector({title, subtitle, currNum, maxNum, selected, onClick}: IFieldSelector) {
  return (
    <li className={currNum == maxNum ? 'disabled' : selected ? 'selected' : ''}
        onClick={onClick}>
      <div className='field_header'>
        <h5>{title}</h5>
        <span>{subtitle}</span>
      </div>
      <span className="num_layout">
        {currNum == maxNum ? '마감' : `${currNum}/${maxNum}`}
      </span>
    </li>
  );
}

export default FieldSelector;