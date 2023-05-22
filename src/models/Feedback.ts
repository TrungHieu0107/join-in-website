import { User } from './User'

export interface Feedback {
  Id: Number
  Content: String
  Rating: Number
  FeedbackedDate: Date
  Status: 'ACTIVE' | 'INACTIVE'
  FeedbackedById: Number
  FeedbackedForId: Number
  FeedbackedBy: User
  FeedbackedFor: User
}
