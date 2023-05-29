export class ObjectSelectType {
  private _value: string | undefined
  private _lable: string | undefined

  constructor(value: string, label: string) {
    this.lable = label
    this.value = value
  }

  get value() {
    return this._value
  }

  set value(val: string | undefined) {
    this._value = val
  }

  get lable() {
    return this._lable
  }

  set lable(val: string | undefined) {
    this._lable = val
  }
}
