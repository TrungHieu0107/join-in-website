// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import { Box, InputAdornment, Typography } from '@mui/material'
import { Pen, InformationVariant } from 'mdi-material-ui'
import { Milestone } from 'src/models'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import Editor from 'src/views/dialog/editor'
import { milestoneAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { useToasts } from 'react-toast-notifications'
import { groupDBDexie } from 'src/models/db/GroupDB'

const MilestoneForm = (props: { milestone?: Milestone; status: string }) => {
  // ** State
  const [name, setName] = useState<string>(props.milestone?.Name ?? '')
  const [description, setDescription] = useState<string>(props.milestone?.Description ?? '')

  const addToast = useToasts();
  useEffect(()=>{
    fillText();
  })

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) =>{
    setName(event.target.value);
  }

  const fillText = () => {
    setName(props.milestone?.Name ?? '');
    setDescription(props.milestone?.Description ?? '');
  }

  const handleReset = () => {
    setName('');
    setDescription('');
  }

  const handleDelete =async () => {
    // call api
    await milestoneAPI.delete(props.milestone?.Id ?? '')
    .then(res =>{
      const data = new CommonResponse(res);
      addToast.addToast(data.message, {appearance:'success'})
    })
    .catch(err => console.log(err))
  }

  const handleCreate = async () => {
    // call api
    const groupdata = await groupDBDexie.getGroup();
    if (props.status ==='Create'){

      // Create New Milestone
      const milestone : Milestone ={
        Name: name,
        Description: description,
        GroupId: groupdata?.id
      }

      await milestoneAPI.post(milestone)
      .then(res =>{
        const data = new CommonResponse(res);
        addToast.addToast(data.message, {appearance:'success'})
      })
      .catch(err => console.log(err))
    } else{

      // Update Milestone
      const milestone : Milestone ={
        Name: name,
        Description: description,
        Id: props.milestone?.Id
      }

      await milestoneAPI.put(milestone)
      .then(res =>{
        const data = new CommonResponse(res);
        addToast.addToast(data.message, {appearance:'success'})
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Title'
              placeholder='Title'
              value={name}
              onChange={onChangeName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Pen />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <InformationVariant sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Description</Typography>
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
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleCreate}>
              {props.status === 'Create' ? 'Create' : 'Update'}
            </Button>
            <Button type='reset' variant='outlined' color='secondary' sx={{ marginRight: 3.5 }} onClick={handleReset}>
              Reset
            </Button>
            <Button variant='outlined' color='error' disabled = {props.status === 'Create'} onClick={handleDelete} >
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default MilestoneForm
