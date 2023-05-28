import { ChangeEvent, Fragment, useState } from 'react'
import { Column } from 'src/models/common/Column'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Task } from 'src/models'
import { useRouter } from 'next/router'
import { Menu, MenuItem, Button, IconButton } from '@mui/material'
import { Delete, InformationVariant, DotsVertical } from 'mdi-material-ui'

export interface ITableTaskCollapseProps {
  column: Column[]
  row: any[]
}

function Row(props: {
  row: any
  page: number
  rowsPerPage: number
  index: number
  column: Column[]
  clicktoDetail: any
}) {
  const { row, page, rowsPerPage, index, column, clicktoDetail } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<Task>()

  const handleOptionsClose = () => {
    setAnchorEl(null)
    setSelectedRow({})
  }

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, row: Task) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(row)
    console.log(selectedRow)
  }

  const handleViewDetail = () => {
    if (selectedRow?.Id) {
      clicktoDetail(selectedRow?.Id)
    }
  }

  const handleDelete = () => {
    console.log('Delete ', selectedRow)
  }

  return (
    <Fragment>
      <TableRow aria-label='expand row' >
        <TableCell align='center'>{page * rowsPerPage + index + 1}</TableCell>
        {column.map(column => {
          const value = row[column.id]

          return (
            <TableCell key={column.id} align={column.align}>
              {column.format ? column.format(value) : value}
            </TableCell>
          )
        })}
        <TableCell align='right' sx={{ width: 20, paddingLeft: 0 }}>
          <IconButton
            onClick={event => handleOptionsClick(event , row)}
            sx={{ padding: 0 } }
          >
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
  const [values] = useState<ITableTaskCollapseProps>(props)
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const router = useRouter()

  const handleClickToTaskDetail = (id: number) => {
    if (router.pathname != '/group/task') return

    router.push(`/group/task/${id}`)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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
            {values.row?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <Row
                  key={index}
                  row={row}
                  page={page}
                  rowsPerPage={rowsPerPage}
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
        count={values.row?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
