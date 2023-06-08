import { useEffect, useState } from 'react'
import { Member, Task } from 'src/models/class'
import { Autocomplete, Avatar, Box, Chip, CircularProgress, TextField, Typography } from '@mui/material'
import { memberAPI, taskAPI } from 'src/api-client'
import { useRouter } from 'next/router'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { AxiosError } from 'axios'
import { useToasts } from 'react-toast-notifications'

export interface IAssignViewProps {
  data: Task
}

export default function AssignView(props: IAssignViewProps) {
  const [listMember, setListMember] = useState<Member[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const addToast = useToasts()
  const [selectedMember, setSelectedMember] = useState<Member[]>([])

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    addToast.addToast(message, { appearance: type })
  }

  useEffect(() => {
    if (props.data.group?.id) {
      fetchUsers()
    }
  }, [props])

  const fetchUsers = async () => {
    setLoading(true)
    await memberAPI
      .getAllMember(props.data.group?.id ?? '')
      .then(res => {
        const list: Member[] = new CommonResponse(res).data
        console.log(list)

        const listAssign: Member[] = []
        for (let index = 0; index < list.length; index++) {
          const element = list[index]
          props.data.assignedFor?.map(item => {
            if (item.id === element.user?.id) {
              listAssign.push(element)
            }
          })
        }

        console.log('listAssign', props.data.assignedFor, listAssign)

        setSelectedMember(listAssign)
        setListMember(list)
        setLoading(false)
      })
      .catch(error => {
        if ((error as AxiosError)?.response?.status === 401) {
          notify('Login expired.', 'error')
          router.push('/user/login')
        } else {
          console.log(error)
        }
      })
  }

  return (
    <div>
      <Autocomplete
        multiple
        disabled={loading}
        value={selectedMember}
        onChange={async (event, newValue) => {
          setLoading(true)
          const oldValue = selectedMember
          setSelectedMember(newValue)
          const data = newValue?.map(item => item.id)

          await taskAPI
            .assignTask({
              taskId: props.data.id,
              assignedForIds: data
            })
            .then(res => {
              console.log(res)
              setTimeout(() => {
                setLoading(false)
              }, 1000)
            })
            .catch(error => {
              setTimeout(() => {
                setLoading(false)
                setSelectedMember(oldValue)
              }, 1000)

              if ((error as AxiosError)?.response?.status === 401) {
                notify('Login expired.', 'error')
                router.push('/user/login')
              } else if ((error as AxiosError)?.response?.status === 500) {
                const commonResposne = new CommonResponse((error as AxiosError)?.response?.data as CommonResponse)
                notify(commonResposne.message ?? 'Something error', 'error')
              } else {
                console.log(error)

                notify('Something error', 'error')
              }
            })
        }}
        options={listMember.filter(item => selectedMember.indexOf(item) === -1)}
        getOptionLabel={option => (option?.user?.fullName ? option?.user.fullName : 'Không tên')}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <div key={index}>
              <Chip
                avatar={<Avatar alt='Natacha' src={option?.user?.avatar} sizes='medium' />}
                label={option?.user?.fullName}
                {...getTagProps({ index })}
                variant='outlined'
                sx={{
                  m: 1
                }}
                disabled={false}
              />
            </div>
          ))
        }
        renderOption={(props, option) => (
          <Box component='li' {...props}>
            <Avatar alt={option?.user?.fullName} src={option?.user?.avatar} sizes='small' />
            <Typography ml={2}>{option?.user?.fullName}</Typography>
          </Box>
        )}
        style={{ width: 'auto' }}
        renderInput={params => (
          <>
            <TextField {...params} placeholder='Assignee' size='medium' disabled={loading} />
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px'
                }}
                color='info'
              />
            )}
          </>
        )}
        sx={{ position: 'relative' }}
      />
    </div>
  )
}
