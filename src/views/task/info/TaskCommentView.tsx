import { useEffect, useState } from 'react'
import { Comment } from 'src/models/class'
import { Box, Stepper, Step, StepLabel, StepContent, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import moment from 'moment'
import { CalendarBlank } from 'mdi-material-ui'
import { StepIconProps } from '@mui/material/StepIcon'

export interface ITaskCommentViewProps {
  data: Comment[]
}

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  paddingLeft: '10px',
  fontWeight: 500,
  marginBottom: '4px',
  marginTop: '4px'
}))

interface CommentMapper {
  [key: string]: Comment[]
}

export default function TaskCommentView(props: ITaskCommentViewProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [value, setValue] = useState<Comment[]>(props.data)

  useEffect(() => {
    // processData()
    // console.log(listDate, commentMapper)
    setValue(props.data)
  }, [props])

  function Icon(props: StepIconProps) {
    const { active } = props

    if (active) {
      
      return <CalendarBlank color='info'/>
    }

    return <CalendarBlank />
  }

  const processData = () => {
    let result: CommentMapper
    const list: string[] = []
    let currentDate = value[0].createdDate
    result = { ...result!, [moment(value[0].createdDate).format('yyyy-MM-DD')]: [value[0]] }
    list.push(moment(value[0].createdDate).format('yyyy-MM-DD'))
    for (let index = 1; index < value.length; index++) {
      const val = value[index]
      if (moment(val.createdDate).isSame(currentDate, 'day')) {
        console.log('same')

        result = {
          ...result,
          [moment(val.createdDate).format('yyyy-MM-DD')]: [...result[moment(val.createdDate).format('yyyy-MM-DD')], val]
        }
      } else {
        result = { ...result, [moment(val.createdDate).format('yyyy-MM-DD')]: [val] }
        list.push(moment(val.createdDate).format('yyyy-MM-DD'))
        currentDate = val.createdDate
      }
    }

    return list.map((date, index) => (
      <Step key={index} onClick={() => setActiveStep(index)}>
        <StepLabel StepIconComponent={Icon}>{date}</StepLabel>
        <StepContent>
          {result[date]?.map((val, index) => {
            return <Item key={index} elevation={3} dangerouslySetInnerHTML={{ __html: val.content! }}></Item>
          })}
        </StepContent>
      </Step>
    ))
  }

  return (
    <Box sx={{ maxWidth: 400, mb: 5 }}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {processData()}
      </Stepper>
    </Box>
  )
}
