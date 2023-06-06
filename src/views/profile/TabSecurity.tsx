// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { TextField } from '@mui/material'
import { ShieldCheck } from 'mdi-material-ui'
import { userAPI } from 'src/api-client'
  import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import { AxiosError } from 'axios'
import { CommonResponse } from 'src/models/common/CommonResponse'


interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })
  const [verifyToken, setVerifyToken] = useState<string>('')
  const router = useRouter()
const addToast = useToasts()

const notify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
  addToast.addToast(message, { appearance: type })
}
  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async () => {
    await userAPI.changePassword({
      password: values.newPassword,
      verifyToken: verifyToken
    }).then((res) => {
      const response = new CommonResponse(res)
      if(response.status === 200) {
        notify(response.message ?? '', 'success')
        router.push('/user/login')
      }
    }).catch(error => handleError(error))
  }

   const handleError = (error: any) => {
     const dataErr = (error as AxiosError)?.response
     if (dataErr?.status === 401) {
       notify('Login expired.', 'error')
       router.push('/user/login')
     } else if (dataErr?.status === 500) {
       if (error?.response?.data?.message) notify(error?.response?.data?.message, 'error')
       else notify('Something error', 'error')
     } else {
       console.log(error)
     }
   }

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} container sx={{ marginTop: 6 }} spacing={3} alignItems={'center'}>
                <Grid item sm={8}>
                  <TextField
                    fullWidth
                    value={verifyToken}
                    label='Verify Code'
                    placeholder='Verify Code'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <ShieldCheck />
                        </InputAdornment>
                      )
                    }}
                    onChange={e => setVerifyToken(e.target.value)}
                  />
                </Grid>
                <Grid item sm={4}>
                  <Button variant='outlined' onClick={() => userAPI.getVerifyCode()}>
                    Get verify code
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12} sx={{ marginTop: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                    <OutlinedInput
                      label='New Password'
                      value={values.newPassword}
                      id='account-settings-new-password'
                      onChange={handleNewPasswordChange('newPassword')}
                      type={values.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            aria-label='toggle password visibility'
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ marginTop: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                    <OutlinedInput
                      label='Confirm New Password'
                      value={values.confirmNewPassword}
                      id='account-settings-confirm-new-password'
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 3 }}>
                  <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
                    Save Changes
                  </Button>
                  <Button
                    type='reset'
                    variant='outlined'
                    color='secondary'
                    onClick={() =>
                      setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })
                    }
                  >
                    Reset
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>
    </form>
  )
}
export default TabSecurity
