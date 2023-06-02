import moment from 'moment'
import { Group, Milestone } from 'src/models/class'
import axiosClient from './api-client'

const URL = '/groups';

export const groupAPI = {
  getList() {
    return axiosClient.get(`${URL}`)
  },

  getById(id:string) {
    return axiosClient.get(`${URL}/${id}`)
  },

  post(data: Group) {
    return axiosClient.post(`${URL}`,data)
  },

  delete(id:string) {
    return axiosClient.delete(`${URL}/${id}`)
  },

  put(data: Group) {
    return axiosClient.put(`${URL}`,data)
  },


  Admin: {
    getListGroup(): Group[] {
      const result = []
      for (let index = 0; index < 80; index++) {
        result.push(
          new Group({
            id: index,
            name: `Group ${index}`,
            createdDate: moment().format('YYYY-MM-DD'),
            groupSize: (index % 21) - 1 < 1 ? 2 : index % 21,
            memberCount: (index % 21) - 1 < 1 ? 1 : (index % 21) - 1,
            schoolName: `School ${index}`,
            className: `Class ${index}`,
            subjectName: `Subject ${index}`,
            description: `Đào tạo siêu nhân ${index}`,
            skill: `Bay trên trời`,
            status: 'ACTIVE',
            currentMilestoneId: index,
            currentMilestone: new Milestone({
              id: index,
              groupId: index,
              description: 'Học bay cao 2000m',
              name: 'Học bay'
            }),
            milestones: [
              new Milestone({
                id: index,
                groupId: index,
                description: 'Học bay cao 2000m',
                name: 'Học bay'
              }),
              new Milestone({
                id: index + 1,
                groupId: index,
                description: 'Học bay cao 4000m',
                name: 'Học bay cao'
              }),
              new Milestone({
                id: index + 2,
                groupId: index,
                description: 'Bay ra ngoài vũ trụ xuyên qua hố đen vũ trụ',
                name: 'Bay trong không gian'
              }),
              new Milestone({
                id: index + 2,
                groupId: index,
                description: 'Bay xuyên thời gian trở về quá khứ và tương lai',
                name: 'Bay trong thời gian'
              })
            ]
          })
        )
      }

      return result
    }
  }
}
