// ** MUI Imports
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, CardContent, Divider, Box, Typography } from '@mui/material'
import { AccountMultiple } from 'mdi-material-ui'

// ** Icons Imports

interface RecruitmentDataType {
  major: string,
  quantity: number
}

const RecruitmentData = [
  {major: 'Information Technology', quantity: 1},
  {major: 'English', quantity: 2},
]

const RecruitmentForm = () => {
  // ** State

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
        <Grid item xs={12} >
            <FormControl fullWidth>
              <InputLabel>Major</InputLabel>
              <Select label='Role' defaultValue='IT'>
                <MenuItem value='IT'>Information Technology</MenuItem>
                <MenuItem value='BA'>Business Administration</MenuItem>
                <MenuItem value='EN'>English</MenuItem>
                <MenuItem value='JP'>Japan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Quantity'
              placeholder='1'
              defaultValue='1'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountMultiple />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{m: '20px'}}>
        Recruiting
        </Divider>
      {RecruitmentData.map((item: RecruitmentDataType, index: number) => {
            return (
              <Box
                key={item.major}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== RecruitmentData.length - 1 ? 6 : 0 }}
              >
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.major}</Typography>
                  </Box>
                  <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'success.main' }}>
                    {item.quantity}
                  </Typography>
                </Box>
              </Box>
            )
          })}
    </CardContent>
  )
}

export default RecruitmentForm
