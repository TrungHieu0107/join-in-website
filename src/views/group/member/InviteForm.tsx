// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import { Autocomplete } from '@mui/material'
import { groupDBDexie } from 'src/models/db/GroupDB'
import { ApplicationRequest } from 'src/models/query-models/ApplicationRequest'
import { applicationAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { useToasts } from 'react-toast-notifications'

interface Option {
  id: string
  label: string
  image: string
  name: string
  major: string
}

const options: Option[] = [
  {
    id: '32149839-d6f9-ed11-ad61-105bad532efe',
    label: 'Xuan Kien',
    image: '/images/avatars/1.png',
    name: 'Xuan Kien',
    major: 'Information Technology'
  },
  {
    id: '59d64d8b-c6cb-4397-9a1f-126352188244',
    label: 'Quoc Bao',
    image: '/images/avatars/1.png',
    name: 'Quoc Bao',
    major: 'Information Technology'
  },
  {
    id: '62e8c998-0c19-40b8-8a89-5be21f88ffb7',
    label: 'Trung Hieu',
    image: '/images/avatars/1.png',
    name: 'Trung Hieu',
    major: 'Information Technology'
  }
]

const InviteForm = () => {
  // ** State
  const [selectedValues, setSelectedValues] = useState<Option[]>([])
  const addToast = useToasts()

  const handleInvite= async () => {
    console.log('Selected Values:', selectedValues)
    try {
      const groupData = await groupDBDexie.getGroup()
      const listUser = selectedValues.map(item => item.id);

      const application: ApplicationRequest = {
        Description: 'hello',
        GroupId: groupData?.id,
        UserIds: listUser
      }

      await applicationAPI
        .postApplication(application)
        .then(async res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })
        })
        .catch(error => {
          console.log('Invite Form: ', error)
        })

    } catch(err){
      console.log(err);
    }
  }

  return (
    <CardContent sx={{ width: '500px' }}>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={option => option.label}
        onChange={(event, value) => setSelectedValues(value)}
        renderInput={params => <TextField {...params} label='Email' variant='outlined' />}
        renderOption={(props, option) => (
          <li {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={option.image} alt={option.name} style={{ marginRight: 10, width: 30, height: 30 }} />
              <div>
                <p>{option.name}</p>
                <p>{option.major}</p>
              </div>
            </div>
          </li>
        )}
      />
      <Button variant='contained' sx={{ mt: 5 }} onClick={handleInvite}>
        Send
      </Button>
    </CardContent>
  )
}

export default InviteForm
