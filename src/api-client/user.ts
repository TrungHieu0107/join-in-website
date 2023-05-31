import { Major, User, UserMajor } from 'src/models/class'

export const UserAPI = {
  Admin: {
    getListUser(): User[] {
      const result = []
      for (let index = 0; index < 100; index++) {
        result.push(
          new User({
            id: index,
            fullName: `Nguyễn ${index}`,
            email: `Nguyen${index}@gmail.com`,
            avatar: '',
            gender: true,
            phone: '0123456789',
            birthDay: new Date(),
            description: 'Tôi là superman',
            skill: 'Tôi có thể bay',
            otherContact: 'Tôi có thể đập phá mọi thứ',
            status: 'ACTIVE',
            isAdmin: false,
            userMajors: [
              new UserMajor({
                major: new Major({
                  name: 'Bay vòng quanh trái đất'
                } as Major)
              } as UserMajor)
            ] as UserMajor[]
          } as User)
        )
      }

      return result
    }
  }
}
