export class Notification {
  private _id: string | undefined
  private _name: string | undefined
  private _content: string | undefined
  private _createdDate: Date | undefined
  private _type: 'INFORMATION' | 'WARNING' | undefined
  private _status: 'NOT_SEEN_YET' | 'SEEN' | undefined
  private _image: string | undefined

  constructor(value?: any) {
    this.id = value?.id
    this.name = value?.name
    this.content = value?.content
    this.createdDate = value?.createdDate
    this.type = value?.type
    this.status = value?.status
    this.image = value?.image
  }

  get id() {
    return this._id
  }

  set id(val: string | undefined) {
    this._id = val
  }

  get name() {
    return this._name
  }

  set name(val: string | undefined) {
    this._name = val
  }

  get content() {
    return this._content
  }

  set content(val: string | undefined) {
    this._content = val
  }

  get createdDate() {
    return this._createdDate
  }

  set createdDate(val: Date | undefined) {
    this._createdDate = val
  }

  get type() {
    return this._type
  }

  set type(val: 'INFORMATION' | 'WARNING' | undefined) {
    this._type = val
  }

  get status() {
    return this._status
  }

  set status(val: 'NOT_SEEN_YET' | 'SEEN' | undefined) {
    this._status = val
  }

  get image() {
    return this._image
  }

  set image(val: string | undefined) {
    this._image = val
  }
}
