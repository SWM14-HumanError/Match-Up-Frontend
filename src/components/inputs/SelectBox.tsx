interface ISelectBox {
  options: Array<string>;
}
function SelectBox({options}: ISelectBox) {
  return (
    <>
      <select>
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