// ** React Imports
import { useState, ChangeEvent, ReactNode, useEffect } from 'react'

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
  Chip,
  DialogContentText,
  Typography,
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { Account, Close, DotsHorizontal, ExitToApp, InformationVariant, Magnify } from 'mdi-material-ui'
import InviteForm from 'src/views/group/member/InviteForm'
import { StatusObj } from 'src/constants/task-status'
import AvatarName from 'src/layouts/components/AvatarName'
import { useRouter } from 'next/router'
import withAuth from 'src/pages/withAuth'
import { memberAPI } from 'src/api-client'
import { useToasts } from 'react-toast-notifications'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { Member } from 'src/models/class'
import { groupDBDexie } from 'src/models/db/GroupDB'

interface Column {
  id: 'name' | 'role' | 'major' | 'joindate' | 'status'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string | ReactNode
}

const optionsRole = [
  { value: 'LEADER', label: 'Leader' },
  { value: 'SUB-LEADER', label: 'Sub Leader' },
  { value: 'MEMBER', label: 'Member' }
]

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 100 },
  {
    id: 'major',
    label: 'Major',
    minWidth: 100
  },
  {
    id: 'joindate',
    label: 'Join Date',
    minWidth: 100
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 200,
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
  }
]

const statusObj: StatusObj = {
  ACTIVE: { color: 'info' },
  OUT: { color: 'error' }
}

const rows = [
  {
    id: '1',
    avatar: '/images/avatars/2.png',
    name: 'Xuan Kien',
    role: 'Member',
    major: 'Information Technology',
    joindate: '30-5-2023',
    status: 'ACTIVE'
  },
  {
    id: '2',
    avatar: '/images/avatars/2.png',
    name: 'Trung Hieu',
    role: 'Member',
    major: 'Information Technology',
    joindate: '30-5-2023',
    status: 'ACTIVE'
  },
  {
    id: '3',
    avatar: '/images/avatars/2.png',
    name: 'Quoc Bao',
    role: 'Member',
    major: 'Information Technology',
    joindate: '30-5-2023',
    status: 'OUT'
  }
]

const Application = () => {
  const router = useRouter()
  const addToast = useToasts()

  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<any>()

  const [open, setOpen] = useState(false)

  const [openAlertDelete, setOpenAlertDelete] = useState(false)

  const [openPopupChangeRole, setOpenPopupChangeRole] = useState(false)

  const [listMembers, setListMember] = useState<any[]>([])
  const [selectedRole, setSelectedRole] = useState<any>({
    value: '',
    label: ''
  })



  useEffect(() => {
    getListMember()
  }, [])

  const handleChangeRole = (event: SelectChangeEvent<string>) => {
    setSelectedRole({ value: event.target.value,
      label: optionsRole.find((option) => option.value === event.target.value)?.label
    })
  }

  const handleSubmitChangeRole = async () => {
    try {
      const groupData = await groupDBDexie.getGroup()

      const member: any = {
        role: 0,
        groupId: groupData?.id,
        memberId: selectedRow?.id
      }

      await memberAPI
        .put(member)
        .then(async res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })
        })
        .catch(error => {
          console.log('Member Form: ', error)
        })
    } catch (e) {
      console.log('Member Form: ', e)
    }
  }

  const handleClickPopupChangeRole = () => {
    setOpenPopupChangeRole(true)
  }

  const handlePopupChangeRole = () => {
    setOpenPopupChangeRole(false)
    handleOptionsClose()
  }

  const handleClickOpenAlertDelete = () => {
    setOpenAlertDelete(true)
  }

  const handleCloseAlertDelete = () => {
    setOpenAlertDelete(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setSelectedRow(row)
  }

  const handleOptionsClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

  const handleDelete = () => {
    // Handle delete action
    handleClickOpenAlertDelete()
    handleOptionsClose()
  }

  const handleViewDetail = (row?: any) => {
    // Handle view detail action
    row && setSelectedRow(row)
    router.push('/profile')

    // handleOptionsClose()
  }

  const handleChangeStatus = () => {
    // Handle change status action
    handleClickPopupChangeRole()

    // handleOptionsClose()
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getListMember = async () => {
    try {
      await memberAPI
        .getList()
        .then(res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })
          const members: Member[] = data.data.map((member: Member) => new Member(member))
          const list = members.map(member => ({
            id: member.id,
            avatar: member.user?.avatar,
            name: member.user?.fullName,
            role: member.role,
            major: member.user?.applications?.at(0).applicationMajors?.at(0).major?.name,
            joindate: member.joinedDate,
            status: 'ACTIVE'
          }))
          setListMember(list)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
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
        <Button size='small' variant='contained' sx={{ marginRight: '20px' }} onClick={handleClickOpen}>
          Invite
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <DialogTitle>Invite</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>
                <Close sx={{ color: 'red' }} />
              </Button>
            </DialogActions>
          </Box>
          <DialogContent>
            <InviteForm />
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
            {listMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id} onClick={handleViewDetail}>
                  <TableCell align='center' sx={{ minWidth: '20px' }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {/* {column.format && typeof value === 'string' ? column.format(value) : value} */}
                        {/* {value} */}
                        {column.id === 'name' ? (
                          <AvatarName avatar={row.avatar} title={value} />
                        ) : (
                          <div>{column.format && typeof value === 'string' ? column.format(value) : value}</div>
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
            <InformationVariant fontSize='small' sx={{ mr: 3 }} /> Detail
          </MenuItem>
          <MenuItem onClick={handleChangeStatus}>
            <Account fontSize='small' sx={{ mr: 3 }} /> Change Role
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ExitToApp fontSize='small' sx={{ mr: 3 }} /> Move Out
          </MenuItem>
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

      {/* Dialog Cofirm Kick out member */}
      <Dialog
        open={openAlertDelete}
        onClose={handleCloseAlertDelete}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Kicked out of the group EXE'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do you want to kick <b>{selectedRow?.name}</b> out of the group <b>EXE</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertDelete}>Cancel</Button>
          <Button onClick={handleCloseAlertDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog change role */}
      <Dialog
        open={openPopupChangeRole}
        onClose={handlePopupChangeRole}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Change Role'}</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={7}>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Avatar src={selectedRow?.avatar} alt='Profile Pic' sx={{ width: 120, height: 120 }} />
                  <Typography variant='h5'>{selectedRow?.name}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select label='Role' value={selectedRole.value || selectedRow?.role} onChange={handleChangeRole}>
                    {optionsRole.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
          {selectedRole.value && (
            <Typography mt={7}>
              Do you want to change <b>{selectedRow?.role}</b> to <b>{selectedRole.label}</b>?
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handlePopupChangeRole}>Cancel</Button>
          {selectedRole && (
            <Button onClick={handleSubmitChangeRole} autoFocus>
              Yes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default withAuth(Application)
