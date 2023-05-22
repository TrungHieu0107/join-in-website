import { ApplicationMajor } from './ApplicationMajor'
import { Group } from './Group'
import { User } from './User'

export interface Application {
  Id: Number
  CreatedDate: Date
  Status: 'WAITING' | 'APPROVED' | 'DISAPPROVED'
  ConfirmedDate: Date
  Description: String
  UserId: Number
  GroupId: Number
  User: User
  Group: Group
  ApplicationMajors: ApplicationMajor[]
}
