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
  },
  sendVerifyEmail(email: string) {
    return axiosClient.get('/users/send-email-verification', {
      params: {
        email: email
      }
    })
  },

  getUrlGoogleLogin() {
    return axiosClient.get('/oauth2/google-sign-in')
  },

  getTokenLoginGoogle(googleToken: string) {
    const data = {
      googleToken: googleToken
    }
    return axiosClient.post('/oauth2/call-back', data)
  }
}
