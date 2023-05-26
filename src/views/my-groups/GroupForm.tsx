// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import { FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup } from '@mui/material'
import { AccountGroup, AccountMultiple, AlphaACircleOutline, Book,  InformationVariant, School, TownHall } from 'mdi-material-ui'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
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

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
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

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' label='Size' placeholder='1' defaultValue='1'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountMultiple />
                </InputAdornment>
              )
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Visibile</FormLabel>
              <RadioGroup row defaultValue='public' aria-label='visibile' name='account-settings-info-radio'>
                <FormControlLabel value='public' label='Public' control={<Radio />} />
                <FormControlLabel value='private' label='Private' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
          <TextField
             id="skills"
            label="Skills"
            multiline
            rows={4}
            placeholder='Your skills'
            defaultValue="Your skills"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AlphaACircleOutline />
                </InputAdornment>
              )
            }}
          />
          </Grid>
          <Grid item xs={12} sm={12}>
          <TextField
             id="description"
            label="Description"
            multiline
            rows={4}
            placeholder='Description'
            defaultValue="Description"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <InformationVariant />
                </InputAdornment>
              )
            }}
          />
          </Grid>

          <Grid item xs={12}>
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
