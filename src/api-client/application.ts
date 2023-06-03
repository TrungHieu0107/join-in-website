import { ApplicationRequest } from 'src/models/query-models/ApplicationRequest';
import axiosClient from './api-client'

const URL = '/applications';

export const applicationAPI = {
  getList() {
    return axiosClient.get(`${URL}`)
  },

  postApplication(data: ApplicationRequest) {
    return axiosClient.post(`${URL}/send-application`,data)
  },

  postInvitation(data: ApplicationRequest) {
    return axiosClient.post(`${URL}/send-invitation`,data)
  },

  putApplication(data: any) {
    return axiosClient.put(`${URL}/confirm-application`,data)
  }
}
