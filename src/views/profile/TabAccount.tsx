// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, forwardRef, SetStateAction, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { Autocomplete, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup } from '@mui/material'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import {
  AccountOutline,
  AlphaACircleOutline,
  Calendar,
  Contacts,
  EmailOutline,
  InformationVariant,
  Phone,
  Ufo
} from 'mdi-material-ui'
import Editor from '../dialog/editor'
import { Major, User } from 'src/models/class'
import { majorAPI, userAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { useRouter } from 'next/router'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { Message, QueryKeys, StorageKeys } from 'src/constants'
import { UserCompleteProfileModel } from 'src/models/query-models/UserCompleteProfileModel'
import { AxiosError, AxiosResponse } from 'axios'
import { useToasts } from 'react-toast-notifications'
import * as yup from 'yup'
import user from 'src/pages/admin/user'
import { userDBDexie } from 'src/models/db/UserDB'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 150,
  height: 150,
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

const CustomInput = forwardRef((props, ref) => {
  return (
    <TextField
      inputRef={ref}
      label='Birth Date'
      fullWidth
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Calendar />
          </InputAdornment>
        )
      }}
    />
  )
})

interface ObjectValidate {
  value?: any | any[]
  error?: string
}

interface TabAccountProps {
  code?: string
  handleError?: (error: any) => void
}

