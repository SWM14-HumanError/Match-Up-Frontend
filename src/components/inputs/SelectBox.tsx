import React from 'react';

export interface IOption<T> {
  option: string;
  value: T;
}

interface ISelectBox<T> {
  selectRef?: React.RefObject<HTMLSelectElement>;
  options: Array<string|IOption<T>>;
  value?: T;
  onChange?: (value: string, index: number) => void;
  hasDefault?: boolean;
}

function SelectBox({options, value, onChange, hasDefault=true, selectRef}: ISelectBox<string|number>) {
  const defaultOption = typeof options[0] === 'object' ? options[0].option : options[0];
  const [selectValue, setSelectValue] = React.useState<string|number>(defaultOption);

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
        {options.map((option) =>
          typeof option === 'object' ? (
            <option key={option.value} value={option.value}>
              {option.option}
            </option>
          ) : (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </>
  )
}

export default SelectBox;