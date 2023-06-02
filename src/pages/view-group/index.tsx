// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid } from '@mui/material'
import {
  AccountGroup,
  AccountTieHat,
  AlphaACircleOutline,
  Book,
  Close,
  InformationVariant,
  School,
  TownHall
} from 'mdi-material-ui'
import ApplicationForm from 'src/views/group/application/ApplicationForm'
import { useState } from 'react'

const textDemo =
  'One of the key skills that is highly valued is communication. Effective communication skills enable you to express your ideas clearly, listen actively, and engage in productive discussions. It encompasses both verbal and written communication, allowing you to convey your message effectively and build strong relationships.'


const SpaceBetweenText = (props: { title: string; content: string }) => {
    return (
      <Box
        sx={{
          mt: 7,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{  fontSize: '1rem' }}>{props.title}</Typography>
        </Box>
        <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
          {props.content}
        </Typography>
      </Box>
    )
  }


const GroupView = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
                <Typography variant='h5'>Group JoinIn</Typography>
              </Box>
              <Box sx={{ mr: 2, mb: 1, display: 'flex' }}>
                <Button variant='contained'  sx={{ marginRight: 5 }} onClick={handleClickOpen}>Apply</Button>
              </Box>
              </Box>

            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} >
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              Invitation
            </Typography>
            <Divider sx={{ marginY: '20px' }} />
            <Typography align='center' variant='h6'> Group JoinIn has sent you an invitation to join the group.<br/> Would you like to join with them? </Typography>
              <Box sx={{ mt: 2, mb: 1, display: 'flex', justifyContent:'center' }}>
              <Button variant='outlined' size='small' color='error' sx={{ marginRight: 5 }}>Reject</Button>
              <Button variant='contained'  size='small' color='success' >Accept</Button>
              </Box>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              Group Information
            </Typography>
            <Divider sx={{ marginY: '20px' }} />
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <TownHall sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>School: FPT University</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <School sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Class: EXE201_1</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Book sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Subject: EXE201</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <AccountGroup sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Group: JoinIn</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <AccountTieHat sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Leader: Thanh Huy</Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{mt:6}}>
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              Recruitment
            </Typography>
            <Divider sx={{ marginY: '20px' }} />
            <SpaceBetweenText title='Major' content='Quantity'/>
            <Divider sx={{ marginX: '20px' }} />
            <SpaceBetweenText title='Information Technology' content='2'/>
            <SpaceBetweenText title='English' content='1'/>
            <SpaceBetweenText title='Business Administration' content='2'/>
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
                <InformationVariant sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Description</Typography>
              </Box>
              <Typography variant='body1'>{textDemo}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <DialogTitle>Application</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            <Close sx={{color: 'red'}}/>
          </Button>
        </DialogActions>
        </Box>

        <DialogContent>
          <ApplicationForm/>
        </DialogContent>

      </Dialog>
    </Grid>
  )
}

export default GroupView
