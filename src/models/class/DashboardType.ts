

export class DashboardType {
  private _totalRevenue: number | undefined
  private _totalUser: number | undefined
  private _totalFreemiumUser: number | undefined
  private _totalPremiumUser: number | undefined
  private _totalUserGrownPercentLastWeek: number | undefined
  private _freeUserCount: number[] | undefined
  private _preUserCount: number[] | undefined
  private _activeUserCount: number[] | undefined

  constructor(value?: any) {
    this.totalRevenue = value?.totalRevenue
    this.totalUser = value?.totalUser
    this.totalFreemiumUser = value?.totalFreemiumUser
    this.totalPremiumUser = value?.totalPremiumUser
    this.totalUserGrownPercentLastWeek = value?.totalUserGrownPercentLastWeek
    this.freeUserCount = value?.freeUserCount
    this.preUserCount = value?.preUserCount
    this.activeUserCount = value?.activeUserCount
  }

  get totalRevenue() {
    return this._totalRevenue
  }

  set totalRevenue(val: number | undefined) {
    this._totalRevenue = val
  }

  get totalUser() {
    return this._totalUser
  }

  set totalUser(val: number | undefined) {
    this._totalUser = val
  }

  get totalFreemiumUser() {
    return this._totalFreemiumUser
  }

  set totalFreemiumUser(val: number | undefined) {
    this._totalFreemiumUser = val
  }

  get totalPremiumUser() {
    return this._totalPremiumUser
  }

  set totalPremiumUser(val: number | undefined) {
    this._totalPremiumUser = val
  }

  get totalUserGrownPercentLastWeek() {
    return this._totalUserGrownPercentLastWeek
  }

  set totalUserGrownPercentLastWeek(val: number | undefined) {
    this._totalUserGrownPercentLastWeek = val
  }

  get freeUserCount() {
    return this._freeUserCount
  }

  set freeUserCount(val: number[] | undefined) {
    this._freeUserCount = val
  }

  get preUserCount() {
    return this._preUserCount
  }

  set preUserCount(val: number[] | undefined) {
    this._preUserCount = val
  }

  get activeUserCount() {
    return this._activeUserCount
  }

  set activeUserCount(val: number[] | undefined) {
    this._activeUserCount = val
  }

}
