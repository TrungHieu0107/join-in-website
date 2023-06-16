// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Badge from '@mui/material/Badge'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { userDBDexie } from 'src/models/db/UserDB'
import { notificationAPI } from 'src/api-client/notification'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { Notification } from 'src/models/class'
import { notificationStatus } from 'src/constants/notification-status'
import moment from 'moment'
import { StorageKeys } from 'src/constants'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)<AvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const NotificationDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  const [notifications, setNotificaitons] = useState<Notification[]>([])
  const [newNotification, setNewNotificaiton] = useState<Notification>()
  const [messgaeUnseenCount, setMessgaeUnseenCount] = useState<number>(0)
  const [numOfNotification, setNumOfNotification] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5282/notificationHub')
      .withAutomaticReconnect()
      .build()
    userDBDexie.getUser().then(async userDB => {
      await getNotification(numOfNotification)
      await connection
        .start()
        .then(() => {
          console.log('SignalR Connected', userDB?.id)
        })
        .catch(error => console.log('SignalR Connection Error: ', error))

      connection.on(userDB?.id || 'Notification', message => {
        console.log(message)
        setNewNotificaiton(new Notification(JSON.parse(message)))
      })
    })

    return () => {
      connection.stop()
    }
  }, [])

  useEffect(() => {
    newNotification && handleGetNewNotification(newNotification)
  }, [newNotification])

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationClick = (notification: Notification) => {
    notification.link && router.push(notification.link)
    handleDropdownClose()
  }

  const getNotification = async (num: number) => {
    const notificationList = await notificationAPI.getNotification(num)

    const commonReponse = new CommonResponse(notificationList)

    const data: Notification[] = typeof commonReponse.data === 'string' ? [] : commonReponse.data

    let count = 0
    data.map(item => {
      if (item.notificationStatus === 0) {
        count++
      }
    })
    setMessgaeUnseenCount(count)
    setNotificaitons(data)
    setIsLoading(false)

    return Promise.resolve(data)
  }

  const handleGetNewNotification = (newNoti: Notification) => {
    const list = notifications
    list.push(newNoti)
    setNotificaitons(list)
    setMessgaeUnseenCount(messgaeUnseenCount + 1)
  }

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge badgeContent={messgaeUnseenCount} color='success'>
          <BellOutline />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notification</Typography>
            <Chip
              size='small'
              label={messgaeUnseenCount}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          onYReachEnd={() => {
            setTimeout(() => {
              if (isLoading) return
              setIsLoading(true)

              const num = numOfNotification + 5
              if (numOfNotification > notifications.length) {
                setIsLoading(false)

                return
              }

              setNumOfNotification(num)
              getNotification(num)
            }, 10)
          }}
        >
          {notifications?.map((item, index) => {
            let messageTime = ''

            const a = moment()
            const b = moment(item.createdDate)
            const diff = a.diff(b, 'days')

            if (diff === 0) {
              messageTime = 'Today'
            } else if (diff === 1) {
              messageTime = `a day ago`
            } else if (diff > 0 && diff < 7) {
              messageTime = `${diff} days ago`
            } else {
              messageTime = b.format(StorageKeys.KEY_FORMAT_DATE)
            }

            return (
              <MenuItem key={index} onClick={() => handleNotificationClick(item)}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Avatar alt='Notification' src={item.logo} />
                  <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                    <MenuItemTitle color={item.notificationStatus === 0 ? 'black' : '#b7b7b7'}>
                      {notificationStatus.at(item.notificationType)?.lable}
                    </MenuItemTitle>
                    <MenuItemSubtitle variant='body2'>{item.message}</MenuItemSubtitle>
                  </Box>
                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    {messageTime}
                  </Typography>
                </Box>
              </MenuItem>
            )
          })}
          {isLoading && (
            <MenuItem
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <CircularProgress />
            </MenuItem>
          )}
        </PerfectScrollbar>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
