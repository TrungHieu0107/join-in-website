export class QueryTaskListsModel {
  private _groupId: string | undefined
  private _name: string | undefined
  private _pageSize: number | undefined
  private _page: number | undefined
  private _orderBy: string | undefined
  private _value: string | undefined

  constructor(value?: Partial<QueryTaskListsModel>) {
    this.groupId = value?.groupId
    this.name = value?.name
    this.pageSize = value?.pageSize
    this.page = value?.page
    this.orderBy = value?.orderBy
    this.value = value?.value
  }

  get groupId() {
    return this._groupId
  }

  set groupId(val: string | undefined) {
    this._groupId = val
  }

  get name() {
    return this._name
  }

  set name(val: string | undefined) {
    this._name = val
  }

  get pageSize() {
    return this._pageSize
  }

  set pageSize(val: number | undefined) {
    this._pageSize = val
  }

  get page() {
    return this._page
  }

  set page(val: number | undefined) {
    this._page = val
  }

  get orderBy() {
    return this._orderBy
  }

  set orderBy(val: string | undefined) {
    this._orderBy = val
  }

  get value() {
    return this._value
  }

  set value(val: string | undefined) {
    this._value = val
  }
}