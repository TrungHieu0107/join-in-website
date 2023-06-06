// ** MUI Imports
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  CardContent,
  Divider,
  Box,
  Typography,
  SelectChangeEvent
} from '@mui/material'
import { InformationVariant } from 'mdi-material-ui'
import { SetStateAction, useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { applicationAPI, groupAPI, majorAPI } from 'src/api-client'
import { GroupMajor, Major } from 'src/models/class'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { groupDBDexie } from 'src/models/db/GroupDB'
import { ApplicationRequest } from 'src/models/query-models/ApplicationRequest'
import Editor from 'src/views/dialog/editor'

// ** Icons Imports



const ApplicationForm = () => {
  // ** State
  const [description, setDescription] = useState<string>('')
  const [selectedValue, setSelectedValue] = useState('')
  const [listMajors, setListMajors] = useState<Major[]>([])
  const [listRecruiting, setListRecruiting] = useState<GroupMajor[]>([])

  const addToast = useToasts()

  useEffect(() => {
    getListMajors()
    getListRecruiting()
  }, [])

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

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value)
  }

  const handleClickSend = async () => {
    await sendApplication()

    // close form (optional)
  }

  const sendApplication = async () => {
    try {
      // use for test, can delete
      // const data : any = {
      //   id: '0dfb1947-defb-ed11-9eff-c809a8bfd17e',
      // }
      // await groupDBDexie.saveGroup(data);

      const groupData = await groupDBDexie.getGroup()

      const application: ApplicationRequest = {
        Description: description,
        GroupId: groupData?.id,
        MajorIds: [selectedValue]
      }

      await applicationAPI
        .postApplication(application)
        .then(async res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })
        })
        .catch(error => {
          console.log('Application Form: ', error)
        })
    } catch (e) {
      console.log('Application Form: ', e)
    }
  }

  const getListMajors = async () => {
    try {
      await majorAPI
        .getList()
        .then(res => {
          const data = new CommonResponse(res)
          const majors: Major[] = data.data
          setListMajors(majors)
        })
        .catch(error => {
          console.log(error);
        })
    } catch (err) {
      addToast.addToast(err, { appearance: 'error' })
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Major</InputLabel>
              <Select label='Role' value={selectedValue} onChange={handleChange}>
                {listMajors.map(item => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <InformationVariant fontSize='small' sx={{ marginRight: 1 }} />
              <Typography variant='body2'>Description</Typography>
            </Box>
            <Editor
              name='description'
              value={description}
              onChange={(dataChange: SetStateAction<string>) => {
                setDescription(dataChange.toString())
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleClickSend}>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ m: '20px' }}>Recruiting</Divider>
      {listRecruiting.map((item: GroupMajor , index: number) => {
        return (
          <Box
            key={item.majorId}
            sx={{ display: 'flex', alignItems: 'center', mb: index !== listRecruiting.length - 1 ? 6 : 0 }}
          >
            <Box
              sx={{
                ml: 4,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>{item.major?.name}</Typography>
              </Box>
              <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 600, color: 'success.main', mr: 5 }}>
                  {item.memberCount}
                </Typography>
              </Box>
            </Box>
          </Box>
        )
      })}
    </CardContent>
  )
}

export default ApplicationForm
