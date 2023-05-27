import { StatusObj } from './task-status'

export const importantLevel: StatusObj = {
  OPTIONAL: { color: 'info', label: 'OPTIONAL' },
  VERY_HIGH: { color: 'error', label: 'VERY HIGH' },
  HIGH: { color: 'primary', label: 'HIGH' },
  MEDIUM: { color: 'warning', label: 'MEDIUM' },
  LOW: { color: 'success', label: 'LOW' }
}

export const labelImportantLevel: StatusObj = {}
