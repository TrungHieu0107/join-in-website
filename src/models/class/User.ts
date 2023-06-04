import { Application, Feedback, Member, Transaction, UserMajor } from '.'

export class User {
  private _id: string | undefined
  private _fullName: string | undefined
  private _password: string | undefined
  private _email: string | undefined
  private _phone: string | undefined
  private _birthDay: Date | string | undefined
  private _gender: boolean | undefined
  private _description: string | undefined
  private _skill: string | undefined
  private _otherContact: string | undefined
  private _avatar: string | undefined
  private _theme: string | undefined
  private _status: 'ACTIVE' | 'INACTIVE' | undefined
  private _isAdmin: boolean | undefined
  private _receivedFeedbacks: Feedback[] | undefined
  private _sentFeedbacks: Feedback[] | undefined
  private _transactions: Transaction[] | undefined
  private _userMajors: UserMajor[] | undefined
  private _members: Member[] | undefined
  private _applications: Application[] | undefined

  constructor(value?: Partial<User>) {
    this.id = value?.id
    this.fullName = value?.fullName
    this.password = value?.password
    this.email = value?.email
    this.phone = value?.phone
    this.birthDay = value?.birthDay
    this.gender = value?.gender
    this.description = value?.description
    this.skill = value?.skill
    this.otherContact = value?.otherContact
    this.avatar = value?.avatar
    this.theme = value?.theme
    this.status = value?.status
    this.isAdmin = value?.isAdmin
    this.receivedFeedbacks = value?.receivedFeedbacks
    this.sentFeedbacks = value?.sentFeedbacks
    this.transactions = value?.transactions
    this.userMajors = value?.userMajors
    this.members = value?.members
    this.applications = value?.applications
  }

  get id() {
    return this._id
  }

  set id(val: string | undefined) {
    this._id = val
  }

  get fullName() {
    return this._fullName
  }

  set fullName(val: string | undefined) {
    this._fullName = val
  }

  get password() {
    return this._password
  }

  set password(val: string | undefined) {
    this._password = val
  }

  get email() {
    return this._email
  }

  set email(val: string | undefined) {
    this._email = val
  }

  get phone() {
    return this._phone
  }

  set phone(val: string | undefined) {
    this._phone = val
  }

  get birthDay() {
    return this._birthDay
  }

  set birthDay(val: Date | string | undefined) {
    this._birthDay = val
  }

  get gender() {
    return this._gender
  }

  set gender(val: boolean | undefined) {
    this._gender = val
  }

  get description() {
    return this._description
  }

  set description(val: string | undefined) {
    this._description = val
  }

  get skill() {
    return this._skill
  }

  set skill(val: string | undefined) {
    this._skill = val
  }

  get otherContact() {
    return this._otherContact
  }

  set otherContact(val: string | undefined) {
    this._otherContact = val
  }

  get avatar() {
    return this._avatar
  }

  set avatar(val: string | undefined) {
    this._avatar = val
  }

  get theme() {
    return this._theme
  }

  set theme(val: string | undefined) {
    this._theme = val
  }

  get status() {
    return this._status
  }

  set status(val: 'ACTIVE' | 'INACTIVE' | undefined) {
    this._status = val
  }

  get isAdmin() {
    return this._isAdmin
  }

  set isAdmin(val: boolean | undefined) {
    this._isAdmin = val
  }

  get receivedFeedbacks() {
    return this._receivedFeedbacks
  }

  set receivedFeedbacks(val: Feedback[] | undefined) {
    this._receivedFeedbacks = val
  }

  get sentFeedbacks() {
    return this._sentFeedbacks
  }

  set sentFeedbacks(val: Feedback[] | undefined) {
    this._sentFeedbacks = val
  }

  get transactions() {
    return this._transactions
  }

  set transactions(val: Transaction[] | undefined) {
    this._transactions = val
  }

  get userMajors() {
    return this._userMajors
  }

  set userMajors(val: UserMajor[] | undefined) {
    this._userMajors = val
  }

  get members() {
    return this._members
  }

  set members(val: Member[] | undefined) {
    this._members = val
  }

  get applications() {
    return this._applications
  }

  set applications(val: Application[] | undefined) {
    this._applications = val
  }
}
