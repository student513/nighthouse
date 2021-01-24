import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { getReports } from "../api";
import { ReportData } from "../helper/interface";

type Props = {
  profileId: string;
};

const Details = ({ match }: RouteComponentProps<Props>) => {
  const [reportList, setReportList] = useState<ReportData[]>([]);

  useEffect(() => {
    getReportsByProfileId(match.params.profileId);
  }, []);

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id);
    setReportList(reports.data.data);
  };
  return <div></div>;
};

export default Details;
