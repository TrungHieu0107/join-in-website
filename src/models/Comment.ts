import { Task } from "./Task"

export interface Comment {
  Id: Number
  Content: String
  CreatedDate: Date
  Status: 'ACTIVE' | 'INACTIVE'
  TaskId: Number
  Task: Task
}
