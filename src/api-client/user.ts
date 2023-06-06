import { Major, User, UserMajor } from 'src/models/class'
import axiosClient from './api-client'
import { UserCompleteProfileModel } from 'src/models/query-models/UserCompleteProfileModel'

const URL = '/users'

export const userAPI = {
  getList(email: string) {
    return axiosClient.get(`${URL}?email=${email}`)
  },

  getById(id: string) {
    return axiosClient.get(`${URL}/profile?userId=${id}`)
  },

  post(data: User) {
    return axiosClient.post(`${URL}`, data)
  },

  delete(id: string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: UserCompleteProfileModel) {
    return axiosClient.put(`${URL}/update-profile`, data)
  },

  uploadImage(data?: File | undefined) {
    if (data === undefined) {
      return Promise.resolve(true)
    }

    return axiosClient.post(
      `${URL}/upload/image`,
      {
        file: data
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true'
        }
      }
    )
  },

  getLoginProfile() {
    return axiosClient.get(`${URL}/user/profile`)
  },

  completeProfile(data: UserCompleteProfileModel, verifyToken: string) {
    return axiosClient.put(`${URL}/complete-profile?verifyToken=${verifyToken}`, data)
  },

  getVerifyCode() {
    return axiosClient.get(`${URL}/send-verifyCode`)
  },

  changePassword(payload: { password: string; verifyToken: string }) {
    return axiosClient.put(`${URL}/reset-password`, payload)
  },

  Admin: {
    getListUser(): User[] {
      const result = []
      for (let index = 0; index < 100; index++) {
        result.push(
          new User({
            id: 'index',
            fullName: `Nguyễn ${index}`,
            email: `Nguyen${index}@gmail.com`,
            avatar: '',
            gender: true,
            phone: '0123456789',
            birthDay: new Date(),
            description: 'Tôi là superman',
            skill: 'Tôi có thể bay',
            otherContact: 'Tôi có thể đập phá mọi thứ',
            status: 'ACTIVE',
            isAdmin: false,
            userMajors: [
              new UserMajor({
                major: new Major({
                  name: 'Bay vòng quanh trái đất'
                })
              })
            ]
          })
        )
      }

      return result
    }
  }
}
