import axiosClient from './api-client'
import { Application } from 'src/models';

const URL = '/applications';

export const applicationAPI = {
  getList() {
    return axiosClient.get(`${URL}`)
  },

  postApplication(data: Application) {
    return axiosClient.post(`${URL}/send-application`,data)
  },

  postInvitation(data: Application) {
    return axiosClient.post(`${URL}/send-invitation`,data)
  },

  putApplication(data: Application) {
    return axiosClient.put(`${URL}/confirm-application`,data)
  }
}
