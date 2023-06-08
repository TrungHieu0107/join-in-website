import Chip from '@mui/material/Chip'
import { Task } from 'src/models/class'
import { Column } from 'src/models/common/Column'
import TableTaskCollapse from 'src/views/task/table/TableTaskCollapse'
import Grid from '@mui/material/Grid'
import {
  Avatar,
  AvatarGroup,
  Button,
  TextField,
  Tooltip,
  Card,
  CardContent,
  Typography,
  Modal,
  Fade,
  Box
} from '@mui/material'
import { ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Magnify, Plus, Send } from 'mdi-material-ui'
import InputAdornment from '@mui/material/InputAdornment'
import { statusObj } from 'src/constants/task-status'
import MainTaskView from 'src/views/task/info/MainTaskView'

// import TaskCommentView from 'src/views/task/info/TaskCommentView'
// import Editor from 'src/views/dialog/editor'
import { taskAPI } from 'src/api-client/task'
import { useRouter } from 'next/router'
import { GroupDBType, groupDBDexie } from 'src/models/db/GroupDB'
import UserGroupLayout from 'src/layouts/UserGroupLayout'
import { CommonResponse } from 'src/models/common/CommonResponse'
import Link from 'next/link'
import DialogCreateNewTask from 'src/views/dialog/DialogAddNewTask'
import { AxiosError } from 'axios'
import { useToasts } from 'react-toast-notifications'
import { QueryTaskListsModel } from 'src/models/query-models/QueryTaskListsModel'
import TaskCommentView from 'src/views/task/info/TaskCommentView'
import Editor from 'src/views/dialog/editor'

export interface ISubTaskPageProps {
  id: string
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const column: Column[] = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    align: 'left',
    format: (value: Task) => (
      <Link href={`/group/task/${value.id}`} rel='noopener' color='info'>
        <a className='link-style'>{value.name}</a>
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
  const [data, setData] = useState<Task>()
  const [queryTask, setQueryTask] = useState<QueryTaskListsModel>(new QueryTaskListsModel())
  const [addNewModal, setAddNewModal] = useState<boolean>(false)
  const [groupId, setGroupId] = useState<string>('')
  const addToast = useToasts()

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    addToast.addToast(message, { appearance: type })
  }

  useEffect(() => {
    if (typeof id === 'string') {
      fetchDataTask()
      fetchdataGroup()
    }
  }, [id])

  const fetchdataGroup = async () => {
    await groupDBDexie
      .getGroup()
      .then(async res => {
        const id = (res as GroupDBType).id
        if (id) {
          setGroupId(id)
        }
      })
      .catch(error => {
        handleError(error)
      })
  }

  const fetchDataTask = async () => {
    typeof id === 'string' &&
      taskAPI.getById(id).then(res => {
        const commonResponse = new CommonResponse(res)
        console.log(commonResponse)
        console.log(queryTask)

        const newData = new Task(commonResponse.data)

        setData(newData)
      })
  }

  const handleError = (error: any) => {
    const dataErr = (error as AxiosError)?.response
    if (dataErr?.status === 401) {
      notify('Login expired.', 'error')
      router.push('/user/login')
    } else if (dataErr?.status === 500) {
      if (error?.response?.data?.message) notify(error?.response?.data?.message, 'error')
      else notify('Something error', 'error')
    } else {
      console.log(error)
    }
  }

  // const updateGroup = async (newData: Task) => {
  //   await groupDBDexie.saveGroup({
  //     avatar: newData.group?.avatar ?? '',
  //     name: newData.group?.name,
  //     id: newData.group?.id
  //   })
  //   // .update(1)
  //   // .then(async function (updated) {
  //   //   if (updated) console.log('Friend number 2 was renamed to Number 2')
  //   //   else {
  //   //     console.log('Nothing was updated - there were no friend with primary key: 2')
  //   //     await groupDBDexie.groups.add({
  //   //       avatar: newData.group?.avatar ?? '',
  //   //       name: newData.group?.name ?? ''
  //   //     })
  //   //   }
  //   // })

  //   // console.log('group 123', await groupDBDexie.groups.get({ id: 1 }))
  // }

  const handleClose = () => {
    setAddNewModal(false)
  }

  return data ? (
    <div>
      <MainTaskView
        data={data !== undefined ? data : new Task()}
        handleError={handleError}
        notify={notify}
        onSuccess={fetchDataTask}
      ></MainTaskView>
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
                  onClick={() => setAddNewModal(true)}
                >
                  Add new
                </Button>
              </Grid>
            </Grid>
            <TableTaskCollapse column={column} row={data?.subTasks} setQuery={setQueryTask}></TableTaskCollapse>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
      <Card sx={{ marginTop: '5px' }}>
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
      </Card>
      <Modal
        open={addNewModal}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-descripti'
      >
        <Fade in={addNewModal}>
          <Box sx={style} className='modal-size'>
            <DialogCreateNewTask close={handleClose} groupId={groupId} mainTask={data} onSuccess={fetchDataTask} />
          </Box>
        </Fade>
      </Modal>
    </div>
  ) : (
    <div></div>
  )
}

SubTaskPage.getLayout = (page: ReactNode) => <UserGroupLayout>{page}</UserGroupLayout>
