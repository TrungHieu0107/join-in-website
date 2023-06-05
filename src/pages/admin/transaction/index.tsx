import { Chip, Paper } from '@mui/material'
import * as React from 'react'
import TransactionChartView from 'src/views/charts/TransactionChart'
import { ChangeEvent, useEffect, useState } from 'react'
import { Transaction } from 'src/models/class'
import {
  CardHeader,
  Box,
  Card,
  Grid,
  TextField,
  FormControl,
  Button,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { Column } from 'src/models/common/Column'
import { transactionAPI } from 'src/api-client/transaction'
import withAuth from 'src/pages/withAuth'
import { QueryTransactionListModel } from 'src/models/query-models/QueryTransactionListModel'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { useToasts } from 'react-toast-notifications'
import { StatusObj } from 'src/constants/task-status'

const columns: Column[] = [
  {
    id: 'transactionCode',
    label: 'Code',
    align: 'left'
  },
  {
    id: 'createdDate',
    label: 'Created Date',
    align: 'left'
  },
  {
    id: 'transactionDate',
    label: 'Confirmed Date',
    align: 'left'
  },
  {
    id: 'user',
    label: 'Account',
    align: 'left',
    format: (value: Transaction) => <Typography>{value.user?.fullName}</Typography>
  },
  {
    id: 'status',
    label: 'Status',
    align: 'left',
    format: (value: Transaction) => {
      const status  = value.status ?? 'WAITING';

      return <Chip
        label={status}
        color={statusObj[status as string].color}
        sx={{
          height: 24,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          '& .MuiChip-label': { fontWeight: 500 }
        }}
      />
      }
  }
]

const statusObj: StatusObj = {
  SUCCESS: { color: 'success' },
  FAIL: { color: 'error' },
  CANCELED: { color: 'info' },
  WAITING: { color: 'warning' }
}

const TransactionPage = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [currentData, setCurrentData] = useState<Transaction[]>([])
  const [isOpenDialogCheckTransaction, setIsOpenDialogCheckTransaction] = useState<boolean>(true)
  const [transactionCode, setTransactionCode] = useState<string>('')

  const addToast = useToasts()

  useEffect(() => {
    // setCurrentData(transactionList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
    getListTraction()
  }, [searchValue, page, rowsPerPage])

  const getListTraction = async () => {
    try {
      const payload: QueryTransactionListModel = {
        pageSize: 10,
        pageNumber: 1,
        endDate: undefined,
        startDate: undefined,
        userId: undefined,
        transactionStatus: undefined,
        code: undefined,
        id: undefined
      }

      await transactionAPI
        .getList(payload)
        .then(res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })

          const transactions: Transaction[] = data.data.map((transation : Transaction) => new Transaction(transation))

          setCurrentData(transactions)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const changeSearchValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(event?.target.value)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleCloseDialogCheckTransaction = () => {
    setIsOpenDialogCheckTransaction(false)
  }



  const handleCheckTransaction = () => {
    console.log(transactionCode)
    handleCloseDialogCheckTransaction()
  }

  return (
    <Paper>
      <TransactionChartView />
      <Card>
        <CardHeader
          title={
            <Box>
              <Grid container spacing={1} justifyContent={'space-around'}>
                <Grid item sm={5} md={4}>
                  <FormControl fullWidth>
                    <TextField
                      id='form-input-search-value'
                      placeholder='Search'
                      label={'Search'}
                      value={searchValue}
                      onChange={e => changeSearchValue(e)}
                      size='small'
                    />
                  </FormControl>
                </Grid>
                <Grid item container sm={7} md={8} spacing={0.5} justifyContent={'flex-end'}>
                  <Grid item>
                    <Button
                      size='small'
                      variant='outlined'
                      color='info'
                      sx={{ m: 1 }}
                      onClick={() => setIsOpenDialogCheckTransaction(true)}
                    >
                      Check done transation
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          }
        />
        <CardContent>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' sx={{ minWidth: '30px' }}>
                    Index
                  </TableCell>
                  {columns?.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData?.map((row, index) => {
                  const rowData: any = row

                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={rowData?.Id}>
                      <TableCell align='center'>{page * rowsPerPage + index + 1}</TableCell>
                      {columns.map(column => {
                        const value = rowData[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(row) : value}
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
            count={currentData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
      <Dialog
        open={isOpenDialogCheckTransaction}
        onClose={handleCloseDialogCheckTransaction}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '500px' // Set your width here
            }
          }
        }}
      >
        <DialogTitle>Check transaction</DialogTitle>
        <DialogContent>
          <FormControl margin='dense' fullWidth>
            <TextField
              autoComplete='=off'
              label={'Code'}
              placeholder='Enter the code'
              value={transactionCode}
              onChange={(e: any) => {
                setTransactionCode(e.target.value)
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckTransaction}>Check</Button>
          <Button color='error' onClick={handleCloseDialogCheckTransaction}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default withAuth(TransactionPage)
