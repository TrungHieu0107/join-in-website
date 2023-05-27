import { User } from '.'

export class Feedback {
  private _id: number | undefined
  private _content: string | undefined
  private _rating: number | undefined
  private _feedbackedDate: Date | undefined
  private _status: 'ACTIVE' | 'INACTIVE' | undefined
  private _feedbackedById: number | undefined
  private _feedbackedForId: number | undefined
  private _feedbackedBy: User | undefined
  private _feedbackedFor: User | undefined

  get id() {
    return this._id
  }

  set id(val: number | undefined) {
    this._id = val
  }

  get content() {
    return this._content
  }

  set content(val: string | undefined) {
    this._content = val
  }

  get rating() {
    return this._rating
  }

  set rating(val: number | undefined) {
    this._rating = val
  }

  get feedbackedDate() {
    return this._feedbackedDate
  }

  set feedbackedDate(val: Date | undefined) {
    this._feedbackedDate = val
  }

  get status() {
    return this._status
  }

  set status(val: 'ACTIVE' | 'INACTIVE' | undefined) {
    this._status = val
  }

  get feedbackedById() {
    return this._feedbackedById
  }

  set feedbackedById(val: number | undefined) {
    this._feedbackedById = val
  }

  get feedbackedForId() {
    return this._feedbackedForId
  }

  set feedbackedForId(val: number | undefined) {
    this._feedbackedForId = val
  }

  get feedbackedBy() {
    return this._feedbackedBy
  }

  set feedbackedBy(val: User | undefined) {
    this._feedbackedBy = val
  }

  get feedbackedFor() {
    return this._feedbackedFor
  }

  set feedbackedFor(val: User | undefined) {
    this._feedbackedFor = val
  }

  constructor(value?: any) {
    this.id = value?.id
    this.content = value?.content
    this.rating = value?.rating
    this.feedbackedDate = value?.feedbackedDate
    this.status = value?.status
    this.feedbackedById = value?.feedbackedById
    this.feedbackedForId = value?.feedbackedForId
    this.feedbackedBy = value?.feedbackedBy
    this.feedbackedFor = value?.feedbackedFor
  }
}
