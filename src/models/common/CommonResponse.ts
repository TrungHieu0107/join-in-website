import { Pagination } from './Pagination'

export class CommonResponse {
  private _data: any | undefined
  private _message: string | undefined
  private _status: number | undefined
  private _pagination: Pagination | undefined

  constructor(value: Partial<CommonResponse>) {
    this.data = value.data
    this.message = value.message ?? ''
    this.status = value.status ?? 0
    this.pagination = value.pagination
  }

  get data() {
    return this._data
  }

  set data(val: any | undefined) {
    this._data = val
  }

  get message() {
    return this._message
  }

  set message(val: string | undefined) {
    this._message = val
  }

  get status() {
    return this._status
  }

  set status(val: number | undefined) {
    this._status = val
  }

  get pagination() {
    return this._pagination
  }

  set pagination(val: Pagination | undefined) {
    this._pagination = val
  }
}
