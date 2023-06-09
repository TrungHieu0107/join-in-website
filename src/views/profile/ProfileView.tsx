// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
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
import { ReactNode, useEffect, useState } from 'react'
import { User } from 'src/models/class'
import { userAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import moment from 'moment'
import { StorageKeys } from 'src/constants'

interface ProfileViewProps {
  handleError: (error: any) => void
  userId?: string
  actionProfile?: ReactNode
}

const ProfileView = ({ handleError, userId, actionProfile }: ProfileViewProps) => {
  const [data, setData] = useState<User>(new User())

  useEffect(() => {
    fetchData()

    console.log(userId)
  }, [userId])

  const fetchData = async () => {
    await userAPI
      .getProfile(userId)
      .then(async res => {
        const commonResponse = new CommonResponse(res)
        const user = new User(commonResponse.data)

        // if (commonResponse.status === 200) {
        //   await majorAPI.getAllMajorOfUser().then(majors => {
        //     const commonMajorsResponse = new CommonResponse(majors)
        //     user.majors = commonMajorsResponse.data
        //     setData(user)
        //   })
        // }
        setData(user)
      })
      .catch(error => {
        handleError(error)
      })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ position: 'relative', height: '21rem' }}>
          <CardMedia
            sx={{ height: '15rem' }}
            image={data.theme && data.theme.length !== 0 ? data.theme : '/images/cards/background-user.png'}
          />
          <Avatar
            alt={data.fullName}
            src={data.avatar?.length !== 0 ? data.avatar : '/images/avatars/1.png'}
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
                  <Typography variant='h5'>{data.fullName}</Typography>
                  <Rating readOnly value={1} name='read-only' sx={{ marginRight: 2 }} />
                </Box>
                <Box sx={{ mr: 2, mb: 1, display: 'flex' }}>{actionProfile && actionProfile}</Box>
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
              <Typography variant='body1'>{data.fullName}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <GenderMaleFemale sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>{data.gender ? 'Male' : 'Female'}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>{data.phone ?? '+84'}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <EmailOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>{data.email}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Book sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>
                <ul>
                  {data.majors?.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Calendar sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>{moment(data.birthDay).format(StorageKeys.KEY_FORMAT_DATE)}</Typography>
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

              <Typography variant='body1'>
                <div dangerouslySetInnerHTML={{ __html: data.skill ?? '' }}></div>
              </Typography>
            </Box>
            <Divider sx={{ marginY: '20px' }} />
            <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Contacts sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Other Contacts</Typography>
              </Box>
              <Typography variant='body1'>
                <div dangerouslySetInnerHTML={{ __html: data.otherContact ?? '' }}></div>
              </Typography>
            </Box>
            <Divider sx={{ marginY: '20px' }} />
            <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <InformationVariant sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Description</Typography>
              </Box>
              <Typography variant='body1'>
                <div dangerouslySetInnerHTML={{ __html: data.description ?? '' }}></div>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfileView
