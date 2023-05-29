import { ThemeColor } from 'src/@core/layouts/types'
import { ObjectSelectType } from 'src/models/common/ObjectSelectType'

export interface StatusObj {
  [key: string]: {
    color: ThemeColor
    label?: string
    value?: string
  }
}

export const statusObj: StatusObj = {
  NOT_STARTED_YET: { color: 'info', label: 'NOT STATIC YET' },
  WORKING: { color: 'primary', label: 'WORKING' },
  FINISHED: { color: 'success', label: 'FINISHED' }
}

export const listTaskStatusSelect: ObjectSelectType[] = [
  new ObjectSelectType('NOT_STARTED_YET', 'NOT STARTED YET'),
  new ObjectSelectType('WORKING', 'WORKING'),
  new ObjectSelectType('FINISHED', 'FINISHED')
]
