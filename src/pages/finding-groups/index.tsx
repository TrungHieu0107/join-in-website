// ** React Imports
import { useState } from 'react'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Grid, Pagination } from '@mui/material'
import CardGroup from 'src/views/finding-groups/CardGroup'


const FindingGroups = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = Array.from(Array(totalItems).keys()).slice(startIndex, endIndex);


  return (
    <Grid container spacing={7}>
      {paginatedItems.map((index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CardGroup/>
        </Grid>
      ))}
       <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Grid>
  );
}

export default FindingGroups
