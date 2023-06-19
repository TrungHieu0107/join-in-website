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
  Switch,
  Avatar,
  Checkbox
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { userAPI } from 'src/api-client/user'
import { User, UserMajor } from 'src/models/class'
import { Column } from 'src/models/common/Column'
import moment from 'moment'
import withAuth from 'src/pages/withAuth'
import { QueryUsersModel } from 'src/models/query-models/QueryUsersModel'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

const UserManagemePage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState<User[]>([])
  const [rowsSelected, setRowsSelected] = useState<string[]>([])
  const [queryUsers, setQueryUsers] = useState<QueryUsersModel>(new QueryUsersModel())
  const addToast = useToasts()
  const router = useRouter()

  const columns: Column[] = [
    {
      id: 'fullName',
      label: 'Name',
      align: 'left'
    },
    {
      id: 'email',
      label: 'Email',
      align: 'left'
    },
    {
      id: 'avatar',
      label: 'Avatar',
      align: 'left',
      format: (value: any) => <Avatar alt='Test' src={value?.avatar} sizes='small' />
    },
    {
      id: 'gender',
      label: 'Gender',
      align: 'left',
      format: (value: boolean) => {
        return value ? 'Male' : 'Female'
      }
    },
    {
      id: 'phone',
      label: 'Phone',
      align: 'left'
    },
    {
      id: 'birthDay',
      label: 'BirthDay',
      align: 'left',
      format: (value: Date | string) => {
        return moment(value.toString()).format('YYYY-MM-DD')
      }
    },
    {
      id: 'userMajors',
      label: 'Major',
      align: 'left',
      format: (value: UserMajor[]) => {
        return value?.map(val => val?.major?.name)
      }
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      format: (value: number) => {
        return value === 0 ? <Switch checked /> : <Switch checked={false} />
      }
    }
  ]

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    addToast.addToast(message, { appearance: type })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async (query?: QueryUsersModel) => {
    const queryFetch = query ?? queryUsers

    await userAPI.Admin.getListUser(queryFetch)
      .then(commonUsers => {
        const common = new CommonResponse(commonUsers)
        setQueryUsers({
          currentPage: common.pagination?.currentPage,
          pageSize: common.pagination?.pageSize,
          total: common.pagination?.total
        } as QueryUsersModel)
        console.log(common.data as User[])

        setData(common.data as User[])
      })
      .catch(error => {
        handleError(error)
      })
  }

  const handleError = (error: any) => {
    const dataErr = (error as AxiosError)?.response
    if (dataErr?.status === 401) {
      notify('Login expired.', 'error')
      router.push('/user/login')
    } else if (dataErr?.status === 500) {
      if (error?.response?.data?.message) notify(error?.response?.data?.message, 'error')
      else notify('Something error', 'error')
    } else {
      console.log(error)
    }
  }

  const handleCheckRowIndex = (event: any, id: string) => {
    const selectedRows = [...rowsSelected]
    if (event.target.checked) {
      selectedRows.push(id)
    } else {
      selectedRows.splice(rowsSelected.indexOf(id), 1)
    }

    setRowsSelected(selectedRows)
  }

  const handleCheckAllRow = (event: any) => {
    if (event.target.checked) {
      const list: any[] = []
      data?.map(value => list.push(value.id ?? -1))
      setRowsSelected(list)
    } else {
      setRowsSelected([])
    }
  }

  const changeSearchValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.target.value &&
      setQueryUsers(
        new QueryUsersModel({
          ...queryUsers,
          email: event.target.value
        } as QueryUsersModel)
      )

    setSearchValue(event.target.value)

    fetchUsers(
      new QueryUsersModel({
        ...queryUsers,
        email: event.target.value
      } as QueryUsersModel)
    )
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setQueryUsers(
      new QueryUsersModel({
        ...queryUsers,
        currentPage: newPage
      } as QueryUsersModel)
    )
    setRowsSelected([])
    fetchUsers({
      ...queryUsers,
      currentPage: newPage
    } as QueryUsersModel)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryUsers(
      new QueryUsersModel({
        ...queryUsers,
        currentPage: 1,
        pageSize: +event.target.value
      } as QueryUsersModel)
    )
    setRowsSelected([])
    fetchUsers(
      new QueryUsersModel({
        ...queryUsers,
        currentPage: 1,
        pageSize: +event.target.value
      } as QueryUsersModel)
    )
  }

  return (
    <Card>
      <CardHeader
        title={
          <Box>
            <Grid container spacing={1} justifyContent={'space-around'}>
              <Grid item sm={5} md={4}>
                <FormControl fullWidth>
                  <TextField
                    id='form-input-search-value'
                    placeholder='email123@gmail.com'
                    label={'Search by email'}
                    value={searchValue}
                    onChange={e => changeSearchValue(e)}
                    size='small'
                  />
                </FormControl>
              </Grid>
              <Grid item container sm={7} md={8} spacing={0.5} justifyContent={'flex-end'}>
                <Grid item>
                  <Button size='small' variant='outlined' color='error' sx={{ m: 1 }}>
                    Ban
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        }
      />
      <CardContent>
        <TableContainer sx={{ height: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' padding='none'>
                  <Checkbox onChange={handleCheckAllRow} checked={rowsSelected.length === data.length} />
                </TableCell>
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
              {data?.map((row, index) => {
                const rowData: any = row

                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={rowData?.Id}>
                    <TableCell align='center' padding='none'>
                      <Checkbox
                        onChange={e => handleCheckRowIndex(e, row.id ?? '')}
                        checked={rowsSelected.indexOf(row.id ?? '') !== -1}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {(queryUsers.currentPage - 1) * queryUsers.pageSize + index + 1}
                    </TableCell>
                    {columns.map(column => {
                      const value = rowData[column.id]

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
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
          rowsPerPageOptions={[1, 10, 25, 100]}
          component='div'
          count={data?.length}
          rowsPerPage={queryUsers.pageSize}
          page={queryUsers.currentPage - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}

export default withAuth(UserManagemePage)
