// ** React Imports
import { useState, ChangeEvent, ReactNode } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Box, Button, IconButton, InputAdornment, Menu, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material'
import { DotsHorizontal, Magnify } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import RecruitmentForm from 'src/views/group/application/RecruitmentForm'
import { StatusObj } from 'src/constants/task-status'

interface Column {
  id: 'name' | 'position' | 'createddate' | 'description' | 'status' | 'confirmeddate'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string | ReactNode
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'position', label: 'Position', minWidth: 100 },
  {
    id: 'createddate',
    label: 'Created Date',
    minWidth: 100
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    format: (value: any) => (
      <Chip
        label={value}
        color={statusObj[value].color}
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
    id: 'confirmeddate',
    label: 'Confirmed Date',
    minWidth: 100
  }
]

const statusObj: StatusObj = {
  ACCEPTED: { color: 'success' },
  REJECTED: { color: 'error' },
  WAITING: { color: 'warning'}
}

const rows = [
  { id: '1', name: 'Xuan Kien', position: 'Information Technology', createddate:'29-5-2023', description: 'hello', status: 'ACCEPTED', confirmeddate: '29-5-2023' },
  { id: '2', name: 'Quoc Bao', position: 'Information Technology', createddate:'29-5-2023', description: 'hello', status: 'WAITING', confirmeddate: '' },
  { id: '3', name: 'Trung Hieu', position: 'Information Technology', createddate:'29-5-2023', description: 'hello', status: 'REJECTED', confirmeddate: '29-5-2023' },

]

const Application = () =>{
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const router = useRouter()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    router.push('/group/task')
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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          ml: 4,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: '15px'
        }}
      >
        <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
        <Button size='small' variant='contained' sx={{marginRight: '20px'}} onClick={handleClickOpen}>
          Recruitment
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Recruitment</DialogTitle>
        <DialogContent>
          <RecruitmentForm/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </Box>

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
                        {column.format && typeof value === 'string' ? column.format(value) : value}
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

export default Application
