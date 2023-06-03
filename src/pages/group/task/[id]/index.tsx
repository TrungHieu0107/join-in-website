import Chip from '@mui/material/Chip'
import { Task } from 'src/models/class'
import { Column } from 'src/models/common/Column'
import TableTaskCollapse from 'src/views/task/table/TableTaskCollapse'
import Grid from '@mui/material/Grid'
import { Avatar, AvatarGroup, Button, TextField, Tooltip, Card, CardContent, Typography } from '@mui/material'
import { ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Magnify, Plus, Send } from 'mdi-material-ui'
import InputAdornment from '@mui/material/InputAdornment'
import { statusObj } from 'src/constants/task-status'
import MainTaskView from 'src/views/task/info/MainTaskView'

// import TaskCommentView from 'src/views/task/info/TaskCommentView'
// import Editor from 'src/views/dialog/editor'
import { taskAPI } from 'src/api-client/task'
import { useRouter } from 'next/router'
import { groupDBDexie } from 'src/models/db/GroupDB'
import UserGroupLayout from 'src/layouts/UserGroupLayout'
import { CommonResponse } from 'src/models/common/CommonResponse'
import Link from 'next/link'


export interface ISubTaskPageProps {
  id: string
}

const column: Column[] = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    align: 'left',
    format: (value: Task) => (
      <Link href={`/group/task/${value.id}`}>
        {value.name}
      </Link>
    )
  },
  {
    id: 'assignedFor',
    label: 'Assignee',
    minWidth: 100,
    align: 'left',
    format: (value: Task) => (
      <AvatarGroup total={value?.assignedFor?.length}>
        {value?.assignedFor?.map((val, index) =>
          index < 2 ? (
            <Tooltip key={index} title={val?.fullName ?? ''} placement='bottom'>
              <Avatar alt='Test' src={val?.avatar} sizes='small' />
            </Tooltip>
          ) : (
            ''
          )
        )}
      </AvatarGroup>
    )
  },
  {
    id: 'startDateDeadline',
    label: 'Start',
    minWidth: 100,
    align: 'left'

    // format: (value: any) => new Date(value).toLocaleDateString()
  },
  {
    id: 'endDateDeadline',
    label: 'End',
    minWidth: 100,
    align: 'left'

    // format: (value: any) => new Date(value).toLocaleDateString()
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'left',
    format: (value: Task) => (
      <Chip
        label={statusObj[value?.status ?? '']?.label}
        color={statusObj[value?.status ?? '']?.color}
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

export default function SubTaskPage() {
  const router = useRouter()
  const { id } = router.query
  const [searchValue, setSearchValue] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [data, setData] = useState<Task>(taskAPI.User.getTaskById(id))

  useEffect(() => {
    if (typeof id === 'string') {
      taskAPI.getById(id).then(res => {
        const commonResponse = new CommonResponse(res)
        
        const newData = new Task(commonResponse.data)

        console.log(newData);
        
        setData(newData)
        updateGroup(newData)
      })
    }
  }, [id])

  const updateGroup = async (newData: Task) => {
    await groupDBDexie.groups
      .update(1, {
        avatar: newData.group?.avatar,
        name: newData.group?.name
      })
      .then(async function (updated) {
        if (updated) console.log('Friend number 2 was renamed to Number 2')
        else {
          console.log('Nothing was updated - there were no friend with primary key: 2')
          await groupDBDexie.groups.add({
            avatar: newData.group?.avatar ?? '',
            name: newData.group?.name ?? ''
          })
        }
      })

    console.log('group 123', await groupDBDexie.groups.get({ id: 1 }))
  }

  return (
    <div>
      <MainTaskView data={data !== undefined ? data : new Task()}></MainTaskView>
      {!data?.mainTaskId ? (
        <Card sx={{ marginTop: '5px' }}>
          <CardContent>
            <Grid container spacing={4} style={{ margin: '5px' }}>
              <Grid container xs={6} sm={8} spacing={2}>
                <Grid item xs={6} md={5}>
                  <TextField
                    fullWidth
                    id='outlined-controlled'
                    label='Seach'
                    value={searchValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchValue(event.target.value)
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Magnify />
                        </InputAdornment>
                      )
                    }}
                    size='small'
                    placeholder='Search'
                  />
                </Grid>
                {/* <Grid item xs={6} md={4}>
                  <AvatarGroup total={24}>
                    <Avatar alt='Remy Sharp' src='/images/avatars/7.png' sizes='small' />
                    <Avatar
                      alt='Remy Sharp'
                      src=''
                      sizes='small'
                    />
                    <Avatar alt='Remy Sharp' src='/images/avatars/7.png' sizes='small' />
                    <Avatar
                      alt='Remy Sharp'
                      src=''
                      sizes='small'
                    />
                    <Avatar alt='Remy Sharp' src='/images/avatars/7.png' sizes='small' />
                  </AvatarGroup>
                </Grid> */}
              </Grid>
              <Grid container xs={6} md={4} justifyContent={'flex-end'}>
                <Button
                  color='primary'
                  variant='outlined'
                  startIcon={<Plus />}
                  style={{ marginRight: '15px', height: '32px' }}
                  size='small'
                >
                  Add new
                </Button>
              </Grid>
            </Grid>
            <TableTaskCollapse column={column} row={data?.subTasks}></TableTaskCollapse>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
      {/* <Card sx={{ marginTop: '5px' }}>
        <CardContent>
          <Grid item xs={12} sm={12}>
            <Typography mt={3} mb={3} fontWeight={500}>
              Comment
            </Typography>
            <Grid>
              <TaskCommentView data={data?.comments !== undefined ? data?.comments : []} />
            </Grid>
            <div>
              <Editor
                value={comment}
                name='description'
                onChange={(dataChange: SetStateAction<string>) => {
                  setComment(dataChange.toString())
                }}
              />
            </div>
            <Grid item container justifyContent={'center'}>
              <Grid mt={3}>
                <Button size='small' variant='outlined' endIcon={<Send />}>
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
    </div>
  )
}

SubTaskPage.getLayout = (page: ReactNode) => <UserGroupLayout>{page}</UserGroupLayout>
