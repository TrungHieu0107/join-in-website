import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { applicationAPI, groupAPI } from 'src/api-client'
import { ApplicationMajor, Group, GroupMajor, User } from 'src/models/class'
import GroupDetail from 'src/views/group/group-detail/GroupDetial'

import { Button } from '@mui/material'
import withAuth from 'src/pages/withAuth'
import { CommonResponse } from 'src/models/common/CommonResponse'

interface ApplicationInfo {
  id: string
  createdDate: string
  status: number
  confirmedDate: string
  description: string
  userId: string
  groupId: string
  user: User
  group: Group
  applicationMajors: ApplicationMajor
}

interface GroupData {
  groupName?: string
  schoolName?: string
  className?: string
  subject?: string
  leader?: string
  skills?: string
  description?: string
  imgSrc?: string
  imgBackgroud?: string
  listRecruiting?: GroupMajor[]
}

const InviteInfomationPage = () => {
  const [values, setValues] = useState<GroupData>({
    groupName: '',
    schoolName: '',
    className: '',
    subject: '',
    leader: '',
    skills: '',
    description: '',
    imgSrc: '/images/avatars/1.png',
    imgBackgroud: '/images/cards/background-user.png',
    listRecruiting: []
  })
  const addToast = useToasts()
  const router = useRouter()
  const query = router.query

  useEffect(() => {
    getApplication()
  }, [query])

  const getApplication = async () => {
    const applicationId = router.query.applicationId?.toString()
    if (!applicationId) return

    await applicationAPI
      .getInviteApplication(applicationId)
      .then(async application => {
        const applicationRes = new CommonResponse(application).data as ApplicationInfo
        console.log(applicationRes)

        await groupAPI
          .getById(applicationRes.groupId)
          .then(res => {
            const data = new CommonResponse(res)

            const group: Group = data.data

            setValues({
              groupName: group.name ?? '',
              schoolName: group.schoolName ?? '',
              className: group.className ?? '',
              subject: group.subjectName ?? '',
              leader: group.members?.at(0)?.user?.fullName,
              skills: group.skill,
              description: group.description,
              imgBackgroud: group.theme,
              imgSrc: group.avatar
            })
          })
          .catch(err => {
            // handleError(err)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <GroupDetail
      values={values}
      description={values.description ?? ''}
      imgBackground={values.imgBackgroud ?? ''}
      imgSrc={values.imgSrc ?? ''}
      skills={values.skills ?? ''}
      listRecruiting={values.listRecruiting ?? []}
      actionGroup={
        <Button variant='contained' sx={{ marginRight: 5 }} onClick={() => {}}>
          Apply
        </Button>
      }
    />
  )
}

export default withAuth(InviteInfomationPage)
