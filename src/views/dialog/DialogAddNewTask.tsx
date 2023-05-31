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
import { Calendar, Close, Exclamation, InformationVariant, ListStatus, Pen } from 'mdi-material-ui'
import { Autocomplete, InputAdornment } from '@mui/material'

const CustomInputFrom = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      label='From *'
      autoComplete='off'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Calendar />
          </InputAdornment>
        )
      }}
    />
  )
})

const CustomInputTo = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      {...props}
      inputRef={ref}
      label='To *'
      autoComplete='off'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Calendar />
          </InputAdornment>
        )
      }}
    />
  )
})

export interface DialogCreateNewTask {
  close: () => void
  mainTask?: Task
}

interface Option {
  value: string
  label: string
  image: string
  name: string
  major: string
}

const options: Option[] = [
  {
    value: 'option1',
    label: 'Xuan Kien',
    image: '/images/avatars/1.png',
    name: 'Xuan Kien',
    major: 'Information Technology'
  },
  {
    value: 'option2',
    label: 'Quoc Bao',
    image: '/images/avatars/1.png',
    name: 'Quoc Bao',
    major: 'Information Technology'
  },
  {
    value: 'option3',
    label: 'Trung Hieu',
    image: '/images/avatars/1.png',
    name: 'Trung Hieu',
    major: 'Information Technology'
  }
]

const DialogCreateNewTask = (props: DialogCreateNewTask) => {
  // ** States
  const [importantLv, setimportantLv] = useState<string>()
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [data, setData] = useState('')

  const { mainTask, close } = props

  const [selectedValues, setSelectedValues] = useState<Option[]>([])
  const handleButtonClick = () => {
    console.log('Selected Values:', selectedValues)
  }

  const handleSelectChangeImportantLv = (event: SelectChangeEvent<string>) => {
    setimportantLv(event.target.value)
  }

  return (
    <DatePickerWrapper>
      <Card>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardHeader title='Add task' />
          <CardActions>
            <Button onClick={close}>
              <Close sx={{ color: 'red' }} />
            </Button>
          </CardActions>
        </Box>

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
                        <TextField
                          fullWidth
                          label='Title'
                          value={mainTask?.Name}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Pen />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='From'
                          value={mainTask?.StartDateDeadline}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Calendar />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='End'
                          value={mainTask?.EndDateDeadline}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Calendar />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='Status'
                          value={mainTask?.Status}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <ListStatus />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          label='Important'
                          value={mainTask?.ImpotantLevel}
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Exclamation />
                              </InputAdornment>
                            )
                          }}
                        />
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
                        <TextField
                          fullWidth
                          label='Title *'
                          placeholder='Title'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Pen />
                              </InputAdornment>
                            )
                          }}
                        />
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
                            <MenuItem value='notyet'>Not Yet</MenuItem>
                            <MenuItem value='todo'>To do</MenuItem>
                            <MenuItem value='finish'>Finish</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-multiple-select-label'>Important Level *</InputLabel>
                          <Select
                            value={importantLv}
                            onChange={handleSelectChangeImportantLv}
                            id='form-layouts-separator-multiple-select'
                            labelId='form-layouts-separator-multiple-select-label'
                            input={<OutlinedInput label='Language' id='select-multiple-language' />}
                          >
                            <MenuItem value='very-important'>Very important</MenuItem>
                            <MenuItem value='important'>Important</MenuItem>
                            <MenuItem value='Medium'>Medium</MenuItem>
                            <MenuItem value='Low'>Low</MenuItem>
                            <MenuItem value='not-important'>Not important</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Estimated Days'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Calendar />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Autocomplete
                          multiple
                          options={options}
                          getOptionLabel={option => option.label}
                          onChange={(event, value) => setSelectedValues(value)}
                          renderInput={params => <TextField {...params} label='Assign' variant='outlined' />}
                          renderOption={(props, option) => (
                            <li {...props}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                  src={option.image}
                                  alt={option.name}
                                  style={{ marginRight: 10, width: 30, height: 30 }}
                                />
                                <div>
                                  <p>{option.name}</p>
                                  <p>{option.major}</p>
                                </div>
                              </div>
                            </li>
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Box sx={{mt:5, mb: 2, display: 'flex', alignItems: 'center' }}>
                          <InformationVariant sx={{ marginRight: 1 }} />
                          <Typography variant='body1'>Description</Typography>
                        </Box>
                        <Editor
                          value={data}
                          name='description'
                          onChange={(data: SetStateAction<string>) => {
                            setData(data)
                            console.log(data)
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleButtonClick}>
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
