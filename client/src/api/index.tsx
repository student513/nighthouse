import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const createURL = (payload: any) => api.post(`/url`, payload);
export const deleteURL = (id: string) => api.delete(`/url/${id}`);
export const getURLs = () => api.get(`/urls`);
// export const getReportByProfileId = (id: string, reportId: string) =>
//   api.get(`/report/${id}/${reportId}`);

const apis = {
  createURL,
  deleteURL,
  getURLs,
  // getReportByProfileId,
};

export default apis;
