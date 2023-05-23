import { AssignedTask } from './AssignedTask'
import { Group } from './Group'
import { Task } from './Task'
import { User } from './User'

export interface Member {
  Id: number
  UserId: number
  GroupId: number
  JoinedDate: Date
  LeftDate: Date
  Role: 'MEMBER' | 'SUB_LEADER' | 'LEADER'
  User: User
  Group: Group
  AssignedTasksFor: AssignedTask[]
  AssignedTasksBy: AssignedTask[]
  Tasks: Task[]
}
