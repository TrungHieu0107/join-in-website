
export interface GroupRequest {
  Id?: string
  Name?: string
  CreatedDate?: Date
  GroupSize?: number
  MemberCount?: number
  SchoolName?: string
  ClassName?: string
  SubjectName?: string
  Description?: string
  Skill?: string
  Avatar?: string
  Theme?: string
  Status?: 'ACTIVE' | 'INACTIVE'
  CurrentMilestoneId?: string
}
