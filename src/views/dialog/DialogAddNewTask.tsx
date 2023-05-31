// ** React Imports
import { forwardRef, SetStateAction, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Box from '@mui/material/Box'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import { Task } from 'src/models'

import Editor from './editor'

const CustomInputFrom = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='From *' autoComplete='off' />
})

const CustomInputTo = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='To *' autoComplete='off' />
})

export interface DialogCreateNewTask {
  close: () => void
  mainTask?: Task
}


const DialogCreateNewTask = (props: DialogCreateNewTask) => {
  // ** States
  const [language, setLanguage] = useState<string[]>([])
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [data, setData] = useState('')

  const { mainTask, close } = props

  // Handle Select
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  return (
    <DatePickerWrapper>
      <Card>
        <CardHeader title='Add task' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <Grid container spacing={5}>
              {mainTask ? (
                <Grid item sm={4} rowSpacing={2} sx={{ borderRight: 1 }}>
                  <Box sx={{ paddingRight: 5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant='body2' sx={{ fontWeight: 600, paddingBottom: 3 }}>
                          1. Main Task
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField fullWidth label='Title' value={mainTask?.Name} disabled />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField fullWidth label='From' value={mainTask?.StartDateDeadline} disabled />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField fullWidth label='End' value={mainTask?.EndDateDeadline} disabled />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField fullWidth label='Status' value={mainTask?.Status} disabled />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField fullWidth label='Important' value={mainTask?.ImpotantLevel} disabled />
                      </Grid>

                    </Grid>
                  </Box>
                </Grid>
              ) : (
                ''
              )}
              <Grid item sm={mainTask ? 8 : 12}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant='body2' sx={{ fontWeight: 600, paddingBottom: 3 }}>
                        {mainTask ? '2. Subtask' : 'New main task'}
                      </Typography>
                    </Grid>
                    <Grid item container spacing={2} className='large-2'>
                      <Grid item xs={12} sm={12}>
                        <TextField fullWidth label='Name *' placeholder='Task' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          selected={date}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText='MM-DD-YYYY'
                          customInput={<CustomInputFrom />}
                          id='form-layouts-separator-date'
                          onChange={(date: Date) => setDate(date)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          selected={date}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText='MM-DD-YYYY'
                          customInput={<CustomInputTo />}
                          id='form-layouts-separator-date'
                          onChange={(date: Date) => setDate(date)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Status *</InputLabel>
                          <Select
                            label='Country'
                            defaultValue=''
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
                          >
                            <MenuItem value='UK' >UK</MenuItem>
                            <MenuItem value='USA'>USA</MenuItem>
                            <MenuItem value='Australia'>Australia</MenuItem>
                            <MenuItem value='Germany'>Germany</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-multiple-select-label'>Important Level *</InputLabel>
                          <Select
                            value={[]}
                            onChange={handleSelectChange}
                            id='form-layouts-separator-multiple-select'
                            labelId='form-layouts-separator-multiple-select-label'
                            input={<OutlinedInput label='Language' id='select-multiple-language' />}
                          >
                            <MenuItem value='English'>English</MenuItem>
                            <MenuItem value='French'>French</MenuItem>
                            <MenuItem value='Spanish'>Spanish</MenuItem>
                            <MenuItem value='Portuguese'>Portuguese</MenuItem>
                            <MenuItem value='Italian'>Italian</MenuItem>
                            <MenuItem value='German'>German</MenuItem>
                            <MenuItem value='Arabic'>Arabic</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth type='number' label='Estimated Days' />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-multiple-select-label'>Assign</InputLabel>
                          <Select
                            multiple
                            value={language}
                            onChange={handleSelectChange}
                            id='form-layouts-separator-multiple-select'
                            labelId='form-layouts-separator-multiple-select-label'
                            input={<OutlinedInput label='Language' id='select-multiple-language' />}
                          >
                            <MenuItem value='English'>English</MenuItem>
                            <MenuItem value='French'>French</MenuItem>
                            <MenuItem value='Spanish'>Spanish</MenuItem>
                            <MenuItem value='Portuguese'>Portuguese</MenuItem>
                            <MenuItem value='Italian'>Italian</MenuItem>
                            <MenuItem value='German'>German</MenuItem>
                            <MenuItem value='Arabic'>Arabic</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <p>Description</p>
                        <div>
                          <Editor
                            value={data}
                            name='description'
                            onChange={(data: SetStateAction<string>) => {
                              setData(data)
                              console.log(data)

                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={close}>
              Cancel
            </Button>
          </CardActions>
        </form>
      </Card>
    </DatePickerWrapper>
  )
}

export default DialogCreateNewTask
