import { GroupMajor, UserMajor, ApplicationMajor } from './index'

export interface Major {
  Id: number
  Name: string
  ApplicationMajors: ApplicationMajor[]
  GroupMajors: GroupMajor[]
  UserMajors: UserMajor[]
}
