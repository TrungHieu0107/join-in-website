import { Application } from './Application'
import { GroupMajor } from './GroupMajor'
import { Member } from './Member'
import { Milestone } from './Milestone'
import { Task } from './Task'

export interface Group {
  Id: Number
  Name: String
  CreatedDate: Date
  GroupSize: Number
  MemberCount: Number
  SchoolName: String
  ClassName: String
  SubjectName: String
  Description: String
  Skill: String
  Status: 'ACTIVE' | 'INACTIVE'
  CurrentMilestoneId: Number
  CurrentMilestone: Milestone
  Milestones: Milestone[]
  Tasks: Task[]
  GroupMajors: GroupMajor[]
  Applications: Application[]
  Members: Member[]
}
