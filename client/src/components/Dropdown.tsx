type Props = {
  selectTypes: string[]
  getSelectType: (e: any) => void
  defaultSelect?: string
}

const Dropdown = ({ selectTypes = [], getSelectType, defaultSelect }: Props) => {
  return (
    <select onChange={getSelectType} defaultValue={defaultSelect}>
      {selectTypes.map((selectType, index) => (
        <option key={index} value={selectType}>
          {selectType}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
