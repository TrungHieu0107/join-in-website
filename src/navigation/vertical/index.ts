// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { Account, AccountGroup, Application, ArrowLeftCircleOutline, Cog, CommentAlert, FileOutline, FileTree, Logout } from 'mdi-material-ui'
import { useRouter } from 'next/router'

export default function Navigation(): VerticalNavItemsType {
  const router = useRouter()

  if (router.pathname.startsWith('/group')) {
    return [
      {
        title: 'Task',
        icon: FileTree,
        path: '/group/task'
      },
      {
        title: 'Members',
        icon: AccountGroup,
        path: '/group/member'
      },
      {
        title: 'Application',
        icon: Application,
        path: '/group/application'
      },
      {
        title: 'Settings',
        icon: Cog,
        path: '/group/group-setting'
      },
      {
        sectionTitle: 'Personal'
      },
      {
        title: 'Profile',
        icon: Account,
        path: '/profile'
      },
      {
        title: 'Log Out',
        icon: Logout,
        path: '/user/login'
      },
      {
        sectionTitle: 'Others'
      },
      {
        title: 'Return Home',
        icon: ArrowLeftCircleOutline,
        path: '/my-groups'
      }
    ]
  }

  return [
    {
      title: 'My Groups',
      icon: HomeOutline,
      path: '/my-groups'
    },
    {
      title: 'To do',
      icon: FileOutline,
      path: '/to-do'
    },
    {
      title: 'Finding Groups',
      icon: AccountGroup,
      path: '/finding-groups'
    },
    {
      title: 'Options',
      icon: Cog,
      path: '/options'
    },
    {
      sectionTitle: 'Personal'
    },
    {
      title: 'Profile',
      icon: Account,
      path: '/profile'
    },
    {
      title: 'Feedback',
      icon: CommentAlert,
      path: '/feedback'
    },
    {
      title: 'Log Out',
      icon: Logout,
      path: '/user/login'
    },
    {
      sectionTitle: 'Template'
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/user/login',
      openInNewTab: false
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}
