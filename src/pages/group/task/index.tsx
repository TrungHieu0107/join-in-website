import Chip from '@mui/material/Chip'
import { AssignedTask, Member, Task, User } from 'src/models/class'
import { Column } from 'src/models/common/Column'
import TableTaskCollapse from 'src/views/task/table/TableTaskCollapse'
import Grid from '@mui/material/Grid'
import { Card, Avatar, AvatarGroup, Button, TextField, Fade, Box, CardContent, CardHeader } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { Key, Magnify, NewspaperVariantMultiple, Plus, SearchWeb } from 'mdi-material-ui'
import InputAdornment from '@mui/material/InputAdornment'
import { statusObj } from 'src/constants/task-status'
import { importantLevel } from 'src/constants/important-level'
import Tooltip from '@mui/material/Tooltip'
import Modal from '@mui/material/Modal'
import DialogCreateNewTask from 'src/views/dialog/DialogAddNewTask'

import 'react-datepicker/dist/react-datepicker.css'
import CustomizedSteppers from 'src/layouts/components/CustomizedSteppers'
import UserGroupLayout from 'src/layouts/UserGroupLayout'
import { GroupDBType, groupDBDexie } from 'src/models/db/GroupDB'
import { taskAPI } from 'src/api-client'
import { QueryTaskListsModel } from 'src/models/query-models/QueryTaskListsModel'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { AxiosError } from 'axios'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import { StorageKeys } from 'src/constants'

const column: Column[] = [
  {
    id: 'name',
    label: 'Title',
    minWidth: 200,
    align: 'left',
    format: (value: Task) => (
      <Link href={`/group/task/${value.id}`} rel='noopener' color='info'>
        <a className='link-style'>{value.name}</a>
      </Link>
    )
  },
  {
    id: 'estimatedDays',
    label: 'Estimate Days',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'startDateDeadline',
    label: 'Start Date',
    minWidth: 100,
    align: 'center',
    format: (value: Task) => moment(value.startDateDeadline).format(StorageKeys.KEY_FORMAT_DATE)
  },
  {
    id: 'endDateDeadline',
    label: 'End Date',
    minWidth: 100,
    align: 'center',
    format: (value: Task) => moment(value.endDateDeadline).format(StorageKeys.KEY_FORMAT_DATE)
  },
  {
    id: 'impotantLevel',
    label: 'Level',
    minWidth: 100,
    align: 'center',
    format: (value?: Task) =>
      value ? (
        <Chip
          label={importantLevel[value.impotantLevel ?? '']?.label}
          color={importantLevel[value.impotantLevel ?? '']?.color}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      ) : (
        ''
      )
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'center',
    format: (value: Task) => (
      <Chip
        label={statusObj[value.status ?? '']?.label}
        color={statusObj[value.status ?? '']?.color}
        sx={{
          height: 24,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          '& .MuiChip-label': { fontWeight: 500 }
        }}
      />
    )
  },
  {
    id: 'assignedTasks',
    label: 'Assignee',
    minWidth: 100,
    align: 'center',
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
    id: 'createdBy',
    label: 'Created By',
    minWidth: 100,
    align: 'center',
    format: (value: any) => (
      <Tooltip title={value?.fullName} placement='bottom'>
        <Avatar alt='Test' src={value?.avatar} sizes='small' />
      </Tooltip>
    )
  }
]

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

export default function TaskListPage() {
  const [queryTask, setQueryTask] = useState<QueryTaskListsModel>(new QueryTaskListsModel())
  const [addNewModal, setAddNewModal] = useState<boolean>(false)
  const [groupId, setGroupId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [data, setData] = useState<Task[]>([])
  const addToast = useToasts()
  const router = useRouter()

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    addToast.addToast(message, { appearance: type })
  }

  useEffect(() => {
    fetchdata()
  }, [])
  useEffect(() => {
    searchTask()
  }, [queryTask])

  const fetchdata = async () => {
    await groupDBDexie.getGroup().then(res => {
      const id = (res as GroupDBType).id ?? ''
      setGroupId(id)
      console.log(res)
      const newValue = new QueryTaskListsModel(queryTask)
      newValue.groupId = id

      setQueryTask(newValue)
      if (id?.length > 0) {
        getData(
          new QueryTaskListsModel({
            groupId: id
          })
        )
      }
    })
  }

  const getData = async (payload: Partial<QueryTaskListsModel>) => {
    taskAPI
      .getList(new QueryTaskListsModel(payload))
      .then(commonOfTasks => {
        const commonResponse = new CommonResponse(commonOfTasks)
        const newValue = commonResponse.data
        const query = queryTask
        queryTask.page = commonResponse.pagination?.currentPage ?? 1
        queryTask.pageSize = commonResponse.pagination?.pageSize ?? 10
        queryTask.total = commonResponse.pagination?.total ?? 10

        setData(newValue)
      })
      .catch(error => {
        if ((error as AxiosError)?.response?.status === 401) {
          notify('Login expired.', 'error')
          router.push('/user/login')
        } else {
          console.log(error)
        }
      })
  }

  const searchTask = async () => {
    await getData(queryTask)
  }

  const handleClickOpen = () => {
    setAddNewModal(true)
  }

  const handleClose = () => {
    setAddNewModal(false)
  }

  return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={8} container spacing={2}>
            <Grid item xs={6} md={5}>
              <TextField
                fullWidth
                id='outlined-controlled'
                label='Seach'
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value)
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const newQuery = new QueryTaskListsModel(queryTask)
                    newQuery.name = name
                    setQueryTask(newQuery)
                  }
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
            <Grid item xs={6} md={4}>
              <AvatarGroup total={24}>
                <Tooltip title='Add' placement='bottom'>
                  <Avatar alt='Remy Sharp' src='/images/avatars/7.png' sizes='small' />
                </Tooltip>
                <Avatar alt='Remy Sharp' src='' sizes='small' />
                <Avatar alt='Remy Sharp' src='/images/avatars/7.png' sizes='small' />
                <Avatar alt='Remy Sharp' src='' sizes='small' />
                <Avatar alt='Remy Sharp' src='/images/avatars/7.png' sizes='small' />
              </AvatarGroup>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4} container justifyContent={'flex-end'}>
            <Button
              color='primary'
              variant='outlined'
              startIcon={<Plus />}
              size='medium'
              style={{ marginRight: '15px' }}
              onClick={handleClickOpen}
            >
              Add New Task
            </Button>
          </Grid>
        </Grid>
        <TableTaskCollapse column={column} row={data} query={queryTask} setQuery={setQueryTask}></TableTaskCollapse>
        <Modal
          open={addNewModal}
          onClose={handleClose}
          closeAfterTransition
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-descripti'
        >
          <Fade in={addNewModal}>
            <Box sx={style} className='modal-size'>
              <DialogCreateNewTask close={handleClose} groupId={groupId} onSuccess={fetchdata} />
            </Box>
          </Fade>
        </Modal>
        <CustomizedSteppers />
      </div>
  )
}

TaskListPage.getLayout = (page: ReactNode) => <UserGroupLayout>{page}</UserGroupLayout>