const TabAccount = (props: TabAccountProps) => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [imgBackgroud, setImgBackground] = useState<string>('/images/cards/background-user.png')
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [selectedMajor, setSelectedMajor] = useState<ObjectValidate>()
  const [description, setDescription] = useState('')
  const [contacts, setContacts] = useState('')
  const [skills, setSkills] = useState('')
  const [majorOptions, setMajorOptions] = useState<Major[]>([])
  const [fullName, setFullName] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [email, setEmail] = useState<ObjectValidate>({
    value: '123@gmail.com'
  })
  const [gender, setGender] = useState<string>()
  const [fileAvatar, setFileAvatar] = useState<FileList>()
  const [fileBackGround, setFileBackGround] = useState<FileList>()
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const router = useRouter()
  const addToast = useToasts()

  useEffect(() => {
    console.log(props)
    fetchData()

  }, [props])

  const fetchData = async () => {
    await userDBDexie.getToken().then(async res => {
      if (res) {
        setIsLogin(true)
        await userAPI
          .getLoginProfile()
          .then(async res => {
            const commonResponse = new CommonResponse(res)
            const data = new User(commonResponse.data)
            await majorAPI.getAllMajorOfUser().then(async majors => {
              const listMajor: Major[] = new CommonResponse(majors).data
              await getAllMajor(listMajor)
            })
            if (commonResponse.status === 200) {
              setFullName(data.fullName)
              setDate(new Date(data.birthDay?.toString() ?? new Date().toString()))
              setImgSrc(data.avatar ?? '')
              setImgBackground(data.theme ?? '')
              setDescription(data.description ?? '')
              setContacts(data.otherContact ?? '')
              setSkills(data.skill ?? '')
              setEmail({ value: data.email } as ObjectValidate)
              setGender(data.gender ? 'male' : 'female')
              setPhone(data.phone ?? '')
            }
          })
          .catch(error => {
            props.handleError && props.handleError(error)
          })
      }
    })
  }

  const emailValidate = yup.object().shape({
    email: yup
      .string()
      .email(Message.INVALID_EMAIL)
      .required(Message.EMAIL_REQUIRED)
      .matches(QueryKeys.EMAIL_REGEX, Message.INVALID_EMAIL)
  })

  const getAllMajor = async (majorsOfUser: Major[]) => {
    await majorAPI
      .getList()
      .then(res => {
        console.log(res)
        const data = new CommonResponse(res).data as Major[]
        const list: Major[] = []
        majorsOfUser.map(item => {
          const tmp = data.filter(val => val.id === item.id).at(0)
          tmp && list.push(tmp)
        })
        console.log(majorsOfUser, '2123', list)

        setSelectedMajor({
          value: list
        } as ObjectValidate)
        setMajorOptions(data)

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

  const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    addToast.addToast(message, { appearance: type })
  }

  const onChangeAvatar = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
      setFileAvatar(files)
    }
  }

  const onChangeBackground = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgBackground(reader.result as string)

      reader.readAsDataURL(files[0])

      setFileBackGround(files)
    }
  }

  const onSaveProfile = async () => {
    let isError = false
    if (!router.pathname.includes('initialization')) {
      await emailValidate
        .validate({ email: email?.value ?? '' })
        .then(() => {
          const object = {
            value: email?.value ?? ('' as string),
            error: ''
          } as ObjectValidate
          setEmail(object)
        })
        .catch(err => {
          isError = true
          const object = {
            value: email?.value ?? ('' as string),
            error: err.errors
          } as ObjectValidate
          setEmail(object)
        })
    }

    if ((selectedMajor?.value as any[])?.length === 0) {
      isError = true
      const object = {
        value: selectedMajor?.value,
        error: 'Choose at least 1 major'
      } as ObjectValidate
      setSelectedMajor(object)
    } else {
      const object = {
        value: selectedMajor?.value,
        error: ''
      } as ObjectValidate
      setSelectedMajor(object)
    }

    if (isError) {
      return
    }

    await userAPI
      .uploadImage(fileAvatar ? fileAvatar[0] : undefined)
      .then(async res => {
        let urlAvatar = ''
        if (typeof res !== 'boolean') {
          urlAvatar = new CommonResponse(res as AxiosResponse).data
        } else {
          urlAvatar = imgSrc
        }
        console.log('url avatar ', urlAvatar)

        await userAPI
          .uploadImage(fileBackGround ? fileBackGround[0] : undefined)
          .then(async resfileBackGround => {
            let urlBackground = ''
            if (typeof resfileBackGround !== 'boolean') {
              urlBackground = new CommonResponse(res as AxiosResponse).data
            } else {
              urlBackground = imgBackgroud
            }
            console.log('url urlBackground ', urlBackground)
            const payload = new UserCompleteProfileModel({
              avatar: urlAvatar,
              birthDay: moment(date?.toString()).format(StorageKeys.KEY_FORMAT_DATE),
              description: description,
              fullName: fullName,
              gender: gender === 'male',
              majorIdList: (selectedMajor?.value as Major[]).map(item => item.id ?? ''),
              skill: skills,
              otherContact: contacts,
              phoneNumber: phone,
              theme: urlBackground
            })

            console.log(payload)
            await submitProfile(payload).catch(error => {
              if ((error as AxiosError)?.response?.status === 401) {
                notify('Login expired.', 'error')
                router.push('/user/login')
              } else {
                console.log(error)
              }
            })
          })
          .catch(error => {
            if ((error as AxiosError)?.response?.status === 401) {
              notify('Login expired.', 'error')
              router.push('/user/login')
            } else {
              console.log(error)
            }
          })
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

  const submitProfile = (payload: UserCompleteProfileModel) => {
    if (isLogin) {
      return userAPI.put(payload).then(async rescompleteProfile => {
        const data = new CommonResponse(rescompleteProfile)
        notify(data.message ?? '', 'success')
      })
    } else {
      return userAPI.completeProfile(payload, props.code ?? '').then(async rescompleteProfile => {
        const token: string = new CommonResponse(rescompleteProfile).data
        if (await userDBDexie.saveToken(token)) {
          router.push('/my-groups')
        }
      })
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Avatar
                  <input
                    hidden
                    type='file'
                    onChange={onChangeAvatar}
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
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <ImgBackgroundStyled src={imgBackgroud} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-background'>
                  Upload New Background
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

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='FullName *'
              value={fullName}
              placeholder='FullName'
              defaultValue='John Doe'
              onChange={e => setFullName(e.target.value)}
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
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='YYYY-MM-DD'
                customInput={<CustomInput />}
                onChange={(date: Date) => setDate(date)}
                dateFormat={'yyyy-MM-dd'}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              value={majorOptions.filter(
                option => !selectedMajor?.value || (selectedMajor?.value as Major[])?.indexOf(option) !== -1
              )}
              options={majorOptions.filter(
                option => !selectedMajor?.value || (selectedMajor?.value as Major[])?.indexOf(option) === -1
              )}
              getOptionLabel={option => `${option.shortName} - ${option.name ?? 'No name'}`}
              onChange={(event, value) =>
                setSelectedMajor({
                  value: value,
                  error: ''
                })
              }
              renderInput={params => <TextField {...params} label='Major *' variant='outlined' />}
            />
            {(selectedMajor?.error ?? '')?.length > 0 && (
              <FormHelperText error id='error'>
                {selectedMajor?.error}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Phone'
              placeholder='(123) 456-7890'
              onChange={e => setPhone(e.target.value)}
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
              <RadioGroup
                row
                defaultValue='male'
                aria-label='gender'
                name='account-settings-info-radio'
                onChange={e => {
                  setGender('male')
                }}
                value={gender}
              >
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Contacts sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Other Contacts</Typography>
            </Box>
            <Editor
              name='contacts'
              value={contacts}
              onChange={(dataChange: SetStateAction<string>) => {
                setContacts(dataChange.toString())
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <AlphaACircleOutline sx={{ marginRight: 1 }} />
              <Typography variant='body1'>Your skills</Typography>
            </Box>
            <Editor
              name='skills'
              value={skills}
              onChange={(dataChange: SetStateAction<string>) => {
                setSkills(dataChange.toString())
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
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={onSaveProfile}>
              Save Changes
            </Button>
            {!router.pathname.includes('initialization') ? (
              <Button type='reset' variant='outlined' color='secondary'>
                Reset
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
