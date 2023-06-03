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
  const [listMember, setListMember] = useState<Member[]>()

  useEffect(() => {
    setEditable(props.editable)
    setValue(props.data)
  })

  return (
    <div>
      <Autocomplete
        disabled={!editable}
        multiple
        value={value.assignedFor}
        onChange={(event, newValue) => {
          if (!editable) {
            return
          }
          const newTask = new Task(value !== undefined ? value : {})
          newTask.assignedFor = newValue

          setValue(newTask)
          onInputChange(newTask)
        }}
        options={top100Films.filter(item => value.assignedFor?.indexOf(item) === -1)}
        getOptionLabel={option =>
          option?.fullName ? option?.fullName : 'Không tên'
        }
        renderTags={tagValue =>
          tagValue.map((option, index) => (
            <Chip
              key={index}
              avatar={<Avatar alt='Natacha' src={option?.avatar} sizes='medium' />}
              label={option?.fullName}
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
  new User({
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
    fullName: 'Hieuasdas 2'
  }),
  new User({
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
    fullName: 'Hieuasdas 2'
  }),
  new User({
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
    fullName: 'Hieuasdas 2'
  }),
  new User({
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
    fullName: 'Hieuasdas 2'
  }),
  new User({
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
    fullName: 'Hieuasdas 2'
  }),
  new User({
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
    fullName: 'Hieuasdas 2'
  }),
  new User({
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
    fullName: 'Hieuasdas 2'
  }),
  new User({
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJRMq60qKNIeGgwgDrJtMxH4v7j4vKykszQ&usqp=CAU',
    fullName: 'Hieuasdas 2'
  })
]
