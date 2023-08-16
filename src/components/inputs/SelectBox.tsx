import React from 'react';

interface ISelectBox {
  options: Array<string>;
  value?: string;
  onChange?: (value: string) => void;
  hasDefault?: boolean;
}
function SelectBox({options, value, onChange, hasDefault=true}: ISelectBox) {
  const [selectValue, setSelectValue] = React.useState<string>(options[0]);

  function changeValue(e: React.ChangeEvent<HTMLSelectElement>) {
    if (onChange) onChange(e.target.value);
    setSelectValue(e.target.value);
  }

  return (
    <>
      <select value={value}
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