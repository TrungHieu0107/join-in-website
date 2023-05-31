// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Divider, Grid, Rating } from '@mui/material'
import {
  AccountOutline,
  AlphaACircleOutline,
  Book,
  Calendar,
  Contacts,
  EmailOutline,
  GenderMaleFemale,
  InformationVariant,
  Phone
} from 'mdi-material-ui'

const textDemo =
  'One of the key skills that is highly valued is communication. Effective communication skills enable you to express your ideas clearly, listen actively, and engage in productive discussions. It encompasses both verbal and written communication, allowing you to convey your message effectively and build strong relationships.'

const ProfileView = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ position: 'relative', height: '21rem' }}>
          <CardMedia sx={{ height: '15rem' }} image='/images/cards/background-user.png' />
          <Avatar
            alt='Robert Meyer'
            src='/images/avatars/1.png'
            sx={{
              width: 150,
              height: 150,
              left: '1.313rem',
              top: '10.28125rem',
              position: 'absolute',
              border: theme => `0.25rem solid ${theme.palette.common.white}`
            }}
          />
          <CardContent>
            <Box
              sx={{
                mt: 15,
                mb: 5,
                left: '12rem',
                top: '12rem',
                position: 'absolute',
                width: '80%'
              }}
            >
              <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              >
              <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h5'>Pham Xuan Kien</Typography>
                <Rating readOnly value={1} name='read-only' sx={{ marginRight: 2 }} />
              </Box>
              <Box sx={{ mr: 2, mb: 1, display: 'flex' }}>
                <Button variant='contained' color="success" sx={{ marginRight: 5 }}>Accept</Button>
                <Button variant="outlined" color="error">Reject</Button>
              </Box>
              </Box>

            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              Personal Information
            </Typography>
            <Divider sx={{ marginY: '20px' }} />
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Pham Xuan Kien</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <GenderMaleFemale sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Male</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>0123456789</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <EmailOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>masterkien@gmail.com</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Book sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Information Technology</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Calendar sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>01-01-2001</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              Other Information
            </Typography>
            <Divider sx={{ marginY: '20px' }} />
            <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <AlphaACircleOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Skills</Typography>
              </Box>

              <Typography variant='body1'>{textDemo}</Typography>
            </Box>
            <Divider sx={{ marginY: '20px' }} />
            <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Contacts sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Other Contacts</Typography>
              </Box>
              <Typography variant='body1'>{textDemo}</Typography>
            </Box>
            <Divider sx={{ marginY: '20px' }} />
            <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <InformationVariant sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Description</Typography>
              </Box>
              <Typography variant='body1'>{textDemo}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfileView
