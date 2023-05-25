import { AssignedTask } from './AssignedTask'
import { Group } from './Group'
import { User } from './User'

export interface Task {
  Id?: number
  Name?: string
  StartDateDeadline?: Date
  EndDateDeadline?: Date
  FinishedDate?: Date
  ImpotantLevel?: number
  EstimatedDays?: number
  Description?: string
  Status?: 'NOT_STARTED_YET' | 'WORKING' | 'FINISHED'
  GroupId?: number
  CreatedById?: number
  MainTaskId?: number
  Group?: Group
  CreatedBy?: User
  MainTask?: Task
  SubTasks?: Task[]
  AssignedTasks?: AssignedTask[]
  Comments?: Comment[]
}
