import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Column } from 'src/models/common/Column'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Task } from 'src/models/class'
import { useRouter } from 'next/router'
import { Menu, MenuItem, Button, IconButton } from '@mui/material'
import { Delete, InformationVariant, DotsVertical } from 'mdi-material-ui'
import { taskAPI } from 'src/api-client'
import { useToasts } from 'react-toast-notifications'
import { AxiosError } from 'axios'
import { QueryTaskListsModel } from 'src/models/query-models/QueryTaskListsModel'

export interface ITableTaskCollapseProps {
  column: Column[]
  row: Task[] | undefined
  onSuccess?: () => Promise<void>
  query?: QueryTaskListsModel
  setQuery?: (value: QueryTaskListsModel) => void
}
function Row(props: {
  row: Task
  page: number
  rowsPerPage: number
  index: number
  column: Column[]
  clicktoDetail: any
}) {
  const { row, page, rowsPerPage, index, column, clicktoDetail } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<Task>()
  const data: any = row
  const addToast = useToasts()

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    addToast.addToast(message, { appearance: type })
  }
  const router = useRouter()

  const handleOptionsClose = () => {
    setAnchorEl(null)
    setSelectedRow(undefined)
  }

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, row: Task) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleViewDetail = () => {
    console.log(selectedRow)

    if (selectedRow?.id) {
      clicktoDetail(selectedRow?.id)
    }
  }

  const handleDelete = async () => {
    console.log('Delete ', selectedRow)
    selectedRow?.id &&
      (await taskAPI
        .delete(selectedRow?.id)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          handleError(error)
        }))
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

  return (
    <Fragment>
      <TableRow aria-label='expand row'>
        <TableCell align='center'>{(page - 1) * rowsPerPage + index + 1}</TableCell>
        {column.map(column => {
          const value = data[column.id]

          return (
            <TableCell key={column.id} align={column.align}>
              {column.format ? column.format(new Task(data)) : value}
            </TableCell>
          )
        })}
        <TableCell align='right' sx={{ width: 20, paddingLeft: 0 }}>
          <IconButton onClick={event => handleOptionsClick(event, row)} sx={{ padding: 0 }}>
            <DotsVertical />
          </IconButton>
        </TableCell>
      </TableRow>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuItem onClick={handleViewDetail}>
          <Button startIcon={<InformationVariant />} size='small'>
            Detail
          </Button>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Button startIcon={<Delete />} size='small'>
            Delete
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default function TableTaskCollapse(props: ITableTaskCollapseProps) {
  const [values, setValues] = useState<ITableTaskCollapseProps>(props)
  const [page, setPage] = useState<number>(0)
  const [queryTask, setQueryTask] = useState<QueryTaskListsModel>(new QueryTaskListsModel())
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  useEffect(() => {
    setValues(props)
    props.query && setQueryTask(props.query)
  }, [props])

  const router = useRouter()

  const handleClickToTaskDetail = (id: number) => {
    if (router.pathname != '/group/task') return

    console.log('detail')

    router.push(`/group/task/${id}`)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    const newQuery = new QueryTaskListsModel(queryTask)
    newQuery.page = newPage + 1
    props.setQuery && props.setQuery(newQuery)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = new QueryTaskListsModel(queryTask)
    newQuery.pageSize = +event.target.value
    newQuery.page = 1
    props.setQuery && props.setQuery(newQuery)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ minWidth: '30px' }}>
                Index
              </TableCell>
              {values.column?.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align='center' sx={{ width: '10px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.row?.map((row, index) => {
              return (
                <Row
                  key={index}
                  row={row}
                  page={queryTask.page}
                  rowsPerPage={queryTask.pageSize}
                  index={index}
                  column={values.column}
                  clicktoDetail={handleClickToTaskDetail}
                ></Row>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={queryTask.total ?? 0}
        rowsPerPage={queryTask.pageSize}
        page={queryTask.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
