import { Chart as LineChart } from "react-google-charts"

type Props = {
  data?: []
  hAxis?: string
  vAxis?: string
}

const Chart = ({ data = [], hAxis = "Time", vAxis = "milliseconds" }: Props) => {
  return (
    <div>
      <LineChart
        width={"600px"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["x", "dogs"],
          [0, 0],
          [1, 10],
          [2, 23],
          [3, 17],
          [4, 18],
          [5, 9],
          [6, 11],
          [7, 27],
          [8, 33],
          [9, 40],
          [10, 32],
          [11, 35],
        ]}
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
