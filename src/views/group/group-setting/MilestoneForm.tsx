

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import { InputAdornment } from '@mui/material'
import { Pen,  InformationVariant} from 'mdi-material-ui'


const MilestoneForm  = () => {
  // ** State


  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} >
            <TextField fullWidth label='Title' placeholder='Title'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Pen />
                </InputAdornment>
              )
            }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
          <TextField
             id="description"
            label="Description"
            multiline
            rows={4}
            placeholder='Description'
            defaultValue="Description"
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
              Create
            </Button>
            <Button type='reset' variant='outlined' color='secondary' sx={{ marginRight: 3.5 }}>
              Reset
            </Button>
            <Button  variant='outlined' color='error'>
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default MilestoneForm
