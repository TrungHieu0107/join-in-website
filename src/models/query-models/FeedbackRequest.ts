export interface FeedbackRequest {
  Id?: string
  CreatedDate?: Date
  Rating?: number|null
  Content?: string
  GroupId?: string
  FeedbackedForId?: string
}
