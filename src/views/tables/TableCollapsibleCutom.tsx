// ** React Imports
import { useState, Fragment, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import {
  Box,
  Paper,
  Table,
  Collapse,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  Chip,
  Tooltip,
  Avatar,
  AvatarGroup,
  TablePagination,
  CircularProgress
} from '@mui/material'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { Column } from 'src/models/common/Column'
import { importantLevel } from 'src/constants/important-level'
import { statusObj } from 'src/constants/task-status'
import { Task } from 'src/models/class'
import { taskAPI } from 'src/api-client/task'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { StorageKeys } from 'src/constants'
import moment from 'moment'
import { QueryTaskListsModel } from 'src/models/query-models/QueryTaskListsModel'
import Link from 'next/link'
import { GroupDBType, groupDBDexie } from 'src/models/db/GroupDB'

const Row = (props: { row: Task; column?: Column[]; columnSubTask: Column[] }) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<any>(props.row)
  const [loading, setLoading] = useState(false)
  const header = props.column ?? props.columnSubTask

  const toggleShowSubTask = async () => {
    if (open) {
      setOpen(false)
      const newData = new Task(data)
      newData.subTasks = []
      setData(newData)
    } else {
      setOpen(true)
      setLoading(true)
      await taskAPI.getById(data.id ?? '').then(res => {
        const response = new CommonResponse(res)
        console.log(response)

        const newData = new Task(response.data)
        setData(newData)
        setLoading(false)
      })
    }
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {props.column ? (
          <TableCell>
            {loading ? (
              <IconButton aria-label='expand row' size='small'>
                <CircularProgress color='success' size={24} />
              </IconButton>
            ) : (
              <IconButton aria-label='expand row' size='small' onClick={toggleShowSubTask}>
                {open ? <ChevronUp /> : <ChevronDown />}
              </IconButton>
            )}
          </TableCell>
        ) : (
          ''
        )}
        {header.map((col, index) => {
          const value = data[col.id]

          return (
            <TableCell key={index} align={col.align} sx={{ minWidth: col.minWidth }}>
              {col.format ? col.format(data) : value}
            </TableCell>
          )
        })}
      </TableRow>
      {!loading && data.subTasks ? (
        <TableRow>
          <TableCell colSpan={header.length} sx={{ py: '0 !important' }}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2, mb: 5 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Subtask
                </Typography>
                <Table size='medium' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      {props.columnSubTask?.map(col => (
                        <TableCell key={col.id} align={col.align} sx={{ minWidth: col.minWidth }}>
                          {col.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.subTasks?.map((row: Task) => (
                      <Row key={row.id} row={row} columnSubTask={props.columnSubTask} />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </Fragment>
  )
}

export default function ToDoTableCollapsible() {
  const [rows, setRows] = useState<Task[]>([])
  const router = useRouter()
  const [queryModel] = useState<QueryTaskListsModel>()

  const clickNameTodo = async (value: Task) => {
    await groupDBDexie
      .saveGroup({
        id: value.group?.id,
        name: value.group?.name,
        avatar: value.group?.avatar
      } as GroupDBType)
      .then(() => {
        router.push(`/group/task/${value.id}`)
      })
  }

  const column: Column[] = [
    {
      id: 'name',
      label: 'Title',
      minWidth: 200,
      align: 'left',
      format: (value: Task) => (
        <Link href={'#'} rel='noopener' color='info'>
          <a className='link-style' onClick={() => clickNameTodo(value)}>
            {value.name}
          </a>
        </Link>
      )
    },
    {
      id: 'group',
      label: 'Group',
      minWidth: 100,
      align: 'center',
      format: (value: Task) => (
        <Chip
          avatar={<Avatar alt='Test' src={value?.group?.avatar} sizes='medium' />}
          label={value.group?.name}
          variant='outlined'
          color='success'
        />
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
      minWidth: 150,
      align: 'center',
      format: (value: Task) => moment(value.startDateDeadline).format(StorageKeys.KEY_FORMAT_DATE)
    },
    {
      id: 'endDateDeadline',
      label: 'End Date',
      minWidth: 150,
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
      id: 'assignedFor',
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
      format: (value: Task) => (
        <Tooltip title={value?.createdBy?.fullName ?? ''} placement='bottom'>
          <Avatar alt='Test' src={value?.createdBy?.avatar} sizes='small' />
        </Tooltip>
      )
    }
  ]

  const columnSubTask: Column[] = [
    {
      id: 'name',
      label: 'Title',
      minWidth: 200,
      align: 'left',
      format: (value: Task) => (
        <Link href={`/group/task/${value.id}`}>
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
      minWidth: 150,
      align: 'center'
    },
    {
      id: 'endDateDeadline',
      label: 'End Date',
      minWidth: 150,
      align: 'center'
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
    }
  ]

  useEffect(() => {
    getListTask()
  }, [queryModel])

  const getListTask = async () => {
    try {
      await taskAPI
        .getList()
        .then(res => {
          const data = new CommonResponse(res)
          console.log(data)
          const newTaskList: Task[] = data.data
          setRows(newTaskList)
        })
        .catch(error => {
          if ((error as AxiosError)?.response?.status === 401) {
            router.push('/user/login')
          } else {
            console.log(error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table aria-label='collapsible table' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              {column?.map(col => (
                <TableCell key={col.id} align={col.align} sx={{ minWidth: col.minWidth }}>
                  {col.label}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <Row key={row.id} row={row} column={column} columnSubTask={columnSubTask} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
