import { Major, User } from '.'

export class UserMajor {
  private _userId: number | undefined
  private _majorId: number | undefined
  private _user: User | undefined
  private _major: Major | undefined

  constructor(value?: any) {
    this.userId = value?.userId
    this.majorId = value?.majorId
    this.user = value?.user
    this.major = value?.major
  }

  get userId() {
    return this._userId
  }

  set userId(val: number | undefined) {
    this._userId = val
  }

  get majorId() {
    return this._majorId
  }

  set majorId(val: number | undefined) {
    this._majorId = val
  }

  get user() {
    return this._user
  }

  set user(val: User | undefined) {
    this._user = val
  }

  get major() {
    return this._major
  }

  set major(val: Major | undefined) {
    this._major = val
  }
}
