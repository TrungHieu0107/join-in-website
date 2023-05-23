


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card,CardContent, Divider, Typography } from '@mui/material'


const Options = () => {
  // ** State

  return (
    <Card>
    <CardContent sx={{textAlign: 'center'}}>
      <Typography variant='h4'>Mission</Typography>
      <Typography>To nurture a vibrant culture of academic wellness responsive to the challenges of technology and the global community.</Typography>
      <Divider/>
      <Typography variant='h4'>Vision</Typography>
      <Typography>An eminent center of excellent higher education towards soceital advancement.</Typography>
      <Divider/>
      <Typography variant='h4'>Philosophy</Typography>
      <Typography>Social transformation for a caring community and ecologically balance country.</Typography>
    </CardContent>
    </Card>
  )
}

export default Options
