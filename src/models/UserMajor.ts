import { Major } from '.'
import { User } from './User'

export interface UserMajor {
  UserId: number
  MajorId: number
  User: User
  Major: Major
}
