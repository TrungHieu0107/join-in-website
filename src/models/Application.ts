import { ApplicationMajor } from './ApplicationMajor'
import { Group } from './Group'
import { User } from './User'

export interface Application {
  Id: number
  CreatedDate: Date
  Status: 'WAITING' | 'APPROVED' | 'DISAPPROVED'
  ConfirmedDate: Date
  Description: string
  UserId: number
  GroupId: number
  User: User
  Group: Group
  ApplicationMajors: ApplicationMajor[]
}
