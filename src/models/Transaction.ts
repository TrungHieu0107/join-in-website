import { User } from "./User"

export interface Transaction {
  Id: number
  TransactionDate: Date
  Status: 'SUCCESS' | 'FAIL' | 'CANCELED'
  Type: ''
  UserId: number
  User: User
}
