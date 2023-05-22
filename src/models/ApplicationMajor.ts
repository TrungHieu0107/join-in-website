import { Application } from './Application'
import { Major } from './Major'

export interface ApplicationMajor {
  ApplicationId: Number
  MajorId: Number
  Application: Application
  Major: Major
}
