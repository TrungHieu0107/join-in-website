import { CommonResponse } from 'src/models/common/CommonResponse';
import axiosClient from './api-client'
import { Major } from 'src/models/class';

const URL = '/majors';

export const majorAPI = {
  getList()  {
    return axiosClient.get(`${URL}`)
  },

  getById(id:string) {
    return axiosClient.get(`${URL}/${id}`)
  },

  post(data: Major) {
    return axiosClient.post(`${URL}`,data)
  },

  delete(id:string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: Major) {
    return axiosClient.put(`${URL}`,data)
  }
}
