import Dexie, { Table } from 'dexie'

export interface GroupDBType {
  id?: string
  name?: string
  avatar?: string
  createdBy?: string
  groupSize?: number
  memberCount?: number
  schoolName?: string
  className?: string
  subject?: string
  theme?: string
}

export class GroupDBDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  group!: Table<GroupDBType>

  constructor() {
    super('group')
    this.version(1).stores({
      group: '++id, name, avatar,createdBy,groupSize,memberCount, schoolName,className, subject, theme' // Primary key and indexed props
    })
  }


}

export const groupDBDexie ={
  async clearGroup() {
    const db = new GroupDBDexie()
    try {
      return await db.group.clear()
    } catch (error) {
      console.log('clear Group', error)
    } finally {
      db.close()
    }
  },

  async saveGroup(group: any) {
    const db = new GroupDBDexie()
    try {
      const data = await db.group.toArray()
      if (data.length !== 0) {
        await db.group.clear()
      }

      return  await db.group.add(group)
    } catch (error) {
      console.log(error)
    } finally {
      db.close()
    }
  },

  async getGroup() {
    const db = new GroupDBDexie()
    try {
      const data = await db.group.toArray()

      return data.length > 0 ? data[data.length - 1] : null
    } catch (error) {
      console.log(error)
    } finally {
      if (db.isOpen()) {
        db.close()
      }
    }
  }
}
