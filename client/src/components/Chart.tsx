import { Chart as LineChart } from "react-google-charts"
import { GoogleChartWrapperChartType } from "react-google-charts/dist/types"

import { ReportData } from "../interfaces/ReportType"

type ChartDataType = [[string, keyof ReportData], ...[Date, number]]

type Props = {
  data: ChartDataType[]
  hAxis?: string
  vAxis?: string
  chartType?: GoogleChartWrapperChartType
}

const Chart = ({ data = [], hAxis = "Date", vAxis = "milliseconds", chartType = "AreaChart" }: Props) => {
  return (
    <div>
      <LineChart
        width={"auto"}
        height={"400px"}
        {...{ chartType }}
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
