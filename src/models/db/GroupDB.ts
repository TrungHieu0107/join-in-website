import Dexie, { Table } from 'dexie'

export interface Group {
  id?: number
  name: string
  avatar: string
}

export class GroupDBDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  groups!: Table<Group>

  constructor() {
    super('groups')
    this.version(1).stores({
      groups: '++id, name, string' // Primary key and indexed props
    })
  }

  
}

export const groupDBDexie = new GroupDBDexie()
