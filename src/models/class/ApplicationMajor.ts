import { Application, Major } from '.'

export class ApplicationMajor {
  private _applicationId: number | undefined
  private _majorId: number | undefined
  private _application: Application | undefined
  private _major: Major | undefined

  constructor(value?: any) {
    this.applicationId = value?.applicationId
    this.majorId = value?.majorId
    this.application = value?.application
    this.major = value?.major
  }

  get applicationId() {
    return this._applicationId
  }

  set applicationId(val: number | undefined) {
    this._applicationId = val
  }

  get majorId() {
    return this._majorId
  }

  set majorId(val: number | undefined) {
    this._majorId = val
  }

  get application() {
    return this._application
  }

  set application(val: Application | undefined) {
    this._application = val
  }

  get major() {
    return this._major
  }

  set major(val: Major | undefined) {
    this._major = val
  }
}
