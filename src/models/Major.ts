import { type } from 'os'
import { GroupMajor, UserMajor } from '.'
import { ApplicationMajor } from './ApplicationMajor'
export interface Major {
  Id: Number
  Name: String
  ApplicationMajors: ApplicationMajor[]
  GroupMajors: GroupMajor[]
  UserMajors: UserMajor[]
}
