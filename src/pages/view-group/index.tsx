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
import { useEffect, useState } from 'react'
import withAuth from '../withAuth'
import { Group, GroupMajor } from 'src/models/class'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { groupDBDexie } from 'src/models/db/GroupDB'
import { groupAPI } from 'src/api-client'



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

  interface State {
    groupName?: string
    schoolName?: string
    className?: string
    subject?: string
    leader?: string
  }

const GroupView = () => {

  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [imgBackgroud, setImgBackground] = useState<string>('/images/cards/background-user.png')
  const [values, setValues] = useState<State>({
    groupName: '',
    schoolName: '',
    className: '',
    subject: '',
    leader: ''
  })
  const [skills, setSkills] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [listRecruiting, setListRecruiting] = useState<GroupMajor[]>([])


  useEffect(() =>{
    getInformation();
    getListRecruiting();
  },[])

  const getListRecruiting = async () =>{
    try {
      await groupAPI.getListRecruiting()
      .then(res => {
        const data = new CommonResponse(res);
        const list : GroupMajor[] = data.data;
        setListRecruiting(list)
      })
    } catch (err){
      console.log(err)
    }
  }

  const getInformation = async () =>{
    try {
      const groupData = await groupDBDexie.getGroup()
      await groupAPI.getById(groupData?.id)
      .then(res =>{
        const data = new CommonResponse(res);

        const group : Group = data.data

        setValues({
          groupName: group.name,
          schoolName: group.schoolName,
          className: group.className,
          subject: group.subjectName,
          leader: group.members?.at(0)?.user?.fullName
        });
        setSkills(group.skill ?? '');
        setDescription(group.description ?? '');
        setImgBackground(group.theme ?? '/images/cards/background-user.png')
        setImgSrc(group.avatar ?? '/images/avatars/1.png')
      })
      .catch(err =>{
        console.log(err)
      })
    } catch(err){
      console.log(err);
    }
  }

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
          <CardMedia sx={{ height: '15rem' }} image={imgBackgroud} />
          <Avatar
            alt={values.schoolName}
            src={imgSrc}
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
                <Typography variant='h5'>Group {values.groupName}</Typography>
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
            <Typography align='center' variant='h6'> Group {values.groupName} has sent you an invitation to join the group.<br/> Would you like to join with them? </Typography>
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
              <Typography variant='body1'>School: {values.schoolName}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <School sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Class: {values.className}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Book sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Subject: {values.subject}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <AccountGroup sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Group: {values.groupName}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <AccountTieHat sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body1'>Leader: {values.leader}</Typography>
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
            {listRecruiting.map(recruiting =>(
              <SpaceBetweenText title={recruiting.major?.name ?? ''} content={recruiting.memberCount?.toString() ?? '0'} key={recruiting.majorId}/>
            ))}
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

              <Typography variant='body1'><div className='editor' dangerouslySetInnerHTML={{ __html: skills }}/></Typography>
            </Box>
            <Divider sx={{ marginY: '20px' }} />
            <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <InformationVariant sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>Description</Typography>
              </Box>
              <Typography variant='body1'><div className='editor' dangerouslySetInnerHTML={{ __html: description }}/></Typography>
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
          <ApplicationForm onButtonClick={handleClose}/>
        </DialogContent>

      </Dialog>
    </Grid>
  )
}

export default withAuth(GroupView)
