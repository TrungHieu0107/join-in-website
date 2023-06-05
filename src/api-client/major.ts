import { QueryMajorListModel } from 'src/models/query-models/QueryMajorListModel'
import axiosClient from './api-client'
import { Major } from 'src/models'

const URL = '/majors'

export const majorAPI = {
  getList(payload?: QueryMajorListModel) {
    return axiosClient.get(`${URL}`, {
      params: payload
    })
  },

  getById(id: string) {
    return axiosClient.get(`${URL}/${id}`)
  },

  post(data: Major) {
    return axiosClient.post(`${URL}`, data)
  },

  delete(id: string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: Major) {
    return axiosClient.put(`${URL}`, data)
  },

  getAllMajorOfUser() {
    return axiosClient.get('/user-majors')
  }
}
