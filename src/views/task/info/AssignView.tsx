import { useEffect, useState } from 'react'
import { AssignedTask, Member, Task, User } from 'src/models/class'
import { Autocomplete, Avatar, Chip, TextField } from '@mui/material'

export interface IAssignViewProps {
  data: Task
  editable: boolean
  onInputChange : (value: Task) => void
}

export default function AssignView(props: IAssignViewProps) {
  const [value, setValue] = useState<Task>(props.data)
  const [editable, setEditable] = useState(props.editable)
  const onInputChange = props.onInputChange
  const fixedOptions = [top100Films[6]]

  useEffect(() => {
    setEditable(props.editable)
    setValue(props.data)
  })

  return (
    <div>
      <Autocomplete
        disabled={!editable}
        multiple
        value={value.assignedTasks}
        onChange={(event, newValue) => {
          if (!editable) {
            return
          }
          const newTask = new Task(value !== undefined ? value : {})
          newTask.assignedTasks = newValue

          setValue(newTask)
          onInputChange(newTask)
        }}
        options={top100Films.filter(item => value.assignedTasks?.indexOf(item) === -1)}
        getOptionLabel={option =>
          option.assignedFor?.user?.fullName ? option.assignedFor?.user?.fullName : 'Không tên'
        }
        renderTags={(tagValue) =>
          tagValue.map((option, index) => (
            <Chip
              key={index}
              avatar={<Avatar alt='Natacha' src={option.assignedFor?.user?.avatar} sizes='medium'/>}
              label={option.assignedFor?.user?.fullName}

              // {...getTagProps({ index })}
              disabled={fixedOptions.indexOf(option) !== -1}
              variant='outlined'
              sx={{
                m: 1
              }}
            />
          ))
        }
        style={{ width: 'auto' }}
        renderInput={params => <TextField {...params} placeholder='Assignee' disabled={!editable} size='medium' />}
      />
    </div>
  )
}

const top100Films = [
  new AssignedTask({
    assignedFor: new Member({
      user: new User({
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
        fullName: 'Hieuasdas 2'
      })
    })
  }),
  new AssignedTask({
    assignedFor: new Member({
      user: new User({
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
        fullName: 'Hieu 23123'
      })
    })
  }),
  new AssignedTask({
    assignedFor: new Member({
      user: new User({
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
        fullName: 'Hieu 12'
      })
    })
  }),
  new AssignedTask({
    assignedFor: new Member({
      user: new User({
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
        fullName: 'Hieu 10'
      })
    })
  }),
  new AssignedTask({
    assignedFor: new Member({
      user: new User({
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
        fullName: 'Hieu 4'
      })
    })
  })
]
