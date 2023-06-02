import axiosClient from './api-client'
import { Feedback } from 'src/models';

const URL = '/feedbacks';

export const feedbackAPI = {
  getList() {
    return axiosClient.get(`${URL}`)
  },

  getById(id:string) {
    return axiosClient.get(`${URL}/${id}`)
  },

  post(data: Feedback) {
    return axiosClient.post(`${URL}`,data)
  },

  delete(id:string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: Feedback) {
    return axiosClient.put(`${URL}`,data)
  }
}
