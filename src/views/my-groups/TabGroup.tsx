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
import { Alert, IconButton, InputAdornment, Menu, MenuItem, TextField } from '@mui/material'
import { DotsHorizontal, Magnify } from 'mdi-material-ui'
import { GroupRenderType } from 'src/constants'
import { GroupRenderProps } from 'src/type/types'

interface Column {
  id: 'name' | 'subject' | 'member' | 'leader'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'subject', label: 'Subject', minWidth: 100 },
  {
    id: 'member',
    label: 'Member',
    minWidth: 100
  },
  {
    id: 'leader',
    label: 'Leader',
    minWidth: 200
  }
]

const rows = [
  { id: '1', name: 'JoinIn Group', subject: 'EXE201', member: '4/5', leader: 'Thanh Huy' },
  { id: '2', name: 'JoinIn Group', subject: 'EXE201', member: '4/5', leader: 'Thanh Huy' },
  { id: '3', name: 'JoinIn Group', subject: 'EXE201', member: '4/5', leader: 'Thanh Huy' },
  { id: '4', name: 'JoinIn Group', subject: 'EXE201', member: '4/5', leader: 'Thanh Huy' },
  { id: '5', name: 'JoinIn Group', subject: 'EXE201', member: '4/5', leader: 'Thanh Huy' },
  { id: '6', name: 'JoinIn Group', subject: 'EXE201', member: '4/5', leader: 'Thanh Huy' },
  { id: '7', name: 'JoinIn Group', subject: 'EXE201', member: '4/5', leader: 'Thanh Huy' }
]

const TabGroup = ({ renderType }: GroupRenderProps) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<any>(null)

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(row)
    console.log(selectedRow)
  }

  const handleOptionsClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

  const handleDelete = () => {
    // Handle delete action
    handleOptionsClose()
  }

  const handleViewDetail = () => {
    // Handle view detail action
    handleOptionsClose()
  }

  const handleChangeStatus = () => {
    // Handle change status action
    handleOptionsClose()
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  let result: React.ReactNode

  // Load API
  switch (renderType) {
    case GroupRenderType.All:
      result = 'All'
      break
    case GroupRenderType.Owner:
      result = 'Owner'
      break
    case GroupRenderType.Member:
      result = 'Member'
      break
    default:
      // get all
      return null
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Alert severity='success' color='info'>
        {result} — demo tab! (views/my-groups/TabGroup.tsx/line102)
      </Alert>
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
              <TableCell align='center' sx={{ minWidth: '20px' }}>
                Index
              </TableCell>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align='right'>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  <TableCell align='center' sx={{ minWidth: '20px' }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                        {value}
                      </TableCell>
                    )
                  })}
                  <TableCell align='right'>
                    <IconButton onClick={event => handleOptionsClick(event, row)}>
                      <DotsHorizontal />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
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
          <MenuItem onClick={handleViewDetail}>View Detail</MenuItem>
          <MenuItem onClick={handleChangeStatus}>Change Status</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
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
