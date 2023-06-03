// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Button, ButtonGroup } from '@mui/material'
import { useRouter } from 'next/router'

const CardGroup = () => {

  const router = useRouter()

  const handleClickOpen = () => {
    //handle Click Open View Group
    router.push('/view-group')
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/glass-house.png' />
      <Avatar
        alt='Group Image'
        src='/images/logoapp.png'
        sx={{
          width: 75,
          height: 75,
          left: '1.313rem',
          top: '10.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 3,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'start',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>JoinIn Group</Typography>
            <Typography variant='caption'>
              Subject: <b>EXE201</b>
            </Typography>
            <Typography variant='caption'>
              Class: <b>EXE201_1</b>{' '}
            </Typography>
            <Typography variant='caption'>
              School: <b>FPTU</b>{' '}
            </Typography>
          </Box>
          <Button variant='contained' onClick={handleClickOpen}>Open</Button>
        </Box>

        <ButtonGroup variant='text' aria-label='text button group' size='small'>
          <Typography variant='body1'>Recruit: </Typography>
          <Button>IT</Button>
          <Button>BA</Button>
          <Button>EN</Button>
        </ButtonGroup>

        <Box sx={{mt: 3, gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            8 members
          </Typography>
          <AvatarGroup max={4}>
            <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
            <Avatar src='/images/avatars/7.png' alt='Jeffery Warner' />
            <Avatar src='/images/avatars/3.png' alt='Howard Lloyd' />
            <Avatar src='/images/avatars/2.png' alt='Bettie Dunn' />
            <Avatar src='/images/avatars/4.png' alt='Olivia Sparks' />
            <Avatar src='/images/avatars/5.png' alt='Jimmy Hanson' />
            <Avatar src='/images/avatars/6.png' alt='Hallie Richards' />
            <Avatar src='/images/avatars/1.png' alt='Hallie Richards' />
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardGroup
