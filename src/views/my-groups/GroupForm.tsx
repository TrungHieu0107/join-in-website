// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import {  Divider, InputAdornment } from '@mui/material'
import { AccountGroup, AlphaACircleOutline, Book,  InformationVariant, School, TownHall } from 'mdi-material-ui'
import Editor from '../dialog/editor'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ImgBackgroundStyled = styled('img')(({ theme }) => ({
  width: '100%',
  height: 200,
  marginRight: theme.spacing(6.25),
  marginBottom: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))


const GroupForm  = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [imgBackgroud, setImgBackground] = useState<string>('/images/cards/background-user.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const onChangeBackground = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgBackground(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>


          <Grid item xs={12} >
            <TextField fullWidth label='Group Name' placeholder='Group Name'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountGroup />
                </InputAdornment>
              )
            }}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              fullWidth
              label='School Name'
              placeholder='School Name'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <TownHall />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              fullWidth
              label='Class Name'
              placeholder='Class Name'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <School  />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              fullWidth
              label='Subject'
              placeholder='Subject'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Book />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' label='Size' placeholder='1' defaultValue='1'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountMultiple />
                </InputAdornment>
              )
            }}
            />
          </Grid> */}

          <Grid item xs={12} sm={12}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <AlphaACircleOutline sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Skills</Typography>
            </Box>
            <Editor name='skill' onChange={undefined} value={undefined} />
          </Grid>
          <Grid item xs={12} sm={12}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <InformationVariant sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Description</Typography>
            </Box>
            <Editor name='description' onChange={undefined} value={undefined} />
          </Grid>

          <Grid item xs={12}  sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Logo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}  sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <ImgBackgroundStyled src={imgBackgroud} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-background'>
                  Upload Background
                  <input
                    hidden
                    type='file'
                    onChange={onChangeBackground}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-background'
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color='error'
                  variant='outlined'
                  onClick={() => setImgBackground('/images/cards/background-user.png')}
                >
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
          <Divider sx={{mb: 7}}/>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Create
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default GroupForm
