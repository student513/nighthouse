import axios from "axios";
import { urlInfo } from "../helper/interface";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const createURL = (payload: urlInfo) => api.post(`/url`, payload);
export const deleteURL = (id: string) => api.delete(`/url/${id}`);
export const getURLs = () => api.get(`/urls`);
