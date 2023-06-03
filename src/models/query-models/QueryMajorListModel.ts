export class QueryMajorListModel {
  name: string | undefined
  pageSize: number | undefined
  page: number | undefined
  orderBy: string | undefined
  value: string | undefined

  constructor(value?: Partial<QueryMajorListModel>) {
    this.name = value?.name
    this.pageSize = value?.pageSize
    this.page = value?.page
    this.orderBy = value?.orderBy
    this.value = value?.value
  }
}
