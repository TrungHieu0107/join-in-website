// withAuth.tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { userDBDexie } from 'src/models/db/UserDB'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import jwt_decode from 'jwt-decode'
import { JWTModel } from 'src/models/common/JWTModel'
import { useToasts } from 'react-toast-notifications'

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent = (props: any) => {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const addToast = useToasts()

    const notify = () => {
      addToast.addToast('You are not able to access this page', { appearance: 'error' })
    }

    useEffect(() => {
      setIsLoading(true)
      checkLogin()
    }, [props])

    const checkLogin = async () => {
      await userDBDexie.getToken().then(value => {
        const pathName = router.pathname

        if (value?.length === 0) {
          router.push('/user/login')
          notify()

          return
        }
        const tokenModel = new JWTModel(jwt_decode(value ?? ''))
        console.log('JWT ', tokenModel)

        if (pathName.startsWith('/admin')) {
          if (tokenModel.role !== 'Admin') {
            router.push('/user/login')
            notify()

            return
          }
        }

        setIsLoading(false)
      })
    }

    if (isLoading) {
      return (
        <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )
    }

    return <WrappedComponent {...props} />
  }

  return AuthComponent
}

export default withAuth
