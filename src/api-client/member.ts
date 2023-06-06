import { groupDBDexie } from 'src/models/db/GroupDB'
import axiosClient from './api-client'
import { Member } from 'src/models'

const URL = '/members'

export const memberAPI = {
  async getList() {
    const groupData = await groupDBDexie.getGroup()

    return axiosClient.get(`${URL}/${groupData?.id}`)
  },

  getAllMember(groupId: string) {
    return axiosClient.get(`${URL}/${groupId}`)
  },

  post(data: Member) {
    return axiosClient.post(`${URL}`, data)
  },

  delete(id: string) {
    return axiosClient.delete(`${URL}/${id}`,)
  },

  put(data: any) {
    return axiosClient.put(`${URL}/assign-role`)
  }
}
