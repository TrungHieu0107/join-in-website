import { useRouter } from 'next/router'
import * as React from 'react'
import { userDBDexie } from 'src/models/db/UserDB'
import { Backdrop, CircularProgress } from '@mui/material'

export default function LogoutPage() {
  const router = useRouter()

  React.useEffect(() => {
    handleLogout()
  })

  const handleLogout = async () => {
    await userDBDexie.clearToken().then(() => router.push('/user/login?back=1', '/user/login'))
  }

  return (
    <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress color='inherit' title='Logout' />
    </Backdrop>
  )
}
