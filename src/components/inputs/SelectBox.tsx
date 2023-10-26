import React from 'react';

interface ISelectBox {
  selectRef?: React.RefObject<HTMLSelectElement>;
  options: Array<string>;
  value?: string;
  onChange?: (value: string, index: number) => void;
  hasDefault?: boolean;
}
function SelectBox({options, value, onChange, hasDefault=true, selectRef}: ISelectBox) {
  const [selectValue, setSelectValue] = React.useState<string>(options[0]);

  function changeValue(e: React.ChangeEvent<HTMLSelectElement>) {
    if (onChange) onChange(e.target.value, e.target.selectedIndex);
    setSelectValue(e.target.value);
  }

  return (
    <>
      <select value={value}
              ref={selectRef}
              onChange={changeValue}
              className={hasDefault && selectValue == options[0] ? 'is_default_value' : ''}>
        {options.map((option, index) => (
            <option key={index}
                    value={option}>
              {option}
            </option>
        ))}
      </select>
    </>
  )
}

export default SelectBox;