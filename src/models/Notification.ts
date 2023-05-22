export interface Notification {
  Id: number
  Name: string
  Content: string
  CreatedDate: Date
  Type: 'INFORMATION' | 'WARNING'
  Status: 'NOT_SEEN_YET' | 'SEEN'
  Image: string
}
