export class QueryTaskListsModel {
  groupId: string | undefined
  name: string | undefined
  pageSize: number
  page: number
  orderBy: string | undefined
  value: string | undefined
  total: number | undefined

  constructor(value?: Partial<QueryTaskListsModel>) {
    this.groupId = value?.groupId
    this.name = value?.name
    this.pageSize = value?.pageSize ?? 10
    this.page = value?.page ?? 1
    this.orderBy = value?.orderBy
    this.value = value?.value
    this.total = value?.total
  }
}
