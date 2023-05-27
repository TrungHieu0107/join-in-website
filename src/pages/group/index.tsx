import * as React from 'react'
import { Task } from 'src/models/class'

const dataJson = {
  status: 200,
  data: [
    {
      id: '713d0bac-dffb-ed11-9eff-c809a8bfd17e',
      name: 'Main task 1',
      startDateDeadline: 'May 26, 2023 | 04:07 PM',
      endDateDeadline: 'June 10, 2023 | 04:07 PM',
      impotantLevel: 'MEDIUM',
      estimatedDays: 0,
      status: 'NOT_STARTED_YET'
    },
    {
      id: 'dc8a6ad6-dffb-ed11-9eff-c809a8bfd17e',
      name: 'Main task 3',
      startDateDeadline: 'May 26, 2023 | 04:07 PM',
      endDateDeadline: 'June 10, 2023 | 04:07 PM',
      impotantLevel: 'VERY_HIGH',
      estimatedDays: 4,
      status: 'NOT_STARTED_YET'
    },
    {
      id: 'a9efbdca-dffb-ed11-9eff-c809a8bfd17e',
      name: 'Main task 2',
      startDateDeadline: 'May 26, 2023 | 04:07 PM',
      endDateDeadline: 'June 10, 2023 | 04:07 PM',
      impotantLevel: 'VERY_HIGH',
      estimatedDays: 1,
      status: 'NOT_STARTED_YET'
    }
  ],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    total: 3
  },
  message: 'Filter task list success.'
}

export default function App() {
  React.useEffect(() => {
    const data: Task[] = JSON.parse(JSON.stringify(dataJson))['data'] as Task[]
    data.map(e => {
      const value = new Task(e)
      console.log(value.id)
    })
  }, [])
  
  return <div>Test</div>
}
