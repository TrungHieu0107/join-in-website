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
    format: (value: string) => {
      return value === 'ACTIVE' ? <Switch checked /> : <Switch checked={false} />
    }
  }
]

const UserManagemePage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [data, setData] = useState<User[]>(userAPI.Admin.getListUser())
  const [rowsSelected, setRowsSelected] = useState<number[]>([])
  const [currentData, setCurrentData] = useState<User[]>()

  useEffect(() => {
    setData(userAPI.Admin.getListUser())
    setCurrentData(data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
  }, [searchValue, page, rowsPerPage])

  const handleCheckRowIndex = (event: any, id: number) => {
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
      setRowsSelected(currentData?.map(value => value.id ?? -1) ?? [])
    } else {
      setRowsSelected([])
    }
  }

  const changeSearchValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(event?.target.value)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    setRowsSelected([])
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
    setRowsSelected([])
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
                  <Button size='small' variant='outlined' color='error' sx={{m:1}}>Ban</Button>
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
                <TableCell align='center' padding='none'>
                  <Checkbox onChange={handleCheckAllRow} checked={rowsSelected.length === rowsPerPage} />
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
              {currentData?.map((row, index) => {
                const rowData: any = row
                
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={rowData?.Id}>
                    <TableCell align='center' padding='none'>
                      <Checkbox
                        onChange={e => handleCheckRowIndex(e, row.id ?? -1)}
                        checked={rowsSelected.indexOf(row.id ?? -1) !== -1}
                      />
                    </TableCell>
                    <TableCell align='center'>{page * rowsPerPage + index + 1}</TableCell>
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
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}

export default withAuth(UserManagemePage)