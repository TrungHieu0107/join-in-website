export class Notification {
  logo: string | undefined
  message: string | undefined
  link: string | undefined
  notificationStatus: number
  notificationType: number
  createdDate: string | undefined

  constructor(value: Partial<Notification>) {
    this.logo = value?.logo
    this.message = value?.message
    this.link = value?.link
    this.notificationStatus = value?.notificationStatus ?? 0
    this.notificationType = value?.notificationType ?? 0
    this.createdDate = value?.createdDate
  }
}
