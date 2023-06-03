import { GroupMajor, UserMajor, ApplicationMajor } from '.'

export class Major {
  private _id: string | undefined
  private _name: string | undefined
  private _shortName: string | undefined
  private _applicationMajors: ApplicationMajor[] | undefined
  private _groupMajors: GroupMajor[] | undefined
  private _userMajors: UserMajor[] | undefined

  constructor(value?: any) {
    this.id = value?.id
    this.name = value?.name
    this.shortName = value?.shortName
    this.applicationMajors = value?.applicationMajors
    this.groupMajors = value?.groupMajors
    this.userMajors = value?.userMajors
  }

  get id() {
    return this._id
  }

  set id(val: string | undefined) {
    this._id = val
  }

  get name() {
    return this._name
  }

  set name(val: string | undefined) {
    this._name = val
  }
  get shortName() {
    return this._shortName
  }

  set shortName(val: string | undefined) {
    this._shortName = val
  }

  get shortName() {
    return this._name
  }

  set shortName(val: string | undefined) {
    this._shortName = val
  }

  get applicationMajors() {
    return this._applicationMajors
  }

  set applicationMajors(val: ApplicationMajor[] | undefined) {
    this._applicationMajors = val
  }

  get groupMajors() {
    return this._groupMajors
  }

  set groupMajors(val: GroupMajor[] | undefined) {
    this._groupMajors = val
  }

  get userMajors() {
    return this._userMajors
  }

  set userMajors(val: UserMajor[] | undefined) {
    this._userMajors = val
  }
}
