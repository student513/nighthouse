type Props = {
  chartTypes: string[]
  getSelectType: (e: any) => void
}

const Dropdown = ({ chartTypes = [], getSelectType }: Props) => {
  return (
    <select id="reportData" onChange={getSelectType}>
      {chartTypes.map((chartType, index) => (
        <option key={index} value={chartType}>
          {chartType}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
