import { ApplicationRequest } from 'src/models/query-models/ApplicationRequest';
import axiosClient from './api-client'
import { groupDBDexie } from 'src/models/db/GroupDB';

const URL = '/applications';

export const applicationAPI = {
  async getList() {
    const groupData = await groupDBDexie.getGroup();

    return axiosClient.get(`${URL}?groupId=${groupData?.id}`)
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
