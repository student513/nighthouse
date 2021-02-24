import { ReportData } from "../interfaces/ReportType"

export type ChartIdentifier = string
export type ChartDataType = [[string, keyof ReportData], ...[Date, number]] | (string | number | Date)[]
