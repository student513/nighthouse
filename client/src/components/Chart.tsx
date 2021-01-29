import { Chart as LineChart } from "react-google-charts"

type Props = {
  data: any // 타입을 어떻게 줘야할지 모르겠음
  hAxis?: string
  vAxis?: string
}

const Chart = ({ data = [], hAxis = "Date", vAxis = "milliseconds" }: Props) => {
  return (
    <div>
      <LineChart
        width={"1600px"}
        height={"400px"}
        chartType="LineChart"
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