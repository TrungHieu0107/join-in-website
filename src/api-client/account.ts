import { User } from 'src/models'
import axiosClient from './api-client'

export const authApi = {
  login(payload: User) {
    return axiosClient.post('login', payload)
  },

  logout() {
    return axiosClient.post('/logout')
  },

  getProfile() {
    return axiosClient.get('profile')
  },

  signUp(payload: User) {
    return axiosClient.get('profile')
  }
}
