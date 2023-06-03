import { User } from 'src/models/class'
import axiosClient from './api-client'

export const authAPI = {
  login(payload: any) {
    return axiosClient.post('/authenticate', payload)
  },

  logout() {
    return axiosClient.post('/logout')
  },

  getProfile() {
    return axiosClient.get('profile')
  },

  signUp(payload: any) {
    console.log(payload)

    return axiosClient.post('/register', payload)
  }
}
