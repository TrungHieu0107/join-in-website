// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { InputAdornment, TextField } from '@mui/material'
import { Magnify } from 'mdi-material-ui'

interface Column {
  id: 'name' | 'code' | 'member' | 'leader'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'member',
    label: 'Member',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'leader',
    label: 'Leader',
    minWidth: 170,
  }
]

interface Data {
  id: string
  name: string
  code: string
  member: string
  leader: string
}

function createData(id: string,name: string, code: string, member: string, leader: string): Data {

  return {id, name, code, member, leader }
}

const rows = [
  createData('1','JoinIn Group', 'EXE201', '4/5', 'Thanh Huy'),
  createData('2','JoinIn Group', 'EXE201', '4/5', 'Thanh Huy'),
  createData('3','JoinIn Group', 'EXE201', '4/5', 'Thanh Huy'),
  createData('4','JoinIn Group', 'EXE201', '4/5', 'Thanh Huy'),
  createData('5','JoinIn Group', 'EXE201', '4/5', 'Thanh Huy'),
  createData('6','JoinIn Group', 'EXE201', '4/5', 'Thanh Huy'),
  createData('7','JoinIn Group', 'EXE201', '4/5', 'Thanh Huy'),

]

const TabGroup = () => {
  // ** States
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
      <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, padding: '15px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
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

export default TabGroup

