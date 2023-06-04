import { User } from './index'

export class Transaction {
  private _id: string | undefined
  private _transactionDate: Date | string | undefined
  private _status: 'SUCCESS' | 'FAIL' | 'CANCELED' | undefined
  private _type: string | undefined
  private _userId: string | undefined
  private _user: User | undefined

  constructor(value: Partial<Transaction>) {
    this.id = value?.id
    this.transactionDate = value?.transactionDate
    this.status = value?.status
    this.type = value?.type
    this.userId = value?.userId
    this.user = value?.user
  }

  get id() {
    return this._id
  }

  set id(val: string | undefined) {
    this._id = val
  }

  get transactionDate() {
    return this._transactionDate
  }

  set transactionDate(val: Date | string | undefined) {
    this._transactionDate = val
  }

  get status() {
    return this._status
  }

  set status(val: 'SUCCESS' | 'FAIL' | 'CANCELED' | undefined) {
    this._status = val
  }

  get type() {
    return this._type
  }

  set type(val: string | undefined) {
    this._type = val
  }

  get userId() {
    return this._userId
  }

  set userId(val: string | undefined) {
    this._userId = val
  }

  get user() {
    return this._user
  }

  set user(val: User | undefined) {
    this._user = val
  }
}
