import Dexie, { Table } from 'dexie'

export interface User {
  id?: number
  name: string
  avatar: string
  token: string
}

export class GroupDBDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  groups!: Table<User>

  constructor() {
    super('user')
    this.version(1).stores({
      groups: '++id, name, avatar, token' // Primary key and indexed props
    })
  }
}

export const groupDBDexie = new GroupDBDexie()
