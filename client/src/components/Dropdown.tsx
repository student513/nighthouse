type Props = {
  selectTypes: string[]
  getSelectType: (e: any) => void
}

const Dropdown = ({ selectTypes = [], getSelectType }: Props) => {
  return (
    <select onChange={getSelectType}>
      {selectTypes.map((selectType, index) => (
        <option key={index} value={selectType}>
          {selectType}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
