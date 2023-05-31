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
import {
  Box,
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material'
import { Close, DotsHorizontal, ExitToApp, InformationVariant, Magnify } from 'mdi-material-ui'
import { GroupRenderType } from 'src/constants'
import { GroupRenderProps } from 'src/type/types'
import { useRouter } from 'next/router'
import GroupForm from './GroupForm'
import AvatarName from 'src/layouts/components/AvatarName'

interface Column {
  id: 'name' | 'subject' | 'class' | 'member' | 'leader'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: number) => string | ReactNode
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 200 },

  { id: 'subject', label: 'Subject', minWidth: 100 },

  {
    id: 'member',
    label: 'Member',
    align: 'center',
    minWidth: 100
  },
  {
    id: 'leader',
    label: 'Leader',
    minWidth: 200
  },
  {
    id: 'class',
    label: 'Class',
    minWidth: 100
  }
]

const rows = [
  {
    id: '1',
    name: 'JoinIn Group',
    avatarGroup: '/images/avatars/1.png',
    class: 'EXE201_1',
    subject: 'EXE201',
    member: '4/5',
    leader: 'Thanh Huy',
    avatarLeader: '/images/avatars/2.png'
  },
  {
    id: '2',
    name: 'JoinIn Group',
    avatarGroup: '/images/avatars/1.png',
    class: 'EXE201_1',
    subject: 'EXE201',
    member: '4/5',
    leader: 'Thanh Huy',
    avatarLeader: '/images/avatars/2.png'
  },
  {
    id: '3',
    name: 'JoinIn Group',
    avatarGroup: '/images/avatars/1.png',
    class: 'EXE201_1',
    subject: 'EXE201',
    member: '4/5',
    leader: 'Thanh Huy',
    avatarLeader: '/images/avatars/2.png'
  },
  {
    id: '4',
    name: 'JoinIn Group',
    avatarGroup: '/images/avatars/1.png',
    class: 'EXE201_1',
    subject: 'EXE201',
    member: '4/5',
    leader: 'Thanh Huy',
    avatarLeader: '/images/avatars/2.png'
  },
  {
    id: '5',
    name: 'JoinIn Group',
    avatarGroup: '/images/avatars/1.png',
    class: 'EXE201_1',
    subject: 'EXE201',
    member: '4/5',
    leader: 'Thanh Huy',
    avatarLeader: '/images/avatars/2.png'
  },
  {
    id: '6',
    name: 'JoinIn Group',
    avatarGroup: '/images/avatars/1.png',
    class: 'EXE201_1',
    subject: 'EXE201',
    member: '4/5',
    leader: 'Thanh Huy',
    avatarLeader: '/images/avatars/2.png'
  },
  {
    id: '7',
    name: 'JoinIn Group',
    avatarGroup: '/images/avatars/1.png',
    class: 'EXE201_1',
    subject: 'EXE201',
    member: '4/5',
    leader: 'Thanh Huy',
    avatarLeader: '/images/avatars/2.png'
  }
]

export default function TabGroup({ renderType }: GroupRenderProps) {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    event.stopPropagation();
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
    handleClickOpenAlert();
    handleOptionsClose()
  }

  const handleViewDetail = () => {
    // Handle view detail action
    router.push('/group/task')
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
        <Button size='small' variant='contained' sx={{ marginRight: '20px' }} onClick={handleClickOpen}>
          Create Group
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <DialogTitle>Create Group</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>
                <Close sx={{ color: 'red' }} />
              </Button>
            </DialogActions>
          </Box>
          <DialogContent>
            <GroupForm />
          </DialogContent>
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
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id} onClick={handleViewDetail}>
                  <TableCell align='center' sx={{ minWidth: '20px' }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                        {column.id === 'name' || column.id === 'leader' ? (
                          <AvatarName
                            avatar={column.id === 'name' ? row.avatarGroup : row.avatarLeader}
                            title={value}
                          />
                        ) : (
                          value
                        )}
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
          <MenuItem onClick={handleViewDetail}>
          <InformationVariant fontSize='small' sx={{mr:3}} /> Detail
          </MenuItem>
          <MenuItem onClick={handleDelete}>
          <ExitToApp fontSize='small' sx={{mr:3}} /> Out Group
            </MenuItem>
        </Menu>
      </TableContainer>

      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Group EXE"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to move out this group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Cancel</Button>
          <Button onClick={handleCloseAlert} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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
