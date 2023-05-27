// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ShortDivider from '../../layouts/components/ShortDivider'

const PremiumPackage = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '9.375rem' }} image='/images/cards/analog-clock.jpg' />
      <CardContent sx={{textAlign: 'center', padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography variant='h4' sx={{ marginBottom: 2  }}>
          Premium
        </Typography>
        <Typography sx={{ marginBottom: 2 ,color: 'red'}}>50.000VND/month</Typography>
        <ShortDivider width='50%'/>
        <Typography variant='body2'>
          Create up to 30 groups
        </Typography>
        <ShortDivider width='70%'/>
        <Typography variant='body2'>
         Maximum of 20 members per group
        </Typography>
        <ShortDivider width='60%'/>
        <Typography variant='body2'>
          Create up to 100 main tasks per group
        </Typography>
        <ShortDivider width='70%'/>
        <Typography variant='body2'>
         Maximum of 7 sub tasks per main tasks
        </Typography>
        <ShortDivider width='80%'/>
        <Typography variant='body2'>
          No ads whatsoever
        </Typography>
      </CardContent>
      <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Purchase
      </Button>
    </Card>
  )
}

export default PremiumPackage