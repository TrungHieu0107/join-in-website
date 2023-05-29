import { ObjectSelectType } from 'src/models/common/ObjectSelectType'
import { StatusObj } from './task-status'

export const importantLevel: StatusObj = {
  OPTIONAL: { color: 'info', label: 'OPTIONAL', value: 'OPTIONAL' },
  VERY_HIGH: { color: 'error', label: 'VERY HIGH', value: 'VERY_HIGH' },
  HIGH: { color: 'primary', label: 'HIGH', value: 'HIGH' },
  MEDIUM: { color: 'warning', label: 'MEDIUM', value: 'MEDIUM' },
  LOW: { color: 'success', label: 'LOW', value: 'LOW' }
}

export const importantLevelList: ObjectSelectType[] = [
  new ObjectSelectType('OPTIONAL', 'OPTIONAL'),
  new ObjectSelectType('VERY_HIGH', 'VERY HIGH'),
  new ObjectSelectType('HIGH', 'HIGH'),
  new ObjectSelectType('MEDIUM', 'MEDIUM'),
  new ObjectSelectType('LOW', 'LOW')
]
