import { FeedbackRequest } from 'src/models/query-models/FeedbackRequest';
import axiosClient from './api-client'

const URL = '/feedbacks';

export const feedbackAPI = {
  getList() {
    return axiosClient.get(`${URL}`)
  },

  getById(id:string) {
    return axiosClient.get(`${URL}/${id}`)
  },

  post(data: FeedbackRequest) {
    return axiosClient.post(`${URL}`,data)
  },

  delete(id:string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: FeedbackRequest) {
    return axiosClient.put(`${URL}`,data)
  }
}
