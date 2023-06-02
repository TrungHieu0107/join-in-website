import axiosClient from './api-client'
import { Member } from 'src/models';

const URL = '/members';

export const memberAPI = {
  getList() {
    return axiosClient.get(`${URL}`)
  },

  getById(id:string) {
    return axiosClient.get(`${URL}/${id}`)
  },

  post(data: Member) {
    return axiosClient.post(`${URL}`,data)
  },

  delete(id:string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: Member) {
    return axiosClient.put(`${URL}`,data)
  }
}
