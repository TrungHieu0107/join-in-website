import { Application } from './Application'
import { Major } from './Major'

export interface ApplicationMajor {
  ApplicationId: number
  MajorId: number
  Application: Application
  Major: Major
}
