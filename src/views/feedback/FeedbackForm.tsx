// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import {  Avatar, Rating } from '@mui/material'
import {  InformationVariant, Star } from 'mdi-material-ui'
import Editor from '../dialog/editor'
import React, { SetStateAction, useEffect, useState } from 'react'
import { feedbackAPI, userAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { User } from 'src/models'
import { FeedbackRequest } from 'src/models/query-models/FeedbackRequest'
import {  groupDBDexie } from 'src/models/db/GroupDB'
import { useToasts } from 'react-toast-notifications'


const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
}

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

const FeedbackForm = () => {
  // ** State
  const id = '';
  const imgSrc = '/images/avatars/1.png'
  const [valueRating, setValueRating] = useState<number |null>(2)
  const [hover, setHover] = useState(-1)
  const [content, setContent] = useState<string>('')
  const [user, setUser] = useState<User>();

  const addToast = useToasts();

  useEffect(()=>{
    //getProfile();
  })



  const getProfile = async () =>{
    await userAPI.getById(id)
    .then(res => {
      const data = new CommonResponse(res);
      const user : User = data.data
      setUser(user);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleSubmit = async () =>{
    try {
      const groupData = await groupDBDexie.getGroup()
      const feedbackRequest : FeedbackRequest =
      {
        FeedbackedForId: user?.Id,
        GroupId: groupData?.id,
        Content: content,
        Rating: valueRating
      }
      await feedbackAPI.post(feedbackRequest)
      .then(res => {
        const data = new CommonResponse(res);
        addToast.addToast(data.message, {appearance:'success'})
      })

    } catch (err){
      console.log(err)
    }
  }

  const handleReset = () =>{
    setValueRating(0.5);
    setContent('');
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Avatar src={user?.Avatar} alt='Profile Pic'  sx={{ width: 120, height: 120 }}/>
              <Typography variant='h5'>{user?.FullName}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Star sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Rating</Typography>
            </Box>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Rating
                name='hover-feedback'
                value={valueRating}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValueRating(newValue)
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover)
                }}
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize='inherit' />}
              />
              {valueRating !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : valueRating]}</Box>}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <InformationVariant sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Content</Typography>
            </Box>
            <Editor name='description' value={content}
            onChange={(dataChange: SetStateAction<string>) => {
              setContent(dataChange.toString())
            }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
              Submit
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default FeedbackForm
