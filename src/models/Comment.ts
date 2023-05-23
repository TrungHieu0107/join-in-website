import { Task } from './Task'

export interface Comment {
  Id: number
  Content: string
  CreatedDate: Date
  Status: 'ACTIVE' | 'INACTIVE'
  TaskId: number
  Task: Task
}
