type Props = {
  selectTypes: string[]
  getSelectType: (e: any) => void
  defaultSelect?: string
}

const Dropdown = ({ selectTypes = [], getSelectType, defaultSelect }: Props) => {
  return (
    <select onChange={getSelectType}>
      {selectTypes.map((selectType, index) =>
        defaultSelect === selectType ? (
          <option key={index} value={selectType} selected>
            {selectType}
          </option>
        ) : (
          <option key={index} value={selectType}>
            {selectType}
          </option>
        )
      )}
    </select>
  )
}

export default Dropdown
