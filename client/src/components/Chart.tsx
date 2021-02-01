import { Chart as LineChart } from "react-google-charts"

type Props = {
  data: (string | number | Date)[][]
  hAxis?: string
  vAxis?: string
}

const Chart = ({ data = [], hAxis = "Date", vAxis = "milliseconds" }: Props) => {
  return (
    <div>
      <LineChart
        width={"auto"}
        height={"400px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          hAxis: {
            title: hAxis,
          },
          vAxis: {
            title: vAxis,
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  )
}

export default Chart
