import { Group, Major } from './index'

export interface GroupMajor {
  GroupId: number
  MajorId: number
  MemberCount: number
  Status: 'OPEN' | 'CLOSE'
  Group: Group
  Major: Major
}
