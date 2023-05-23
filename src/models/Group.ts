import { Application } from './Application'
import { GroupMajor } from './GroupMajor'
import { Member } from './Member'
import { Milestone } from './Milestone'
import { Task } from './Task'

export interface Group {
  Id: number
  Name: string
  CreatedDate: Date
  GroupSize: number
  MemberCount: number
  SchoolName: string
  ClassName: string
  SubjectName: string
  Description: string
  Skill: string
  Status: 'ACTIVE' | 'INACTIVE'
  CurrentMilestoneId: number
  CurrentMilestone: Milestone
  Milestones: Milestone[]
  Tasks: Task[]
  GroupMajors: GroupMajor[]
  Applications: Application[]
  Members: Member[]
}
