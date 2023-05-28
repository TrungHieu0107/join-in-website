
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import { InputAdornment  } from '@mui/material'
import {  InformationVariant, Star  } from 'mdi-material-ui'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))



const GroupForm  = () => {
  // ** State
  const imgSrc= '/images/avatars/1.png'



  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic'   />
              <Typography variant='h5'>Xuan Kien</Typography>
            </Box>

          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth type='number' label='Rating' placeholder='5/5'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Star />
                </InputAdornment>
              )
            }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
          <TextField
             id="content"
            label="Content"
            multiline
            rows={4}
            placeholder='Content'
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <InformationVariant />
                </InputAdornment>
              )
            }}
          />
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

export default GroupForm
