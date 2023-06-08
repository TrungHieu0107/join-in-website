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
import { Group, GroupMajor } from 'src/models/class'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { groupDBDexie } from 'src/models/db/GroupDB'
import { groupAPI } from 'src/api-client'
import GroupDetail from 'src/views/group/group-detail/GroupDetial'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import withAuth from '../withAuth'

interface State {
  groupName?: string
  schoolName?: string
  className?: string
  subject?: string
  leader?: string
}

const GroupView = () => {
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
  const addToast = useToasts()
  const router = useRouter()
  const query = router.query

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    addToast.addToast(message, { appearance: type })
  }

  useEffect(() => {
    getInformation()
    getListRecruiting()
  }, [query])

  const getListRecruiting = async () => {
    try {
      await groupAPI
        .getListRecruiting()
        .then(res => {
          const data = new CommonResponse(res)
          const list: GroupMajor[] = data.data
          setListRecruiting(list)
        })
        .catch(err => {
          handleError(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const getInformation = async () => {
    try {
      if (!query.groupId) {
        router.push('/finding-groups')

        return
      }

      await groupAPI
        .getById(query.groupId as string)
        .then(res => {
          const data = new CommonResponse(res)

          const group: Group = data.data

          setValues({
            groupName: group.name,
            schoolName: group.schoolName,
            className: group.className,
            subject: group.subjectName,
            leader: group.members?.at(0)?.user?.fullName
          })
          setSkills(group.skill ?? '')
          setDescription(group.description ?? '')
          setImgBackground(group.theme ?? '/images/cards/background-user.png')
          setImgSrc(group.avatar ?? '/images/avatars/1.png')
        })
        .catch(err => {
          handleError(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const handleError = (error: any) => {
    const dataErr = (error as AxiosError)?.response
    if (dataErr?.status === 401) {
      notify('Login expired.', 'error')
      router.push('/user/login')
    } else if (dataErr?.status === 500) {
      if (error?.response?.data?.message) notify(error?.response?.data?.message, 'error')
      else notify('Something error', 'error')
    } else {
      console.log(error)
    }
  }

  return (
    <GroupDetail
      values={values}
      description={description}
      imgBackground={imgBackgroud}
      imgSrc={imgSrc}
      skills={skills}
      listRecruiting={listRecruiting}
      actionGroup={
        <Button variant='contained' sx={{ marginRight: 5 }} onClick={() => {}}>
          Apply
        </Button>
      }
    />
  )
}

export default withAuth(GroupView)

{
  /* <Card>
            <CardContent>
              <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
                Invitation
              </Typography>
              <Divider sx={{ marginY: '20px' }} />
              <Typography align='center' variant='h6'>
                {' '}
                Group {values.groupName} has sent you an invitation to join the group.
                <br /> Would you like to join with them?{' '}
              </Typography>
              <Box sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }}>
                <Button variant='outlined' size='small' color='error' sx={{ marginRight: 5 }}>
                  Reject
                </Button>
                <Button variant='contained' size='small' color='success'>
                  Accept
                </Button>
              </Box>
            </CardContent>
          </Card> */
}

// ;<Button variant='contained' sx={{ marginRight: 5 }} onClick={handleClickOpen}>
//   Apply
// </Button>

// ;<Dialog open={open} onClose={handleClose}>
//   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//     <DialogTitle>Application</DialogTitle>
//     <DialogActions>
//       <Button onClick={handleClose}>
//         <Close sx={{ color: 'red' }} />
//       </Button>
//     </DialogActions>
//   </Box>

//   <DialogContent>
//     <ApplicationForm onButtonClick={handleClose} />
//   </DialogContent>
// </Dialog>
