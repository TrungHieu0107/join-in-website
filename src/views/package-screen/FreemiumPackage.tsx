// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ShortDivider from './ShortDivider'

const FreemiumPackage = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '9.375rem' }} image='/images/cards/analog-clock.jpg' />
      <CardContent sx={{textAlign: 'center', padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography variant='h4' sx={{ marginBottom: 2  }}>
          Freemium
        </Typography>
        <Typography sx={{ marginBottom: 2 ,color: 'red'}}>0k/month</Typography>
        <ShortDivider width='50%'/>
        <Typography variant='body2'>
          Only create 5 groups
        </Typography>
        <ShortDivider width='70%'/>
        <Typography variant='body2'>
         Maximum of 5 members per group
        </Typography>
        <ShortDivider width='60%'/>
        <Typography variant='body2'>
          Only create 10 main tasks per group
        </Typography>
        <ShortDivider width='70%'/>
        <Typography variant='body2'>
         Maximum of 5 sub tasks per main tasks
        </Typography>
        <ShortDivider width='80%'/>
        <Typography variant='body2'>
          Occasional ads here & there
        </Typography>
      </CardContent>
      <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Purchase
      </Button>
    </Card>
  )
}

export default FreemiumPackage
