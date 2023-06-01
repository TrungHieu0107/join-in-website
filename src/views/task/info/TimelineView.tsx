import { forwardRef, useEffect, useState } from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Typography from '@mui/material/Typography'
import { Task } from 'src/models/class'
import { CalendarEnd, CalendarStar, MapMarkerCheckOutline } from 'mdi-material-ui'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { TextField } from '@mui/material'

export interface ITimeLineViewProps {
  data: Task
  editable: boolean
}

const CustomInputFrom = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='From *' autoComplete='off' />
})

const CustomInputTo = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='To *' autoComplete='off' />
})

export default function TimeLineView(props: ITimeLineViewProps) {
  const [values, setValues] = useState<ITimeLineViewProps>(props)
  const [editable, setEditable] = useState(false)
  const present = moment().format('yyyy-MM-DD')
  const [inProgress, setInProgress] = useState(true)

  useEffect(() => {
    if (moment(present).isAfter(moment(values.data.endDateDeadline).format('yyyy-MM-DD'))) {
      setInProgress(false)
    }

    setEditable(props.editable)
  }, [props])

  return (
    <Timeline position='right'>
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: 'auto 0' }} align='right' variant='body2' color='text.secondary'>
          From
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color='primary'>
            <CalendarStar />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '20px' }}>
          {editable ? (
            <DatePicker
              selected={new Date(values.data.startDateDeadline ?? moment().format('YYYY-MM-DD'))}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInputFrom />}
              onChange={(date: Date) => {
                const newValue = new Task(values.data)
                const data = {
                  ...newValue,
                  startDateDeadline: moment(date).format('YYYY-MM-DD HH:mm:ss')
                } as Task
                setValues({ ...values, data: data })
              }}
            />
          ) : (
            <Typography variant='subtitle1' component='span'>
              {moment(values.data.startDateDeadline).format('YYYY-MM-DD')}
            </Typography>
          )}
        </TimelineContent>
      </TimelineItem>
      {inProgress ? (
        <TimelineItem color='error'>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} align='right' variant='body2' color='text.secondary'>
            Now
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color='success'>
              <MapMarkerCheckOutline />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '20px' }}>
            <Typography variant='subtitle1' component='span'>
              {moment(present).format('YYYY-MM-DD')}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ) : (
        ''
      )}
      <TimelineItem>
        <TimelineOppositeContent sx={{ m: 'auto 0' }} align='right' variant='body2' color='text.secondary'>
          To
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color='primary'>
            <CalendarEnd />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '20px' }}>
          {editable ? (
            <DatePicker
              selected={new Date(values.data.endDateDeadline ?? moment().format('YYYY-MM-DD'))}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInputTo />}
              onChange={(date: Date) => {
                const newValue = new Task(values.data)
                const data = {
                  ...newValue,
                  endDateDeadline: moment(date).format('YYYY-MM-DD HH:mm:ss')
                } as Task
                setValues({ ...values, data: data })
              }}
            />
          ) : (
            <Typography variant='subtitle1' component='span'>
              {moment(values.data.endDateDeadline).format('YYYY-MM-DD')}
            </Typography>
          )}
        </TimelineContent>
      </TimelineItem>
      {!inProgress ? (
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} align='right' variant='body2' color='text.secondary'>
            Now
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color='error'>
              <MapMarkerCheckOutline />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '20px' }}>
            <Typography variant='subtitle1' component='span'>
              {moment(present).format('YYYY-MM-DD')}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ) : (
        ''
      )}
    </Timeline>
  )
}
