import Dexie, { Table } from 'dexie'

export interface User {
  id?: number
  name?: string
  avatar?: string
  token?: string
}

export class UserDBDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  user!: Table<User>

  constructor() {
    super('user')
    this.version(1).stores({
      user: '++id, name, avatar, token' // Primary key and indexed props
    })
  }
}

export const userDBDexie = {
  async clearToken() {
    const db = new UserDBDexie()
    try {
      return await db.user.clear()
    } catch (error) {
      console.log('clearToken', error)
    } finally {
      db.close()
    }
  },

  async saveToken(token: string) {
    const db = new UserDBDexie()
    try {
      const data = await db.user.toArray()
      if (data.length === 0) {
        return await db.user.add({
          token: token
        })
      }

      return await db.user.update(
        {
          id: data[data.length - 1]?.id
        },
        {
          token: token
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
      db.close()
    }
  },

  async getToken() {
    const db = new UserDBDexie()
    try {
      const data = await db.user.toArray()

      return data.length > 0 ? data[data.length - 1].token : ''
    } catch (error) {
      console.log('getToken \n', error)
    } finally {
      if (db.isOpen()) {
        db.close()
      }
    }
  }
}
