import { useEffect } from "react";
import { getReports } from "../api";
import { RouteComponentProps } from "react-router-dom";

type Props = {
  profileId: string;
};

const Details = ({ match }: RouteComponentProps<Props>) => {
  useEffect(() => {
    getReportsByProfileId(match.params.profileId);
  });

  const getReportsByProfileId = async (id: string) => {
    const reports = await getReports(id);
  };
  return <div>detail</div>;
};

export default Details;
