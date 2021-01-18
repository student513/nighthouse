import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const createURL = (payload: any) => api.post(`/url`, payload);
export const deleteURL = (id: string) => api.delete(`/url/${id}`);
export const getURLs = () => api.get(`/urls`);

const apis = {
  createURL,
  deleteURL,
  getURLs,
};

export default apis;
