// ** React Imports
import { ChangeEvent, useState } from 'react'
import * as React from 'react'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, Grid, InputAdornment, Pagination, TextField } from '@mui/material'
import CardGroup from 'src/views/finding-groups/CardGroup'
import { Magnify } from 'mdi-material-ui'
import { useRouter } from 'next/router'


// export interface FindingGroupsPageProps {
// }

export default function FindingGroupsPage () {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const totalItems = 100
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const router = useRouter();

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    router.push(
      {
        pathname: `/finding-groups`,
        query: {
          page
        }
      },
      `/finding-groups?page=${page}`,
      { shallow: true }
    )
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = Array.from(Array(totalItems).keys()).slice(startIndex, endIndex)

  return (
    <Card sx={{padding: '15px'}}>
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
    <Grid container spacing={7}>
      {paginatedItems.map(index => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CardGroup />
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color='primary' />
      </Grid>
    </Grid>
    </Card>
  );
}

