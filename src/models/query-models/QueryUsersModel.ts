export class QueryUsersModel {
  email: string
  pageSize: number
  currentPage: number
  total: number

  constructor(value?: Partial<QueryUsersModel> | any) {
    this.email = value?.email ?? ''
    this.pageSize = value?.pageSize ?? 10
    this.currentPage = value?.currentPage ?? 1
    this.total = value?.total ?? 0
  }
}
