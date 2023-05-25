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

export interface ITableTaskCollapseProps {
  column: Column[]
  row: Task[]
}

function Row(props: { row: any; page: number; rowsPerPage: number; index: number; column: Column[] }) {
  const { row, page, rowsPerPage, index, column } = props
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow aria-label='expand row' onClick={() => setOpen(!open)}>
        <TableCell align='center'>{page * rowsPerPage + index + 1}</TableCell>
        {column.map(column => {
          const value = row[column.id]

          return (
            <TableCell key={column.id} align={column.align}>
              {column.format ? column.format(value) : value}
            </TableCell>
          )
        })}
      </TableRow>
    </Fragment>
  )
}

export default function TableTaskCollapse(props: ITableTaskCollapseProps) {
  const [values] = useState<ITableTaskCollapseProps>(props)
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
      <TableContainer sx={{ maxHeight: 500 }}>
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
