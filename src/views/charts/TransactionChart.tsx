import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const options: ApexOptions = {
  series: [
    {
      name: 'Transactions',
      data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43, 88],
      type: 'column'
    }
  ],
  chart: {
    height: 350
  },
  dataLabels: {
    enabled: true
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: '20%',
      endingShape: 'rounded',
      startingShape: 'rounded'
    }
  },
  stroke: {
    width: 2,
    curve: 'smooth'
  },
  fill: {
    type: 'solid',
    opacity: [0.35, 1]
  },
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title: {
        text: 'Transactions'
      },
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}k` : `${value}`}`
      }
    }
  ],
  states: {
    hover: {
      filter: { type: 'none' }
    },
    active: {
      filter: { type: 'none' }
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== 'undefined') {
          return y.toFixed(0)
        }

        return y
      }
    }
  }
}

export default function TransactionChartView() {
  return (
    <Card>
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts height={300} options={options} series={options.series} />
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            45%
          </Typography>
          <Typography variant='body2'>Your sales performance is 45% 😎 better compared to last month</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}