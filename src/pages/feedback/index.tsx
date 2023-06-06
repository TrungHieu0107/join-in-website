
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import { Close, Magnify } from 'mdi-material-ui'
import * as React from 'react'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import FeedbackForm from 'src/views/feedback/FeedbackForm'
import withAuth from '../withAuth'
import { Feedback } from 'src/models/class'
import { QueryFeedbackListModel } from 'src/models/query-models/QueryFeedbackListModel'
import { feedbackAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { useToasts } from 'react-toast-notifications'

interface Column {
  id: 'rating' | 'createdDate' | 'content'
  label: string
  minWidth?: number
  align?: 'right' | 'center'
  format?: (value: any) => string | ReactNode
}

const columns: Column[] = [
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 100,
    align: 'center',
    format: (value: number) => (
      <Rating name="read-only" value={value} readOnly precision={0.5} />
    )
  },
  {
    id: 'createdDate',
    label: 'Feedbacked Date',
    minWidth: 200,
    align: 'center'
  },
  {
    id: 'content',
    label: 'Content',
    minWidth: 300,
    format: (value: string) =>(
      <div className='editor' dangerouslySetInnerHTML={{ __html: value }}/>
    )
  },
]

function createData() {
  return {
    Id:12,
    Content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    Rating: 4,
    FeedbackedDate: '2023-02-01'
  }
}

const rows = [
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
  createData()
]

const FeedbackList = () => {

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [listFeedback, setListFeedback] = useState<Feedback[]>([])

  const addToast = useToasts();
  useEffect(()=>{
    getListFeedback()
  },[])

  const getListFeedback = async () => {
    try {

      const payload : QueryFeedbackListModel = {
        orderBy: '',
        page: 1,
        pageSize: 10,
        value: ''
      }

      await feedbackAPI
        .getList(payload)
        .then(res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })

          const feedbacks: Feedback[] = data.data

          setListFeedback(feedbacks)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const [open, setOpen] = useState(false)

  const [listFeedback, setListFeedback] = useState<Feedback[]>([])

  const addToast = useToasts();
  useEffect(()=>{
    getListFeedback()
  },[])

  const getListFeedback = async () => {
    try {

      const payload : QueryFeedbackListModel = {
        orderBy: '',
        page: 1,
        pageSize: 10,
        value: ''
      }

      await feedbackAPI
        .getList(payload)
        .then(res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })

          const feedbacks: Feedback[] = data.data

          setListFeedback(feedbacks)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }



  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }


  return  (
    <Card>
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
          Open Feedback
        </Button>

        <Dialog open={open} onClose={handleClose}>
        <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <DialogTitle>Open Feedback</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            <Close sx={{color: 'red'}}/>
          </Button>
        </DialogActions>
        </Box>

        <DialogContent>
          <FeedbackForm/>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {listFeedback.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  <TableCell align='center' sx={{ minWidth: '20px' }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}

                        {/* {value} */}
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
    </Card>
  )

}

export default withAuth(FeedbackList)
