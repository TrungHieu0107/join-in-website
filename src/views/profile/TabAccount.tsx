// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup } from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { AccountOutline, AlphaACircleOutline, Calendar, Contacts, EmailOutline, InformationVariant, Phone } from 'mdi-material-ui'

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

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props}
  InputProps={{
    startAdornment: (
      <InputAdornment position='start'>
        <Calendar />
      </InputAdornment>
    )
  }}
  />
})

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [date, setDate] = useState<Date | null | undefined>(null)

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

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='FullName' placeholder='FullName' defaultValue='John Doe'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountOutline />
                </InputAdornment>
              )
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              defaultValue='johnDoe@example.com'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailOutline />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePickerWrapper >
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={(date: Date) => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Major</InputLabel>
              <Select label='Role' defaultValue='IT'>
                <MenuItem value='IT'>Information Technology</MenuItem>
                <MenuItem value='BA'>Business Administration</MenuItem>
                <MenuItem value='EN'>English</MenuItem>
                <MenuItem value='JP'>Japan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' label='Phone' placeholder='(123) 456-7890'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Phone />
                </InputAdornment>
              )
            }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row defaultValue='male' aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
          <TextField
             id="othercontacts"
            label="Other Contacts"
            multiline
            rows={4}
            placeholder='Other Contacts'
            defaultValue="Other Contacts"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Contacts />
                </InputAdornment>
              )
            }}
          />
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

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
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

export default TabAccount
