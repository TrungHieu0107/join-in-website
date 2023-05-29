import { Member, Task } from '.'

export class AssignedTask {
  private _taskId: number | undefined
  private _assignedForId: number | undefined
  private _assignedById: number | undefined
  private _assignedDate: Date | undefined
  private _task: Task | undefined
  private _assignedFor: Member | undefined
  private _assignedBy: Member | undefined

  constructor(value: any) {
    this.taskId = value?.taskId
    this.assignedForId = value?.assignedForId
    this.assignedById = value?.assignedById
    this.assignedDate = value?.assignedDate
    this.task = value?.task
    this.assignedFor = value?.assignedFor
    this.assignedBy = value?.assignedBy
  }

  get taskId() {
    return this._taskId
  }

  set taskId(val: number | undefined) {
    this._taskId = val
  }

  get assignedForId() {
    return this._assignedForId
  }

  set assignedForId(val: number | undefined) {
    this._assignedForId = val
  }

  get assignedById() {
    return this._assignedById
  }

  set assignedById(val: number | undefined) {
    this._assignedById = val
  }

  get assignedDate() {
    return this._assignedDate
  }

  set assignedDate(val: Date | undefined) {
    this._assignedDate = val
  }

  get task() {
    return this._task
  }

  set task(val: Task | undefined) {
    this._task = val
  }

  get assignedFor() {
    return this._assignedFor
  }

  set assignedFor(val: Member | undefined) {
    this._assignedFor = val
  }

  get assignedBy() {
    return this._assignedBy
  }

  set assignedBy(val: Member | undefined) {
    this._assignedBy = val
  }
}
