import Chip from '@mui/material/Chip'
import { Task } from 'src/models'
import { Column } from 'src/models/common/Column'
import { ThemeColor } from 'src/@core/layouts/types'
import TableTaskCollapse from 'src/views/tables/TableTaskCollapse'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const taskList = [
  {
    Id: 1,
    Name: 'Task',
    StartDateDeadline: new Date('2023-01-01'),
    EndDateDeadline: new Date('2023-02-02'),
    Status: 'FINISHED',
    SubTasks: [
      {
        Id: 1,
        Name: 'SubTasks',
        StartDateDeadline: new Date('2023-01-01'),
        EndDateDeadline: new Date('2023-02-02'),
        Status: 'FINISHED'
      },
      {
        Id: 1,
        Name: 'SubTasks',
        StartDateDeadline: new Date('2023-01-01'),
        EndDateDeadline: new Date('2023-02-02'),
        Status: 'FINISHED'
      }
    ]
  },
  {
    Id: 1,
    Name: 'Task',
    StartDateDeadline: new Date('2023-01-01'),
    EndDateDeadline: new Date('2023-02-02'),
    Status: 'FINISHED'
  },
  {
    Id: 1,
    Name: 'Task',
    StartDateDeadline: new Date('2023-01-01'),
    EndDateDeadline: new Date('2023-02-02'),
    Status: 'FINISHED'
  },
  {
    Id: 1,
    Name: 'Task',
    StartDateDeadline: new Date('2023-01-01'),
    EndDateDeadline: new Date('2023-02-02'),
    Status: 'FINISHED'
  },
  {
    Id: 1,
    Name: 'Task',
    StartDateDeadline: new Date('2023-01-01'),
    EndDateDeadline: new Date('2023-02-02'),
    Status: 'NOT_STARTED_YET'
  }
] as Task[]

const column: Column[] = [
  {
    id: 'Name',
    label: 'Name',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'StartDateDeadline',
    label: 'StartDateDeadline',
    minWidth: 100,
    align: 'left',
    format: (value: any) => new Date(value).toLocaleDateString()
  },
  {
    id: 'EndDateDeadline',
    label: 'EndDateDeadline',
    minWidth: 100,
    align: 'left',
    format: (value: any) => new Date(value).toLocaleDateString()
  },
  {
    id: 'Status',
    label: 'Status',
    minWidth: 100,
    align: 'left',
    format: (value: any) => (
      <Chip
        label={value}
        color={statusObj[value].color}
        sx={{
          height: 24,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          '& .MuiChip-label': { fontWeight: 500 }
        }}
      />
    )
  }
]

const statusObj: StatusObj = {
  NOT_STARTED_YET: { color: 'info' },
  WORKING1: { color: 'error' },
  WORKING: { color: 'primary' },
  resigned: { color: 'warning' },
  FINISHED: { color: 'success' }
}

export default function TaskListPage() {
  return (
    <div>
      <TableTaskCollapse column={column} row={taskList}></TableTaskCollapse>
    </div>
  )
}
