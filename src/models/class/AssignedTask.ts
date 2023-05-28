import { Member, Task } from '.'

export class AssignedTask {
  private _TaskId: number | undefined
  private _AssignedForId: number | undefined
  private _AssignedById: number | undefined
  private _AssignedDate: Date | undefined
  private _Task: Task | undefined
  private _AssignedFor: Member | undefined
  private _AssignedBy: Member | undefined

  constructor(value: any) {
    this.TaskId = value?.TaskId
    this.AssignedForId = value?.AssignedForId
    this.AssignedById = value?.AssignedById
    this.AssignedDate = value?.AssignedDate
    this.Task = value?.Task
    this.AssignedFor = value?.AssignedFor
    this.AssignedBy = value?.AssignedBy
  }

  get TaskId() {
    return this._TaskId
  }

  set TaskId(val: number | undefined) {
    this._TaskId = val
  }

  get AssignedForId() {
    return this._AssignedForId
  }

  set AssignedForId(val: number | undefined) {
    this._AssignedForId = val
  }

  get AssignedById() {
    return this._AssignedById
  }

  set AssignedById(val: number | undefined) {
    this._AssignedById = val
  }

  get AssignedDate() {
    return this._AssignedDate
  }

  set AssignedDate(val: Date | undefined) {
    this._AssignedDate = val
  }

  get Task() {
    return this._Task
  }

  set Task(val: Task | undefined) {
    this._Task = val
  }

  get AssignedFor() {
    return this._AssignedFor
  }

  set AssignedFor(val: Member | undefined) {
    this._AssignedFor = val
  }

  get AssignedBy() {
    return this._AssignedBy
  }

  set AssignedBy(val: Member | undefined) {
    this._AssignedBy = val
  }
}
