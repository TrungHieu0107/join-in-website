// ** MUI Imports
import Grid from '@mui/material/Grid'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import UserCard from 'src/views/dash/UserCard'
import RevenueOverview from 'src/views/dash/RevenueOverview'
import RevenueTrophy from 'src/views/dash/RevenueTrophy'
import UserOverview from 'src/views/dash/UserOverview'

const Dashboard = () => {

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <RevenueTrophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <UserCard />
        </Grid>
        <Grid item xs={12} md={6} >
          <RevenueOverview />
        </Grid>
        <Grid item xs={12} md={6} >
          <UserOverview />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
