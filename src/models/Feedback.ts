import { User } from './User'

export interface Feedback {
  Id: number
  Content: string
  Rating: number
  FeedbackedDate: Date
  Status: 'ACTIVE' | 'INACTIVE'
  FeedbackedById: number
  FeedbackedForId: number
  FeedbackedBy: User
  FeedbackedFor: User
}
