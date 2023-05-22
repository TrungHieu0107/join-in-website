import { Group } from './Group'

export interface Milestone {
  Id: Number
  Name: string
  Description: string
  Order: number
  GroupId: number
  Group: Group
  GroupForCurrent: Group
}
