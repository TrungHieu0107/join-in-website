// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import * as yup from 'yup'
import { Message, QueryKeys } from 'src/constants'
import { authAPI } from 'src/api-client'
import { User } from 'src/models'
import MyLogo from 'src/layouts/components/MyLogo'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { userDBDexie } from 'src/models/db/UserDB'

interface State {
  email: string
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false
  })
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const emailValidate = yup.object().shape({
    email: yup
      .string()
      .email(Message.INVALID_EMAIL)
      .required(Message.EMAIL_REQUIRED)
      .matches(QueryKeys.EMAIL_REGEX, Message.INVALID_EMAIL)
  })

  const passwordValidate = yup.object().shape({
    password: yup
      .string()
      .min(8, Message.PASSWORD_LENGTH)
      .max(30, Message.PASSWORD_LENGTH)
      .required(Message.PASSWORD_REQUIRED)
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async () => {
    let isError = false
    console.log('email: ', values.email, 'password: ', values.password)
    await emailValidate
      .validate({ email: values.email })
      .then(() => {
        setEmailError('')
      })
      .catch(err => {
        isError = true
        setEmailError(err.errors)
      })

    await passwordValidate
      .validate({ password: values.password })
      .then(() => {
        setPasswordError('')
      })
      .catch(err => {
        isError = true
        setPasswordError(err.errors)
      })
    if (isError) {
      return
    }
    const user = { userName: values.email, password: values.password } as User

    try {
      await authAPI
        .login(user)
        .then(async res => {
          console.log('user', new CommonResponse(res))
          const token: string = new CommonResponse(res).data
          console.log('123',await userDBDexie.saveToken(token))
          console.log('token ', userDBDexie.getToken())
        })
        .catch(error => console.log('authAPI', error))
    } catch (error) {
      console.log('login page', error)
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MyLogo width='50' height='50' />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <FormControl fullWidth margin='dense'>
              <InputLabel htmlFor='auth-login-email'>Email</InputLabel>
              <OutlinedInput
                error={emailError.length > 0}
                label='Email'
                value={values.email}
                id='auth-login-email'
                onChange={handleChange('email')}
                type='email'
                required={true}
              />
              {emailError.length > 0 && (
                <FormHelperText error id='password-error'>
                  {emailError}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth margin='dense'>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                error={passwordError.length > 0}
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {passwordError.length > 0 && (
                <FormHelperText error id='password-error'>
                  {passwordError}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={handleSubmit}>
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/user/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box> */}
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }}>
              <Google sx={{ color: '#FFFFFF', marginRight: '10px' }} />
              <Typography fontWeight='bold' color='#FFFFFF'>
                Login with Google
              </Typography>
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
