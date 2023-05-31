import moment from 'moment'
import { Transaction, User } from 'src/models/class'

export const transactionAPI = {
  Admin: {
    getListTraction(): Transaction[] {
      const result: Transaction[] = []
      for (let index = 0; index < 80; index++) {
        result.push(
          new Transaction({
            id: index,
            status: 'SUCCESS',
            type: `Type ${index}`,
            transactionDate: moment().format('YYYY-MM-DD'),
            user: new User({
              id: index,
              fullName: `Name ${index}`,
              avatar: '',
              birthDay: moment().format('YYYY-MM-DD'),
              email: `email${index}@gmail.com`
            })
          })
        )
      }

      return result
    }
  }
}
