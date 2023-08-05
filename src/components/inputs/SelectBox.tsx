import React from 'react';

interface ISelectBox {
  options: Array<string>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
function SelectBox({options, value, onChange}: ISelectBox) {
  return (
    <>
      <select value={value} onChange={onChange}>
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