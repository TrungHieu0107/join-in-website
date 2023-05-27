
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material'
import { Magnify } from 'mdi-material-ui'
import * as React from 'react'
import { useState } from 'react'
import { Feedback } from 'src/models'
import FeedbackForm from 'src/views/feedback/FeedbackForm'

import TableStickyHeader from 'src/views/tables/MyTableStickyHeader'

import { Column } from 'src/views/tables/MyTableStickyHeader'


const col: Column[] = [
  {
    id: 'Rating',
    label: 'Rating',
    minWidth: 100,
    align: 'center',
    format: (value: any) => new String(value+'/5').toString()
  },
  {
    id: 'FeedbackedDate',
    label: 'FeedbackedDate',
    minWidth: 100,
    align: 'center',
    format: (value: any) => new Date(value).toDateString()
  },
  {
    id: 'Content',
    label: 'Content',
    minWidth: 300,
  },
]

function createData(): Feedback {
  const feedback = {
    Content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    Rating: 4,
    FeedbackedDate: new Date('2023-02-01')
  } as Feedback

  return feedback
}

const r = [
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

export default function FeedbackList() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <DialogTitle>Open Feedback</DialogTitle>
        <DialogContent>
          <FeedbackForm/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </Box>
      <TableStickyHeader columns={col} rows={r}></TableStickyHeader>
    </Card>
  )

}
