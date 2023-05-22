import { Application } from '.'
import { Feedback } from './Feedback'
import { Member } from './Member'
import { Transaction } from './Transaction'
import { UserMajor } from './UserMajor'

export interface User {
  Id: Number
  FullName: String
  Password: String
  Email: String
  Phone: String
  BirthDay: Date
  Gender: Boolean
  Description: String
  Skill: String
  OtherContact: String
  Avatar: String
  Theme: String
  Status: 'ACTIVE' | 'INACTIVE'
  IsAdmin: Boolean
  ReceivedFeedbacks: Feedback[]
  SentFeedbacks: Feedback[]
  Transactions: Transaction[]
  UserMajors: UserMajor[]
  Members: Member[]
  Applications: Application[]
}
