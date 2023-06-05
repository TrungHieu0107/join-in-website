export class QueryTaskListsModel {
  groupId: string | undefined
  name: string | undefined
  pageSize: number | undefined
  page: number | undefined
  orderBy: string | undefined
  value: string | undefined

  constructor(value?: Partial<QueryTaskListsModel>) {
    this.groupId = value?.groupId
    this.name = value?.name
    this.pageSize = value?.pageSize
    this.page = value?.page
    this.orderBy = value?.orderBy
    this.value = value?.value
  }
}
