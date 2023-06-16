// ** MUI Imports
import Grid from '@mui/material/Grid'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import UserCard from 'src/views/dash/UserCard'
import RevenueOverview from 'src/views/dash/RevenueOverview'
import RevenueTrophy from 'src/views/dash/RevenueTrophy'
import UserOverview from 'src/views/dash/UserOverview'
import withAuth from 'src/pages/withAuth'
import { useEffect, useState } from 'react'
import { DashboardType } from 'src/models/class'
import { userAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'

const Dashboard = () => {
  const [dataDashboard, setDataDashboard] = useState<DashboardType>();

  useEffect(() =>{
    userAPI.Admin.getDashboard()
    .then(res =>{
      const data = new CommonResponse(res)
      setDataDashboard(data.data)
    })
    .catch(err =>{
      console.log(err)
    })
  },[])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <RevenueTrophy revenue={dataDashboard?.totalRevenue ?? 0} />
        </Grid>
        <Grid item xs={12} md={8}>
          <UserCard freeUser={dataDashboard?.totalFreemiumUser ?? 0} growthRate={dataDashboard?.totalUserGrownPercentLastWeek ?? 0}
          preUser={dataDashboard?.totalPremiumUser ?? 0} totalUser={dataDashboard?.totalUser ?? 0}
          />
        </Grid>
        <Grid item xs={12} md={6} >
          <RevenueOverview listFreeUser={dataDashboard?.freeUserCount ?? [0,0,0,0,0]} listPreUser={dataDashboard?.preUserCount ?? [0,0,0,0,0]} />
        </Grid>
        <Grid item xs={12} md={6} >
          <UserOverview listActivity={dataDashboard?.activeUserCount ??  [0,0,0,0,0]}/>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default withAuth(Dashboard)
