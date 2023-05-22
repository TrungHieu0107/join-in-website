import { Member } from './Member'
import { Task } from './Task'

export interface AssignedTask {
  TaskId: Number
  AssignedForId: Number
  AssignedById: Number
  AssignedDate: Date
  Task: Task
  AssignedFor: Member
  AssignedBy: Member
}
