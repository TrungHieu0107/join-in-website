import { ThemeColor } from 'src/@core/layouts/types'

export interface StatusObj {
  [key: string]: {
    color: ThemeColor
    label?: string
  }
}

export const statusObj: StatusObj = {
  NOT_STARTED_YET: { color: 'info', label: 'NOT STATIC YET' },
  WORKING: { color: 'primary', label: 'WORKING' },
  FINISHED: { color: 'success', label: 'FINISHED' }
}
