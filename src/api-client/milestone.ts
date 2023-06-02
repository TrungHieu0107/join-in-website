import axiosClient from './api-client'
import { Milestone } from 'src/models';

const URL = '/milestones';

export const milestoneAPI = {
  getList() {
    return axiosClient.get(`${URL}`)
  },

  getById(id:string) {
    return axiosClient.get(`${URL}/${id}`)
  },

  post(data: Milestone) {
    return axiosClient.post(`${URL}`,data)
  },

  delete(id:string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: Milestone) {
    return axiosClient.put(`${URL}`,data)
  }
}
