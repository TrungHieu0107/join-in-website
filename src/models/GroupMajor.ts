import { Group, Major } from './index'

export interface GroupMajor {
  GroupId: Number
  MajorId: Number
  MemberCount: Number
  Status: 'OPEN' | 'CLOSE'
  Group: Group
  Major: Major
}
