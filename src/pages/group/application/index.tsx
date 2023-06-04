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
  Typography,
  Grid,
  Avatar
} from '@mui/material'
import { Close, DotsHorizontal, Magnify } from 'mdi-material-ui'
import RecruitmentForm from 'src/views/group/application/RecruitmentForm'
import { StatusObj } from 'src/constants/task-status'
import AvatarName from 'src/layouts/components/AvatarName'
import { useToasts } from 'react-toast-notifications'
import { applicationAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { Application } from 'src/models/class'
import { ApplicationStatus } from 'src/constants/application-status'

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
  APPROVED: { color: 'success' },
  DISAPPROVED: { color: 'error' },
  WAITING: { color: 'warning' }
}

const rows = [
  {
    id: '1',
    avatar: '/images/avatars/2.png',
    name: 'Xuan Kien',
    position: 'Information Technology',
    createddate: '29-5-2023',
    description: 'hello',
    status: 'ACCEPTED',
    confirmeddate: '29-5-2023'
  },
  {
    id: '2',
    avatar: '/images/avatars/2.png',
    name: 'Quoc Bao',
    position: 'Information Technology',
    createddate: '29-5-2023',
    description: 'hello',
    status: 'WAITING',
    confirmeddate: ''
  },
  {
    id: '3',
    avatar: '/images/avatars/2.png',
    name: 'Trung Hieu',
    position: 'Information Technology',
    createddate: '29-5-2023',
    description: 'hello',
    status: 'REJECTED',
    confirmeddate: '29-5-2023'
  }
]

const ApplicationScreen =  () => {
  const addToast = useToasts()

  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)


  const [open, setOpen] = useState(false)

  const [openPopupApplication, setOpenPopupApplication] = useState(false)

  const [listApplications, setListApplications] = useState<any[]>([])
  const [selectedRow, setSelectedRow] = useState<any>()

  useEffect(() => {
    getListApplication()
  }, [])

  const handleRejectApplication = async () =>{
    try {
      await applicationAPI.putApplication({applicationId: selectedRow?.id, status: ApplicationStatus.DISAPPROVED})
      .then(res =>{
        const data = new CommonResponse(res)
        addToast.addToast(data.message,{appearance:'success'})
      })
      .catch(err => {
        console.log(err)
      })
      handlePopupApplication()
    }catch (err){
      console.log(err)
    }
  }

  const handleAcceptApplication = async () =>{
    try {
      await applicationAPI.putApplication({applicationId: selectedRow?.id, status: ApplicationStatus.APPROVED})
      .then(res =>{
        const data = new CommonResponse(res)
        addToast.addToast(data.message,{appearance:'success'})
      })
      .catch(err => {
        console.log(err)
      })
      handlePopupApplication()
    }catch (err){
      console.log(err)
    }
  }

  const handleClickPopupApplication = () => {
    setOpenPopupApplication(true)
  }

  const handlePopupApplication = () => {
    setOpenPopupApplication(false)
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
    console.log(row);
    setSelectedRow(row)

  }

  const handleOptionsClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

  const handleViewDetail = (row?: any) => {
    // Handle view detail action
    row && setSelectedRow(row)
    handleClickPopupApplication()

    // handleOptionsClose()
  }

  const handleViewProfile = () => {
    // Handle change status action
    // handleOptionsClose()
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getListApplication = async () => {
    try {
      await applicationAPI
        .getList()
        .then(res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })

          const applications: Application[] = data.data
          const list = applications.map(application => ({
            id: application.id,
            avatar: application.user?.avatar,
            name: application.user?.fullName,
            position: 'Information Technology',
            createddate: application.createdDate,
            description: application.description,
            status: 'WAITING',
            confirmeddate: application.confirmedDate
          }))
          setListApplications(list)
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
          Recruitment
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <DialogTitle>Recruitment</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>
                <Close sx={{ color: 'red' }} />
              </Button>
            </DialogActions>
          </Box>
          <DialogContent>
            <RecruitmentForm />
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
            {listApplications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id} onClick={()=>handleViewDetail(row)}>
                  <TableCell align='center' sx={{ minWidth: '20px' }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {/* {column.format && typeof value === 'string' ? column.format(value) : value} */}
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
          <MenuItem onClick={handleViewDetail}>View Application</MenuItem>
          <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
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

      <Dialog
        open={openPopupApplication}
        onClose={handlePopupApplication}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <DialogTitle>Application</DialogTitle>
          <DialogActions>
            <Button onClick={handlePopupApplication}>
              <Close sx={{ color: 'red' }} />
            </Button>
          </DialogActions>
        </Box>
        <DialogContent>
          <form>
            <Grid container spacing={7}>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <Avatar src={selectedRow?.avatar} alt='Profile Pic' sx={{ width: 120, height: 120 }} />
                  <Typography variant='h5'>{selectedRow?.name}</Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
          <Typography mt={7}>Position: {selectedRow?.position}</Typography>
          <Typography mt={7}>Submission date: {selectedRow?.createddate}</Typography>
          <Typography mt={7}>Description: {selectedRow?.description}</Typography>
          <Typography mt={7}>
            <b>{selectedRow?.name}</b> want to join group <b>EXE</b>. Do you want to?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box display='flex' justifyContent='center' width='100%'>
            <Button onClick={handleRejectApplication} variant='outlined' color='error' sx={{ mr: 10 }} disabled={selectedRow?.status !== 'WAITING'}>
              Reject
            </Button>
            <Button onClick={handleAcceptApplication} autoFocus variant='contained' color='success' disabled={selectedRow?.status !== 'WAITING'}>
              Accept
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default ApplicationScreen
