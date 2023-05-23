import { Member } from './Member'
import { Task } from './Task'

export interface AssignedTask {
  TaskId: number
  AssignedForId: number
  AssignedById: number
  AssignedDate: Date
  Task: Task
  AssignedFor: Member
  AssignedBy: Member
}
