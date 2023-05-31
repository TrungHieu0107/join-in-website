// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import {  Avatar, Rating } from '@mui/material'
import { InformationVariant, Star } from 'mdi-material-ui'
import Editor from '../dialog/editor'
import React from 'react'


const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

const FeedbackForm = () => {
  // ** State
  const imgSrc = '/images/avatars/1.png'
  const [value, setValue] = React.useState<number | null>(2)
  const [hover, setHover] = React.useState(-1)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Avatar src={imgSrc} alt='Profile Pic'  sx={{ width: 120, height: 120 }}/>
              <Typography variant='h5'>Pham Xuan Kien</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Star sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Rating</Typography>
            </Box>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Rating
                name='hover-feedback'
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue)
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover)
                }}
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize='inherit' />}
              />
              {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <InformationVariant sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Content</Typography>
            </Box>
            <Editor name='description' onChange={undefined} value={undefined} />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Submit
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default FeedbackForm
