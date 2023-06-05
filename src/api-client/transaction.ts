import { Transaction } from 'src/models/class'
import axiosClient from './api-client'
import { QueryTransactionListModel } from 'src/models/query-models/QueryTransactionListModel';

const URL = '/transactions';

export const transactionAPI = {

  getList(payload?: QueryTransactionListModel) {
    return axiosClient.get('/admin/get-transaction',{
      params: payload
    })
  },

  getById(id:string) {
    return axiosClient.get(`${URL}/${id}`)
  },

  post(data: Transaction) {
    return axiosClient.post(`${URL}`,data)
  },

  delete(id:string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: Transaction) {
    return axiosClient.put(`${URL}`,data)
  },



  // Admin: {
  //   getListTraction(): Transaction[] {
  //     const result: Transaction[] = []
  //     for (let index = 0; index < 80; index++) {
  //       result.push(
  //         new Transaction({
  //           id: index,
  //           status: 'SUCCESS',
  //           type: `Type ${index}`,
  //           transactionDate: moment().format('YYYY-MM-DD'),
  //           user: new User({
  //             id: index,
  //             fullName: `Name ${index}`,
  //             avatar: '',
  //             birthDay: moment().format('YYYY-MM-DD'),
  //             email: `email${index}@gmail.com`
  //           })
  //         })
  //       )
  //     }

  //     return result
  //   }
  // }
}
