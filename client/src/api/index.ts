import axios from "axios"

import { UrlPayload } from "../interfaces/ProfileType"

const api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}`,
})

export const createURL = (payload: UrlPayload) => api.post(`/url`, payload)
export const deleteURL = (id: string) => api.delete(`/url/${id}`)
export const getURLs = () => api.get(`/urls`)
export const getReports = (profileId: string) => api.get(`report/${profileId}`)
